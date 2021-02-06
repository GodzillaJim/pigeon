import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import NavbarComponent from './components/AppBar';
import './bootstrap.css';
import './App.css';
import 'fontsource-roboto';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import Sidebar from './components/Sidebar.js';
import SearchScreen from './screens/SearchScreen';
import Footer from './components/Footer.js';
import _404Error from './screens/404.js';

const App = () => {
  return (
    <Router>
      <Row>
        <NavbarComponent />
      </Row>
      <Row>
        <Sidebar className='col' />
        <main className='col'>
          <Switch>
            <Route
              path={'/categories/:category'}
              exact
              component={CategoryScreen}
            />
            <Route
              path={'/word/:book/:chapter/:verse'}
              exact
              component={HomeScreen}
            />
            <Route path={'/word/:book/:chapter'} exact component={HomeScreen} />
            <Route path={`/word/:book`} component={HomeScreen} exact />
            <Route exact path={`/search`} component={SearchScreen} />
            <Route path={`/search/:keyword`} component={SearchScreen} exact />
            <Route
              path={`/search/:keyword/:page`}
              component={SearchScreen}
              exact
            />
            <Route path='/' component={HomeScreen} />
            <Route component={_404Error} />
          </Switch>
        </main>
      </Row>
      <Footer />
    </Router>
  );
};

export default App;
