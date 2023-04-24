import Component from '@glimmer/component';

interface ImageViewerArgs {
    src: string;
}

export default class ImageViewerComponent extends Component<ImageViewerArgs> {

    get src(): string {
        return this.args.src;
    }
}
