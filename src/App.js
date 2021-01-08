import React from 'react'
import Container from '@material-ui/core/Container'
import NavbarComponent from './components/AppBar';
import './bootstrap.css'
import './App.css';
import "fontsource-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
  return (
    <Container maxWidth={'sm'}>
      <CssBaseline/>
      <NavbarComponent/>
    </Container>
  )
}

export default App
