import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavbarBrand, Navbar} from 'reactstrap';
import Menu from './components/MenuComponent';

function App() {
  return (
    <div>
     <Navbar dark color="primary">
       <div className="Container">
         <NavbarBrand href="/"> Ristorante con fusion</NavbarBrand>
       </div>
     </Navbar>
     <Menu />
    </div>
  );
}

export default App;
