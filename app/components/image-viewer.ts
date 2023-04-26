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
import Photobooth from './photobooth';

interface ImageViewerArgs {
    image: any,
    photobooth: Photobooth
}

export default class ImageViewerComponent extends Component<ImageViewerArgs> {
    @tracked width: number | undefined;
    @tracked height: number | undefined;
    @service('overlay') overlayService!: OverlayService;

    map: Map | null = null;
    elem: HTMLElement | null = null;
    photobooth: any =  this.args.photobooth;

    get image(): any {
        return this.args.image;
    }

    get mapCanvas(): HTMLCanvasElement | null {
      if (!this.map) return null;
      const canvas = this.map
        .getViewport()
        .querySelector('.ol-layer canvas, canvas.ol-layer');
      if (canvas instanceof HTMLCanvasElement) return canvas;
      return null;
    }

    initTask = task({ enqueue: true }, async (e: HTMLElement): Promise<void> => {
        this.elem = e;
        this.width = e.clientWidth;
        this.height = e.clientHeight;
        this.photobooth.registerChild(this);
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

    exportTask = task(
      async (
        scale: number
      ): Promise<{ x: number; y: number; dataUrl: string }> => {
        if (!this.map) throw new Error('Map was not loaded yet.');
        const mapCanvas = document.createElement('canvas');
        if (this.width) mapCanvas.width = (this.width * scale) as number;
        if (this.height) mapCanvas.height = (this.height * scale) as number;
        const mapContext = mapCanvas.getContext('2d');
        const canvas = this.mapCanvas;

        if (!(canvas instanceof HTMLCanvasElement)) {
          throw new Error('Canvas not loaded yet.');
        }

        let matrix: null | [number, number, number, number, number, number] =
          null;
        const transform = canvas.style.transform;

        if (canvas.width > 0) {
          matrix = transform
            // eslint-disable-next-line no-useless-escape
            .match(/^matrix\(([^\(]*)\)$/)?.[1]
            ?.split(',')
            .map((x) => Number(x)) as [
            number,
            number,
            number,
            number,
            number,
            number
          ];
        } else {
          matrix = [
            parseFloat(canvas.style.width) / canvas.width,
            0,
            0,
            parseFloat(canvas.style.height) / canvas.height,
            0,
            0,
          ];
        }

        if (!matrix) throw new Error('Could not export (matrix)');
        const transformMatrix = new DOMMatrix(matrix.map((i) => i * scale));
        mapContext?.setTransform(transformMatrix);
        mapContext?.drawImage(canvas, 0, 0);

        if (!this.elem) {
          throw new Error('Could not export');
        }
        return {
          x: (this.elem.offsetLeft + this.elem.clientLeft) * scale,
          y: (this.elem.offsetTop + this.elem.clientTop) * scale,
          dataUrl: mapCanvas.toDataURL(),
        };
      }
    );
}
