// eslint-disable-next-line
import React from 'react';
import { Link } from 'react-router-dom'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(e) {
        const id = e.target.value;
        fetch(`http://localhost:3004/products/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }).then(() => this.props.onUpdate(id));
    }

    render() {
        return (
            <div className="container my-5">
                <Link to='/new-product' className="btn btn-secondary">Add new product</Link>
                <div className="row">
                    <div className="col-3 my-3 font-weight-bold">
                        <label>Product name</label>
                        <input className="form-control" id="search-element" />
                    </div>
                </div>
                <div className="container">
                    <div className="row font-weight-bold">
                        <div className="col-2">Name</div>
                        <div className="col">Description</div>
                        <div className="col-2">Price</div>
                        <div className="col-3">Actions</div>
                        <hr className='w-100' />
                    </div>
                    {this.props.products.map((product, i) => (
                        <div className="row" key={i}>
                            <div className="col-2">
                                <Link to={{ pathname: `/product-view/${product.id}` }}>{product.name}</Link>
                            </div>
                            <div className="col">{product.description}</div>
                            <div className="col-2">
                                {product.price}
                            </div>
                            <div className="col-3 text-white">
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