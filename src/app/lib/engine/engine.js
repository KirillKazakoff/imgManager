export default function engine(node) {
    if ((node === false) || (node === undefined) || (node === null)) {
        return '';
    }

    if ((node === true) || (typeof node === 'string') || (typeof node === 'number')) {
        return node;
    }

    if (Array.isArray(node)) {
        let fragment = '';

        node.forEach((b) => {
            const htmlElement = engine(b);
            fragment += htmlElement;
        })

        return fragment;
    }

    let { block, cls, content, attrs } = node;
    let htmlAttrs = '';
    let htmlCls = '';

    if (attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
            htmlAttrs += `${key}="${value}"`;
        });
    }

    if (cls) {
        htmlCls = `class="${cls}"`;
    }

    const htmlContent = engine(content);
    const htmlElement = generateHtml(block, htmlCls, htmlContent, htmlAttrs);

    return htmlElement;
}

function generateHtml(block, cls, content, attrs) {
    if (block === 'input' || block === 'img') {
        return `<${block} ${attrs}${cls}>`;
    }
    return `<${block} ${attrs}${cls}>${content}</${block}>`;
}