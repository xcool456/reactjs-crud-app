import React from 'react';

class FinishTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rightAnswers: '',
            countOfQuestion: ''
        };
    }

    componentDidMount() {
        if (this.props.location) {
            this.setState({
                rightAnswers: new URLSearchParams(this.props.location).get(
                    'rightAnswers'
                ),
                countOfQuestion: new URLSearchParams(this.props.location).get('countOfQuestion'),
            });
        }
    }

    render() {
        return (
            <>
                <nav>
                    <h1>Тест был успешно завершен.</h1>
                </nav>
                <h1 id="result">Ваш результат: {this.state.rightAnswers}/{this.state.countOfQuestion}</h1>
                <h1 id="correct-answers">Правильные ответы: </h1>
                <h1 id="time-elapsed">Времени потрачено: </h1>
            </>
        );
    }
}

export default FinishTest;
