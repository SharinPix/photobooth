import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Photobooth extends Component {
    @tracked src: string = '';

    @action uploadPhoto(event: Event) {
      let uploader = document.getElementById('photo-id') as HTMLInputElement;
      if (uploader && uploader.files && uploader.files[0]) {
          this.src = URL.createObjectURL(uploader.files[0]);
          console.log(this.src);
      }
      return;
    }
}