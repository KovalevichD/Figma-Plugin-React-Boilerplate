import {CANCEL_PLUGIN, CREATE_RECTANGLES} from "../common/pluginMessages";
import createRects from "./actions/createRects";
import onSelectionChange from "./handlers/onSelectionChange";
import initApp from "./init/initApp";

figma.showUI(__html__, {
    width: 300,
    height: 600
});

//event listeners
figma.on("selectionchange", onSelectionChange);

//initializing the plugin
initApp();

figma.ui.onmessage = (msg: Message) => {
    if (msg.type === CANCEL_PLUGIN) figma.closePlugin();
    if (msg.type === CREATE_RECTANGLES) createRects(CREATE_RECTANGLES, msg);
};
