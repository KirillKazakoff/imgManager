const imgT = (src, alt) => ({
    block: 'img',
    cls: 'img',
    attrs: {
        'src': src,
        'alt': alt,
    }
});

const deleteContainerT = {
    block: 'div',
    cls: 'delete-container',
    content: {
        block: 'div',
        cls: 'delete-button',
        content: 'X',
    }
};

const imgContainerT = (src, alt) => ({
    block: 'div',
    cls: 'img-container',
    content: [deleteContainerT, imgT(src, alt)],
});

export default imgContainerT;