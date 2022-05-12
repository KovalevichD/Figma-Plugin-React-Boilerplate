const createRects = (messageType: string, message: Message): void => {
    const nodes: Array<RectangleNode> = [];

    for (let i = 0; i < message.data; i++) {
        const rect: RectangleNode = figma.createRectangle();

        rect.x = i * 150;
        rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];

        figma.currentPage.appendChild(rect);

        nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);


    // This is how figma responds back to the ui
    const postMessage: Message = {
        type: messageType,
        data: {message: `Created ${message.data} Rectangles`}
    }
    //let's make an example of a delay of 2 seconds
    setTimeout(() => {figma.ui.postMessage(postMessage)}, 2000)
}

export default createRects;