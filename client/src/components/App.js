import React from 'react';
import AppNavBar from './AppNavBar';
import ShoppingList from './ShoppingList';
import { Container } from 'reactstrap';

import ItemModal from './ItemModal';
import { Provider } from 'react-redux';
import store from '../store';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function App() {
  return (
    
    <Provider store={ store }>
      <div className="App">
        <AppNavBar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
