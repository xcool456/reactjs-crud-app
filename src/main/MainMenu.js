import React from 'react';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fio: '',
            group: '',
            teacher: '1',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 font-weight-bold">
                        <label htmlFor="fio">Введите ФИО: </label>
                        <input
                            className="form-control"
                            id="fio"
                            name="fio"
                            onChange={this.handleChange}
                            value={this.state.fio}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 font-weight-bold">
                        <label htmlFor="group">Введите номер группы: </label>
                        <input
                            className="form-control"
                            id="group"
                            name="group"
                            onChange={this.handleChange}
                            value={this.state.group}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 font-weight-bold">
                        <label htmlFor="group">Выберите преподавателя: </label>
                        <select className="custom-select">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-2">
                        <Link
                            to={{
                                pathname: `/test/0`,
                                search: `?date=${Date.now()}`,
                            }}
                            className={`btn btn-primary ${
                                (this.state.fio &&
                                    this.state.group &&
                                    this.state.group) ||
                                'disabled'
                            }`}
                        >
                            Начать тест
                        </Link>
                    </div>
                    <div className="btn-group  offset-6" role="group">
                        <Link to="/settings" className="btn btn-secondary">
                            Настройка приложения
                        </Link>

                        <Link to="/questions" className="btn btn-secondary">
                            Настройка тестов
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenu;
