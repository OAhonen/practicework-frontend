import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router';
import AdvancedSearch from './AdvancedSearch';
import Search from './Search';

function App() {
  return (
    <Switch>
      <Route path="/" component={Search} exact/>
      <Route path="/advanced" component={AdvancedSearch} exact/>
    </Switch>
  );
}

export default App;
