import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/AppBar';
import './bootstrap.css';
import './App.css';
import 'fontsource-roboto';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <main>
        <Container>
          <Route path='/' component={HomeScree} />
        </Container>
      </main>
    </Router>
  );
};

export default App;
