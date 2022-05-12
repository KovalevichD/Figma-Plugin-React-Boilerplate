import {SELECTION_CHANGE} from "../../common/pluginMessages";

const onSelectionChange = (): void => {
    const selection: ReadonlyArray<SceneNode> = figma.currentPage.selection;

    // This is how figma responds back to the ui
    const postMessage: Message = {
        type: SELECTION_CHANGE,
        data: {message: `Selected layers - ${selection.length}`}
    }

    figma.ui.postMessage(postMessage);
}

export default onSelectionChange;