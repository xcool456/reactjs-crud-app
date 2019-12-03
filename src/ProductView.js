// eslint-disable-next-line
import React from 'react';
import { Link } from 'react-router-dom'

class ProductView extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 className="col my-3">
                        Angular
                    </h1>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="font-weight-bold">Description:</div>
                        Superheroic JavaScript MVW Framework.
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="font-weight-bold">Price:</div>
                        Superheroic JavaScript MVW Framework.
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

export default ProductView;