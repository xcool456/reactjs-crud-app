import React from 'react';
import { Link } from 'react-router-dom'

class NewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                name: '',
                description: '',
                price: ''
            }
        }
        this.createProduct = this.createProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createProduct() {
        if (this.props.location) {
            const id = new URLSearchParams(this.props.location).get("id");
            let product = this.state.formControls
            product.id = id;
            fetch("http://localhost:3004/products/"+id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) }).then(() => this.props.onUpdateEdit(this.state.formControls));
        } else {
            fetch("http://localhost:3004/products", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state.formControls) }).then(() => this.props.onUpdateAdd(this.state.formControls));
        }
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: value
            }
        });
    }

    componentDidMount() {
        if (this.props.location) {
            this.setState({
                formControls: {
                    name: new URLSearchParams(this.props.location).get("name"),
                    description: new URLSearchParams(this.props.location).get("description"),
                    price: new URLSearchParams(this.props.location).get("price")
                }
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 font-weight-bold">
                        <label>Name</label>
                        <input className="form-control w-25" id="name" onChange={this.handleChange} name="name" value={this.state.formControls.name} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 my-3 font-weight-bold">
                        <label>Description</label>
                        <textarea className="form-control w-50" id="description" onChange={this.handleChange} name="description" value={this.state.formControls.description} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 font-weight-bold">
                        <label>Price</label>
                        <input className="form-control w-25" id="price" onChange={this.handleChange} name="price" value={this.state.formControls.price} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 my-3">
                        <Link to='/' className="btn btn-primary btn-sm mr-3" onClick={this.createProduct}>Create</Link>
                        <Link to='/' className="btn btn-secondary btn-sm">Cancel</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewProduct;