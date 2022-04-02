import {render} from 'react-dom';
import './index.css';
import {App} from './App';
import {AppProvider} from "./context/globalContext";

render(
    <AppProvider>
        <App />
    </AppProvider>, 
    document.getElementById('root')
);

