import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import ImageViewerComponent from './image-viewer';

export default class Photobooth extends Component {
    @tracked photo: any | undefined;
    @tracked image: any | undefined;

    imageViewer: any;

    saveTask = task({ enqueue: true }, async () => {
      await this.imageViewer.exportTask.perform();
    });


    registerChild(component: ImageViewerComponent) {
      this.imageViewer = component;
    }

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

    @action clearPhoto() {
        this.photo = undefined;
        this.image = undefined;
    }
}
