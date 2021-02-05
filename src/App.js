import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Row>
        <Sidebar className='col' />
        <main className='col'>
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
          <Route path='/' component={HomeScreen} exact />
        </main>
      </Row>
      <Footer />
    </Router>
  );
};

export default App;
