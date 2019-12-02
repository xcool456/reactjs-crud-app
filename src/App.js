// eslint-disable-next-line
import React from 'react';
import './App.css';
import AddButton from './AddButton';
import {
  BrowserRouter,
  Switch,
  Route
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

  componentDidMount() {
    fetch("http://localhost:3004/products")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    console.log(this.state)
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <div class="container my-5">
                <AddButton />
                <div class="row">
                  <div class="col-3 my-3 font-weight-bold">
                    <label for="search-element">Product name</label>
                    <input class="form-control" id="search-element" requred />
                  </div>
                </div>
                <div class="container">
                  <div class="row font-weight-bold">
                    <div class="col-2">Name</div>
                    <div class="col">Description</div>
                    <div class="col-2">Price</div>
                    <div class="col-3">Actions</div>
                    <hr class='w-100' />
                  </div>
                  {items.map(product => (
                    <div class="row">
                      <div class="col-2">
                        <a>{product.name}</a>
                      </div>
                      <div class="col">{product.description}</div>
                      <div class="col-2">
                        {product.price}
                      </div>
                      <div class="col-3 text-white">
                        <a class="btn btn-warning btn-sm mx-1 px-2 py-0">Edit</a>
                        <a class="btn btn-danger btn-sm px-0 py-0">Delete</a>
                      </div>
                      <hr class='w-100' />
                    </div>
                  ))}
                </div>
              </div>
            </Route>
          </Switch>
        </BrowserRouter>

      );
    }
  }
}

export default App;
