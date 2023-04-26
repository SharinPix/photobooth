import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Photobooth extends Component {
    @tracked photo: any | undefined;
    @tracked image: any | undefined;

    @action async uploadPhoto(event: Event) {
      event.preventDefault();
      this.clearPhoto();
      let uploader = document.getElementById('photo') as HTMLInputElement;
      if (uploader && uploader.files && uploader.files[0]) {
        this.photo = uploader.files[0];
        let img = new Image();
        img.src = URL.createObjectURL(this.photo);
        await img.decode();
        this.image = img;
      }
    }

    @action async addFiles(files: any) {
      this.clearPhoto();
      if (files[0]) {
        this.photo = files[0];
        let img = new Image();
        img.src = URL.createObjectURL(this.photo);
        await img.decode();
        this.image = img;
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
        this.image = undefined;
    }
}
