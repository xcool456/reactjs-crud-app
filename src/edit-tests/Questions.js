import React from 'react';
import { Link } from 'react-router-dom';

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isLoaded: false,
            items: {},
            theme: 'db1',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    getDb = (dbName) => {
        console.log(dbName);
        fetch(`http://localhost:8080/${dbName}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: {
                            ...this.state.items,
                            [dbName]: result,
                        },
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    };

    deleteItem = (e) => {
        const id = e.target.value;
        fetch(`http://localhost:8080/${this.state.theme}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(() => this.getDb(this.state.theme));
    };

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    componentDidMount() {
        this.getDb('db1');
        this.getDb('db2');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            JSON.stringify(prevState.items) != JSON.stringify(this.state.items)
        ) {
            this.getDb('db1');
            this.getDb('db2');
        }
    }

    render() {
        if (this.state.error) {
            return <div>Ошибка: {this.state.error.message}</div>;
        } else if (
            !this.state.isLoaded ||
            !this.state.items[this.state.theme]
        ) {
            return <div>Загрузка...</div>;
        } else {
            let items = this.state.items[this.state.theme];
            items = items.filter(
                (prod) => prod.question.indexOf(this.state.name) !== -1
            );
            return (
                <div className="container my-5">
                    <Link
                        to={{
                            pathname: '/new-question',
                            search: `?db=${this.state.theme}`,
                        }}
                        className="btn btn-secondary"
                    >
                        Добавить новый вопрос
                    </Link>
                    <div className="row">
                        <div className="col-12 font-weight-bold">
                            <label htmlFor="theme">Название теста: </label>
                            <select
                                name="theme"
                                onChange={this.handleChange}
                                value={this.state.value}
                                className="form-control"
                            >
                                <option value="db1">Язык JavaScript</option>
                                <option value="db2">
                                    DOM, работа со страницей
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 my-3 font-weight-bold">
                            <label htmlFor="search-element">Вопрос</label>
                            <input
                                className="form-control"
                                id="search-element"
                                onChange={this.handleChange}
                                name="name"
                                value={this.state.name}
                            />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row font-weight-bold">
                            <div className="col-3">Вопрос</div>
                            <div className="col-3">Код</div>
                            <div className="col-3">Ответы</div>
                            <div className="col-1">Ответ</div>
                            <div className="col-2">Действие</div>
                            <hr className="w-100" />
                        </div>
                        {items.map((item, i) => (
                            <div className="row" key={i}>
                                <div
                                    className="col-3"
                                    style={{ color: '#007bff' }}
                                >
                                    {item.question}
                                </div>
                                <div className="col-3">
                                    <pre>{item.code}</pre>
                                </div>
                                <div className="col-3">
                                    {Object.keys(item.answers).map(
                                        (key, index) => (
                                            <div key={key}>
                                                {index + 1}){item.answers[key]}
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="col-1">
                                    {+item.correctAnswer + 1}
                                </div>
                                <div className="col-2">
                                    <Link
                                        to={{
                                            pathname: '/new-question',
                                            search: `?question=${item.question}&code=${item.code}&correctAnswer=${item.correctAnswer}&answer0=${item.answers['answer0']}&answer1=${item.answers['answer1']}&answer2=${item.answers['answer2']}&answer3=${item.answers['answer3']}&answer4=${item.answers['answer4']}&id=${item._id}&db=${this.state.theme}`,
                                        }}
                                        className="btn btn-warning btn-sm mx-1 px-2 py-0"
                                    >
                                        Исправить
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm px-0 py-0"
                                        value={item._id}
                                        onClick={this.deleteItem}
                                    >
                                        Удалить
                                    </button>
                                </div>
                                <hr className="w-100" />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
}

export default Questions;
