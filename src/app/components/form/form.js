import ImgsContainer from '../img-container/img-container';
import errorUrlT from '../img-container/error-url.tmp';
import engine from '../../lib/engine/engine';

export default class Form {
    constructor() {
        this.container = document.querySelector('form');
        this.inputName = this.container.querySelector('.input-name');
        this.inputLink = this.container.querySelector('.input-link');

        this.imgsContainer = new ImgsContainer();
        this.container.addEventListener('submit', (e) => this.onSubmit(e));
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
