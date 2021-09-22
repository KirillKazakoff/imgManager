import ImgsContainer from '../img-container/img-container';
import errorUrlT from '../img-container/error-url.tmp';
import engine from '../../lib/engine/engine';

import Upload from './upload/upload';

export default class Form {
    constructor() {
        this.container = document.querySelector('form');
        this.inputName = this.container.querySelector('.input-name');
        this.inputLink = this.container.querySelector('.input-link');

        this.imgsContainer = new ImgsContainer();
        this.container.addEventListener('submit', (e) => this.onSubmit(e));
        this.setHandler();
    }

    setHandler() {
        this.upload = new Upload((result, file) => {
            this.imgsContainer.addImg(result, file.name);
        }, 'image');
    }

    async onSubmit(e) {
        e.preventDefault();
        const srcValue = this.inputLink.value;
        const altValue = this.inputName.value;

        try {
            await this.imgsContainer.addImg(srcValue, altValue);
        } catch (error) {
            const html = engine(errorUrlT);
            if (!this.error) {
                this.container.insertAdjacentHTML('afterend', html);
                this.error = document.querySelector('.error-url');

                setTimeout(() => {
                    this.error.remove();
                    this.error = null;
                }, 3000);
            }
        }
        this.inputLink.value = '';
        this.inputName.value = '';
    }
}

// this.upload = new Upload((result) => {
//     document.querySelector('.text-preview').textContent = result;
// });

// this.upload = new Upload((result) => {
//     document.querySelector('.image-preview').src = result;
// }, 'image');

// this.upload = new Upload((result) => {
//     const img = document.querySelector('.image-preview');
//     img.addEventListener('load', () => {
//         URL.revokeObjectURL(result);
//     })
//     img.src = result;
// }, 'file');

// this.upload = new Upload((result) => {
//     const video = document.querySelector('.video-preview');
//     video.src = result;

//     video.addEventListener('canplay', () => {
//         URL.revokeObjectURL(result);
//     });
// }, 'file');

// this.upload = new Upload((result, file) => {
//     const link = document.createElement('a');

//     link.href = result;
//     link.download = file.name;
//     link.rel = 'noopener';

//     link.click();

//     URL.revokeObjectURL(result);
// }, 'file');
