import './img-container.css';
import engine from '../../lib/engine/engine';
import imgContainerT from './img-container.tmp';

export default class ImgsContainer {
    constructor() {
        this.container = document.querySelector('.imgs-container');

        this.container.addEventListener('click', (e) => this.onDelete(e));
    }

    async loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            
            img.addEventListener('load', () => {
                resolve();
            })
            img.addEventListener('error', () => {
                reject();
            })

            img.src = url;
        });
    }

    async addImg(src, alt) {
        try {
            await this.loadImage(src);
            const html = engine(imgContainerT(src, alt));
            this.container.innerHTML += html;
        }
        catch (e) {
            throw new Error('something went wrong');
        }
    }

    onDelete(e) {
        if (e.target.className.includes('delete')) {
            const container = e.target.closest('.img-container');
            container.remove();
        }
    }
}
