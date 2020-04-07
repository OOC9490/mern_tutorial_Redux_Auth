import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import ShoppingList from './ShoppingList';
import { Container } from 'reactstrap';

import ItemModal from './ItemModal';
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render() {
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
}

export default App;
