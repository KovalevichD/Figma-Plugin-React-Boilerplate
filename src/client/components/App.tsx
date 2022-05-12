import React from 'react';
import '../styles/style.scss';
import {cancel, createRectangles} from "../api/api";
import logo from '../assets/logo.svg';
import {SELECTION_CHANGE} from "../../common/pluginMessages";

const App = ({}) => {
    const [selection, setSelection] = React.useState('Selected layers - 0')
    const textbox = React.useRef<HTMLInputElement>(undefined);

    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '5';
        textbox.current = element;
    }, []);

    const onCreate = async () => {
        const count = parseInt(textbox.current.value, 10);
        const res = await createRectangles(count);
        console.log('response => ', res)
    };

    const onCancel = () => cancel();

    // Initializing, reading messages from Plugin code
    React.useEffect(() => {
        window.addEventListener('message', event => {
            const {type, data} = event.data.pluginMessage;

            if (type === SELECTION_CHANGE) setSelection(data.message)
        })
    }, []);

    return (
        <div>
            <img alt="app logo" src={logo}/>
            <h2>Rectangle Creator</h2>
            <span>{selection}</span>
            <p>
                Count: <input ref={countRef}/>
            </p>
            <button id="create" onClick={onCreate}>
                Create
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
