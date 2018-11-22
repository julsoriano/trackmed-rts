import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

/* Components */
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { FetchDescription } from './components/FetchDescription';
import { FetchLocation } from './components/FetchLocation';
import { FetchOwner } from './components/FetchOwner';

export default class App extends React.Component {
// private displayName = App.name

  public render() {
    return (
      <Layout>
        <Route exact={true} path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdescription' component={FetchDescription} />
        <Route path='/fetchlocation' component={FetchLocation} />
        <Route path='/fetchowner' component={FetchOwner} />
      </Layout>
    );
  }
}


/* import * as React from 'react';
import './App.css';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
*/