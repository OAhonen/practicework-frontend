import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router';
import AdvancedSearch from './AdvancedSearch';
import Search from './Search';
import AllProducts from './AllProducts';

function App() {
  return (
    <Switch>
      <Route path="/" component={Search} exact/>
      <Route path="/advanced" component={AdvancedSearch} exact/>
      <Route path="/allproducts" component={AllProducts} exact/>
    </Switch>
  );
}

export default App;
