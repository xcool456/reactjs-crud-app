import React from 'react';
import Main from './Main';
import NewProduct from './NewProduct';
import ProductView from './ProductView';

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  getProducts() {
    fetch("http://localhost:3004/products")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  updateProductAfterDelete(id) {
    this.setState({
      items: this.state.items.filter(prod => prod.id !== +id)
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    if (this.state.error) {
      return <div>Ошибка: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <BrowserRouter>
          <div className='container'>
            <div className="row">
              <Link to='/'>
                <img src=".\logo192.png" style={{ width: 75 + 'px' }} alt="Logo" />
              </Link>
              <h1 className="align-self-end">React CRUD application</h1>
              <hr className='w-100' />
            </div>
          </div>
          <Switch>
            <Route exact path="/">
              <Main products={this.state.items} onUpdate={i => this.updateProductAfterDelete(i)} />
            </Route>
            <Route path="/new-product" render={({ location }) => (
              <NewProduct
                onUpdate={i => this.getProducts()}
                location={location.search}
              />
            )} />
            <Route path="/product-view/:id" render={({ match }) => (
              <ProductView
                products={this.state.items}
                id={match.params.id}
              />
            )} />
          </Switch>
        </BrowserRouter>

      );
    }
  }
}

export default App;