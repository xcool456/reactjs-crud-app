// eslint-disable-next-line
import React from 'react';
import Main from './Main';
import NewProduct from './NewProduct';

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
    if (this.state.error) {
      return <div>Ошибка: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <BrowserRouter>
          <h1 className="pl-5">CRUD application</h1>
          <hr className='w-100' />
          <Switch>
            <Route exact path="/">
              <Main products={this.state.items}/>
            </Route>
            <Route path="/new-product" component={NewProduct}></Route>
          </Switch>
        </BrowserRouter>

      );
    }
  }
}

export default App;