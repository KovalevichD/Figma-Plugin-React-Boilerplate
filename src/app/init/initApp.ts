import onSelectionChange from "../handlers/onSelectionChange";

const initApp = (): void => {
    figma.once("run", onSelectionChange);
}

export default initApp;