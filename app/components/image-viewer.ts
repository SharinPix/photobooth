import Component from '@glimmer/component';
import Photobooth from './photobooth';
import { tracked } from '@glimmer/tracking';
import { type Map } from 'ol';
import { Resolved, task } from 'ember-concurrency';
import RSVP from 'rsvp';

interface ImageViewerArgs {
    photobooth: Photobooth,
    photo: any
}

export default class ImageViewerComponent extends Component<ImageViewerArgs> {
    @tracked ptb: Photobooth = this.args.photobooth;
    @tracked width: number | undefined;
    @tracked height: number | undefined;

    map: Map | null = null;
    elem: HTMLElement | null = null;

    get photo(): any {
        return this.args.photo;
    }

    initTask = task({ enqueue: true }, async (e: HTMLElement): Promise<void> => {
        this.elem = e;
        this.width = e.clientWidth;
        this.height = e.clientHeight;

        const p = RSVP.Promise.all([
          import('ol/Map'),
          import('ol/View'),
          import('ol/layer'),
          import('ol/proj/Projection'),
          import('ol/interaction'),
          import('ol/source'),
          import('ol/extent'),
        ]);

        const [Map, View, Layer, Projection, Interaction, Source, Extent]: Resolved<
          typeof p
        > = await RSVP.Promise.resolve(p);

        const extent = [0, 0, 1000, 1000];

        const projection = new Projection.default({
          code: 'sample_id',
          units: 'pixels',
          extent,
        });

        const view = new View.default({
          projection,
          center: Extent.getCenter(extent),
          extent,
          zoom: 1,
          maxZoom: 10,
          minZoom: 1,
        });

        const imageStatic = new Source.ImageStatic({
          url: URL.createObjectURL(this.photo) || '',
          projection,
          imageExtent: extent,
          crossOrigin: 'Anonymous',
        });

        const image = new Layer.Image({
          source: imageStatic,
        });

        this.map = new Map.default({
          target: e.querySelector('.map') as HTMLElement,
          view,
          controls: [],
          interactions: Interaction.defaults().extend([
            new Interaction.DragRotateAndZoom(),
          ]),
          layers: [image],
        });
    });
}
