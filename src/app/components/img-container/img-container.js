import './img-container.css';
import engine from '../../lib/engine/engine';
import imgContainerT from './img-container.tmp';

export default class ImgsContainer {
    constructor() {
        this.container = document.querySelector('.imgs-container');

        this.container.addEventListener('click', (e) => ImgsContainer.onDelete(e));
    }

    static async loadImage(url) {
        return new Promise((resolve, reject) => {
            if (url) {
                fetch(url).then((response) => {
                    if (response.ok) {
                        resolve();
                    }
                    if (response.status === 404) {
                        reject();
                    }
                }).catch(() => reject());
            } else throw new Error('empty error');
        });
    }

    async addImg(src, alt) {
        try {
            await ImgsContainer.loadImage(src);
            const html = engine(imgContainerT(src, alt));
            this.container.innerHTML += html;
        } catch (e) {
            throw new Error('something went wrong');
        }
    }

    static onDelete(e) {
        if (e.target.className.includes('delete')) {
            const container = e.target.closest('.img-container');
            container.remove();
        }
    }
}
