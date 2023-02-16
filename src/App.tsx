import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {createBrowserHistory} from "history";
import Rotas from './rotas';
import './App.css';

const history = createBrowserHistory({window})

function App() {
  return (<HistoryRouter history={history}>
      <Rotas />
    </HistoryRouter>
  );
}

export {history}
export default App;
