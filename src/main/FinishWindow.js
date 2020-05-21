import React from 'react';
import { Link } from 'react-router-dom';
import './TestWindow.css';

class FinishTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rightAnswers: new URLSearchParams(this.props.location).get(
                'rightAnswers'
            ),
            countOfQuestion: new URLSearchParams(this.props.location).get(
                'countOfQuestion'
            ),
            time: new URLSearchParams(this.props.location).get('time'),
            fio: new URLSearchParams(this.props.location).get('fio'),
            group: new URLSearchParams(this.props.location).get('group'),
            teacher: new URLSearchParams(this.props.location).get('teacher'),
        };
    }

    sendAnswers = () => {
        fetch('http://localhost:8888/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                score: this.state.rightAnswers,
                countOfQuestion: this.state.countOfQuestion,
                fio: this.state.fio,
                group: this.state.group,
                teacher: this.state.teacher,
                percent:
                    Math.round(
                        (this.state.rightAnswers / this.state.countOfQuestion) *
                            100
                    ).toString() + '%',
                time:
                    Math.floor((Date.now() - this.state.time) / 60000) +
                    ':' +
                    ((((Date.now() - this.state.time) % 60000) / 1000).toFixed(
                        0
                    ) < 10
                        ? '0'
                        : '') +
                    (((Date.now() - this.state.time) % 60000) / 1000).toFixed(
                        0
                    ),
            }),
        }).then((e) => console.log(e));
    };

    componentDidMount() {
        // this.sendAnswers();
    }

    render() {
        console.log(this.state);
        return (
            <div className="container text-center finish-window">
                <nav>
                    <h1>Тест был завершен.</h1>
                    <br></br>
                </nav>
                <h2 id="result">
                    Ваш результат:{' '}
                    {Math.round(
                        (this.state.rightAnswers / this.state.countOfQuestion) *
                            100
                    ).toString() + '%'}
                </h2>
                <h2 id="correct-answers">
                    Правильные ответы: {this.state.rightAnswers}/
                    {this.state.countOfQuestion}
                </h2>
                <h2 id="time-elapsed">
                    Времени потрачено:{' '}
                    {Math.floor((Date.now() - this.state.time) / 60000) +
                        ':' +
                        ((
                            ((Date.now() - this.state.time) % 60000) /
                            1000
                        ).toFixed(0) < 10
                            ? '0'
                            : '') +
                        (
                            ((Date.now() - this.state.time) % 60000) /
                            1000
                        ).toFixed(0)}
                </h2>
                <Link className="btn btn-success col-3" to="/">
                    Вернуться в главное меню
                </Link>
            </div>
        );
    }
}

export default FinishTest;
