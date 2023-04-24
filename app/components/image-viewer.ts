import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ImageViewerComponent extends Component {
    @tracked src!: string;

    get test(): string {
        console.log('mon vine ici, ' , this.args);
        return this.src;
    }
}
