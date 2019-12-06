import React from 'react';
import { Link } from 'react-router-dom'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(e) {
        const id = e.target.value;
        fetch(`http://localhost:3004/products/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }).then(() => this.props.onUpdate(id));
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        let products = this.props.products.filter(prod => prod.name.indexOf(this.state.name) !== -1);
        return (
            <div className="container my-5">
                <Link to='/new-product' className="btn btn-secondary">Add new product</Link>
                <div className="row">
                    <div className="col-3 my-3 font-weight-bold">
                        <label htmlFor="search-element">Product name</label>
                        <input className="form-control" id="search-element" onChange={this.handleChange} name="name" value={this.state.name} />
                    </div>
                </div>
                <div className="container">
                    <div className="row font-weight-bold">
                        <div className="col-md-2">Name</div>
                        <div className="col">Description</div>
                        <div className="col-sm-2">Price</div>
                        <div className="col-3">Actions</div>
                        <hr className='w-100' />
                    </div>
                    {products.map((product, i) => (
                        <div className="row" key={i}>
                            <div className="col-md-2">
                                <Link to={{ pathname: `/product-view/${product.id}` }}>{product.name}</Link>
                            </div>
                            <div className="col">{product.description}</div>
                            <div className="col-sm-2">
                                {product.price}
                            </div>
                            <div className="col-3">
                                <Link to={{ pathname: '/new-product', search: `?name=${product.name}&description=${product.description}&price=${product.price}&id=${product.id}` }} className="btn btn-warning btn-sm mx-1 px-2 py-0">Edit</Link>
                                <button className="btn btn-danger btn-sm px-0 py-0" value={product.id} onClick={this.deleteProduct}>Delete</button>
                            </div>
                            <hr className='w-100' />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Main;