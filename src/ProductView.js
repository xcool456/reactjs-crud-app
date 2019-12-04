import React from 'react';
import { Link } from 'react-router-dom'

class ProductView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            product: null
        };
    }

    componentDidMount() {
        fetch("http://localhost:3004/products/" + this.props.id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        product: result
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

    render() {
        if (this.state.error) {
            return <div>Ошибка: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <h1 className="col my-3">
                            {this.state.product.name}
                        </h1>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="font-weight-bold">Description:</div>
                            {this.state.product.description}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="font-weight-bold">Price:</div>
                            {this.state.product.price}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col my-3">
                            <Link to="/">Back to product list</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ProductView;