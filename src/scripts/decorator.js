const renderers = [];

export function Renderer(target) {
    renderers.push(target);
}

export function findRenderer(scheme) {
    console.log(scheme);
    return renderers[0];
}
