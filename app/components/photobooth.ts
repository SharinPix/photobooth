import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Photobooth extends Component {
    @tracked src: string = '';
    @tracked filename: string = '';

    @action uploadPhoto(event: Event) {
      let uploader = document.getElementById('photo-id') as HTMLInputElement;
      if (uploader && uploader.files && uploader.files[0]) {
          this.src = URL.createObjectURL(uploader.files[0]);
          this.filename = uploader.files[0].name;
          console.log(uploader.files[0]);
          console.log('parent src: ', this.src);
      }
    }

    @action downloadPhoto() {
        var link=document.createElement('a');
        link.href = this.src;
        link.download = this.filename;
        link.target = '_blank';
        link.rel ='noopener noreferrer';
        link.click();
    }

    @action clearPhoto() {
        this.src = '';
        this.filename = '';
    }
}