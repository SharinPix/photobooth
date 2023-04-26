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
      const rect = (
        document.querySelector('.container') as Element
      );
      let elem = rect.getBoundingClientRect();
      const scale = 1920 / elem.width;
      const result = await this.imageViewer.exportTask.perform(scale);


      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1920 * (2 / 3);

      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      const img = new window.Image();
      await new Promise<void>((resolve) => {
        img.setAttribute('src', result.dataUrl);

        img.addEventListener('load', () => {
          context?.drawImage(img, result.x, result.y);
          resolve();
        });
      });
      this.downloadPhoto(img);
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

    @action downloadPhoto(img: any) {
      var link=document.createElement('a');
      link.href = img.src;
      link.download = this.photo.name;
      link.target = '_blank';
      link.rel ='noopener noreferrer';
      link.click();
    }

    @action clearPhoto() {
        this.photo = undefined;
        this.image = undefined;
    }
}
