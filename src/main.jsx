
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextProvider from './components/management/hooks/TabContext';
import './index.css';
import App from './app';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <ContextProvider>
            <App />
        </ContextProvider>
    </Router>
)
