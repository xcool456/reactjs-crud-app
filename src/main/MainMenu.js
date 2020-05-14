import React from 'react';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                fio: '',
                group: '',
                teacher: '',
            },
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        if (name.indexOf('answer') !== -1) {
            this.setState({
                formControls: {
                    ...this.state.formControls,
                    answers: {
                        ...this.state.formControls.answers,
                        [name]: value,
                    },
                },
            });
        } else {
            this.setState({
                formControls: {
                    ...this.state.formControls,
                    [name]: value,
                },
            });
        }
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
                            value={this.state.formControls.fio}
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
                            value={this.state.formControls.group}
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
                        <Link to="/test/0" className='btn btn-primary'>
                            Начать тест
                        </Link>
                    </div>
                    <div className="col-2">
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
