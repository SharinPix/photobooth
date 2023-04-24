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

interface ImageViewerArgs {
    photo: any
}

export default class ImageViewerComponent extends Component<ImageViewerArgs> {
    @tracked width: number | undefined;
    @tracked height: number | undefined;

    map: Map | null = null;
    elem: HTMLElement | null = null;

    get photo(): any {
        return this.args.photo;
    }

    initTask = task({ enqueue: true }, async (e: HTMLElement): Promise<void> => {
        console.log('Element: ', e);
        this.elem = e;

        // const p = Promise.all([
        //   import('ol/Map'),
        //   import('ol/View'),
        //   import('ol/layer'),
        //   import('ol/proj/Projection'),
        //   import('ol/interaction'),
        //   import('ol/source'),
        //   import('ol/extent'),
        // ]);

        // const [Map, View, Layer, Projection, Interaction, Source, Extent]: Resolved<typeof p> = await p;

        const extent = [0, 0, 500, 1000];

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
          url: 'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960',
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
