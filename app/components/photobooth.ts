import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { SafeString } from 'handlebars';
import { resizeToFit } from 'photobooth/lib/resize-to-fit';
import { htmlSafe } from '@ember/template';

export default class Photobooth extends Component {
    @tracked photo: any | undefined;
    // @tracked filename: string = '';

    @action uploadPhoto(event: Event) {
      event.preventDefault();
      let uploader = document.getElementById('photo-id') as HTMLInputElement;
      if (uploader && uploader.files && uploader.files[0]) {
        //   this.src = URL.createObjectURL(uploader.files[0]);
        //   this.filename = uploader.files[0].name;
        this.photo = uploader.files[0];
      }
    }

    @action downloadPhoto() {
        if (this.photo && this.photo.src && this.photo.filename) {
            var link=document.createElement('a');
            link.href = this.photo.src;
            link.download = this.photo.filename;
            link.target = '_blank';
            link.rel ='noopener noreferrer';
            link.click();
        }
    }

    @action clearPhoto() {
        this.photo = undefined;
        // this.filename = '';
    }
}
