import React from 'react';
import { Link } from 'react-router-dom';

class EditSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            value: '',
            text: ''
        };
    }

    saveSetting = () => {

            const id = new URLSearchParams(this.props.location).get("id");
        console.log(id);
            fetch("http://localhost:8080/settings/" + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state),
            }).then(() => this.props.onUpdate());
    }

    handleChange =(event) =>{
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    componentDidMount() {
        if (this.props.location) {
            this.setState({
                name: new URLSearchParams(this.props.location).get('name'),
                value: new URLSearchParams(this.props.location).get('value'),
                text: new URLSearchParams(this.props.location).get('text'),
            });
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 font-weight-bold">
                        <label htmlFor="name">Ключ: </label>
                        <input
                            className="form-control w-50"
                            onChange={this.handleChange}
                            name="text"
                            value={this.state.text}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 font-weight-bold">
                        <label htmlFor="value">Значение: </label>
                        <input
                            className="form-control w-50"
                            onChange={this.handleChange}
                            name="value"
                            value={this.state.value}
                        />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-5">
                        <Link
                            to="/settings"
                            className={'btn btn-primary btn-sm mr-3 '}
                            onClick={this.saveSetting}
                        >
                            Добавить
                        </Link>
                        <Link
                            to="/settings"
                            className="btn btn-secondary btn-sm"
                        >
                            Назад
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditSettings;
