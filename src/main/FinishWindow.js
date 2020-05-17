import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class FinishTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rightAnswers: '',
            countOfQuestion: '',
            time:""
        };
    }

    componentDidMount() {
        if (this.props.location) {
            this.setState({
                rightAnswers: new URLSearchParams(this.props.location).get(
                    'rightAnswers'
                ),
                countOfQuestion: new URLSearchParams(this.props.location).get(
                    'countOfQuestion'
                ),
                time: new URLSearchParams(this.props.location).get(
                    'time'
                ),
            });
        }
    }

    sendAnswers = () => {
        fetch('http://localhost:8888/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                score: this.state.rightAnswers,
                countOfQuestion: this.state.countOfQuestion,
            }),
        }).then((e) => console.log(e));
    };

    render() {
        return (
            <div className="container text-center">
                <nav>
                    <h1>Тест был завершен.</h1>
                </nav>
                <h1 id="result">
                    Ваш результат: {Math.round((this.state.rightAnswers / this.state.countOfQuestion * 100)).toString() + '%'}
                </h1>
                <h1 id="correct-answers">
                    Правильные ответы: {this.state.rightAnswers}/
                    {this.state.countOfQuestion}
                </h1>
                <h1 id="time-elapsed">Времени потрачено: {Math.floor((Date.now() - this.state.time) / 60000) + ":" + ((((Date.now() - this.state.time) % 60000) / 1000).toFixed(0) < 10 ? '0' : '') + (((Date.now() - this.state.time) % 60000) / 1000).toFixed(0)}</h1>
                <Link to="/">Назад к списку вопросов</Link>
                <Button
                    id="send-button"
                    className="btn btn-warning col-2"
                    onClick={this.sendAnswers}
                >
                    Закончить тест
                </Button>
            </div>
        );
    }
}

export default FinishTest;
