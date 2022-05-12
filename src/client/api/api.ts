import {CANCEL_PLUGIN, CREATE_RECTANGLES} from "../../common/pluginMessages";
import promiseAction from "../utils/messageHandler";

export const createRectangles = (count: number): Promise<Message> => promiseAction(CREATE_RECTANGLES, count);
export const cancel = (): void => parent.postMessage({pluginMessage: {type: CANCEL_PLUGIN}}, '*');