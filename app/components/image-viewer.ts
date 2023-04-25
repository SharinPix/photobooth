import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Map } from 'ol';
import { task } from 'ember-concurrency';
import { View } from 'ol';
import Layer from 'ol/layer';
import { Projection } from 'ol/proj';
import Interaction from 'ol/interaction';
import Source from 'ol/source';
import Extent from 'ol/extent';
import { service } from '@ember/service';
import OverlayService from 'photobooth/services/overlay';

interface ImageViewerArgs {
    image: any
}

export default class ImageViewerComponent extends Component<ImageViewerArgs> {
    @tracked width: number | undefined;
    @tracked height: number | undefined;
    @service('overlay') overlayService!: OverlayService;

    map: Map | null = null;
    elem: HTMLElement | null = null;

    get image(): any {
        return this.args.image;
    }

    initTask = task({ enqueue: true }, async (e: HTMLElement): Promise<void> => {
        console.log('Element: ', e);
        this.elem = e;

        const extent = [0, 0, this.image.width, this.image.height];

        const projection = new Projection({
          code: 'sample_id',
          units: 'pixels',
          extent,
        });

        const view = new View({
          projection,
          center: Extent.getCenter(extent),
          extent,
          zoom: 1,
          maxZoom: 10,
          minZoom: 1,
        });

        const imageStatic = new Source.ImageStatic({
          // url: 'https://media.istockphoto.com/id/1368424494/photo/studio-portrait-of-a-cheerful-woman.jpg?s=1024x1024&w=is&k=20&c=9eszAhNKMRzMHVp4wlmFRak8YyH3rAU8re9HjKA6h3A=',
          url: this.image.src,
          projection,
          imageExtent: extent,
          crossOrigin: 'Anonymous',
        });

        const image = new Layer.Image({
          source: imageStatic,
        });

        this.map = new Map({
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
