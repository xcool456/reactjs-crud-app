import React from 'react';
import { Link } from 'react-router-dom';
import './TestWindow.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fio: '',
            group: '',
            show: false,
            password: '',
        };
    }

    //modal window
    handleClose = () =>
        this.setState({
            show: false,
        });

    handleShow = () =>
        this.setState({
            show: true,
        });

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        let settings = this.props.settings;
        return (
            <div className="container menu">
                <h1 className="text-center text-monospace">
                    Добро пожаловать в приложения для проведения тестов
                </h1>
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
                        <label htmlFor="group">Преподаватель: </label>
                        <input
                            className="form-control"
                            id="teacher"
                            name="teacher"
                            value={settings.teacher && settings.teacher.text}
                            disabled
                        />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-2">
                        <Link
                            to={{
                                pathname: `/test/0`,
                                search: `?date=${Date.now()}&fio=${
                                    this.state.fio
                                }&group=${this.state.group}&teacher=${
                                    settings.teacher && settings.teacher.value
                                }`,
                            }}
                            className={`btn btn-primary ${
                                (this.state.fio && this.state.group) ||
                                'disabled'
                            }`}
                        >
                            Начать тест
                        </Link>
                    </div>

                    <Button
                        className="btn btn-secondary col-2 setting-button"
                        onClick={this.handleShow}
                    >
                        Настройки
                    </Button>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Настройки</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Введите пароль администратора для входа в настройки:
                            <input
                                className="form-control"
                                id="group"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="btn-group container" role="group">
                                <Link
                                    to="/settings"
                                    className={`btn btn-secondary ${(settings.password && settings.password.value != this.state.password) && 'disabled'}`}
                                >
                                    Настройка приложения
                                </Link>

                                <Link
                                    to="/questions"
                                    className={`btn btn-secondary ${(settings.password && settings.password.value != this.state.password) && 'disabled'}`}
                                >
                                    Настройка тестов
                                </Link>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default MainMenu;
