const promiseAction = (messageType: string, payLoad?: any): Promise<Message> => {

    return new Promise((resolve => {
        parent.postMessage(
            {
                pluginMessage: {
                    type: messageType,
                    data: payLoad || null
                },
            },
            "*"
        );

        window.addEventListener("message", function handler(event) {
            const pluginMessage = event.data.pluginMessage;
            const type = pluginMessage.type;

            if (type === messageType) {
                resolve(pluginMessage)
                window.removeEventListener("message", handler)
            }
        });
    }))
}

export default promiseAction;