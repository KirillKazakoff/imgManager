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
                try {
                    (async () => {
                        const response = await fetch(url);
                        if (response.ok) {
                            resolve();
                        }
                        if (response.status === 404) {
                            reject();
                        }
                    })();
                } catch (e) {
                    reject();
                }
            } else throw new Error('empty error');
        });
        // return new Promise((resolve, reject) => {
        //     try {
        //         const xhr = new XMLHttpRequest();
        //         xhr.open('GET', url);

        //         xhr.send();
        //         xhr.onerror = function (e) {
        //             console.log('something went wrong');
        //         };

        //         xhr.onload = function () {
        //             if (this.status !== 200) {
        //                 reject();
        //             }
        //             resolve();
        //         };

        //         xhr.onloadend = function () {
        //             if (xhr.status === 404) {
        //                 console.log('what happpened bruh');
        //                 reject();
        //             }
        //         };
        //     } catch (e) {
        //         throw new Error(e);
        //     }

        // img.addEventListener('load', () => {
        //     resolve();
        // });
        // img.addEventListener('error', () => {
        //     reject();
        // });

        // img.src = url;
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
