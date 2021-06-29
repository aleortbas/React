import logo from './logo.svg';
import './App.css';
import {NavbarBrand, Navbar} from 'reactstrap';

function App() {
  return (
    <div className="App">
     <Navbar dark color="primary">
       <div className="Container">
         <NavbarBrand href="/"> Ristorante con fusion</NavbarBrand>
       </div>
     </Navbar>
    </div>
  );
}

export default App;
