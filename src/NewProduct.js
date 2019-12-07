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
            },
            errors: {
                price: ''
            }
        }
        this.createProduct = this.createProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createProduct() {
        if (this.props.location) {
            const id = new URLSearchParams(this.props.location).get("id");
            fetch("http://localhost:3004/products/" + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state.formControls) }).then(() => this.props.onUpdate());
        } else {
            fetch("http://localhost:3004/products", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state.formControls) }).then(() => this.props.onUpdate());
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'price':
                errors.price =
                    isNaN(+value)
                        ? 'Price must be a number!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: value
            },
            errors
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
                        <label htmlFor="name">Name</label>
                        <input className="form-control w-25" id="name" onChange={this.handleChange} name="name" value={this.state.formControls.name} />
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 font-weight-bold">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control w-50" id="description" onChange={this.handleChange} name="description" value={this.state.formControls.description} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 font-weight-bold">
                        <label htmlFor="price">Price</label>
                        <input className="form-control w-25" id="price" onChange={this.handleChange} name="price" value={this.state.formControls.price} />
                    </div>
                    <div className="col-12 mt-2">
                        {this.state.errors.price.length > 0 &&
                            <span className='alert alert-danger d-inline-flex p-2'>{this.state.errors.price}</span>}
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-5">
                        <Link to='/' className={"btn btn-primary btn-sm mr-3 " + (this.state.errors.price.length > 0 || this.state.formControls.name.length === 0 || this.state.formControls.description.length === 0 || this.state.formControls.price.length === 0 ? 'disabled' : '')} onClick={this.createProduct}>Create</Link>
                        <Link to='/' className="btn btn-secondary btn-sm">Cancel</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewProduct;