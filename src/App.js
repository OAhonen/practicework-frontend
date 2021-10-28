import logo from './logo.svg';
import './App.css';
import Product from './Product';
import { Route, Switch } from 'react-router';
import AdvancedSearch from './AdvancedSearch';

function App() {
  return (
    <Switch>
      <Route path="/" component={Product} exact/>
      <Route path="/advanced" component={AdvancedSearch} exact/>
    </Switch>
  );
}

export default App;
