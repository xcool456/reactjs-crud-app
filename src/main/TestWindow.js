import React from 'react';
import './TestWindow.css';
import { Link } from 'react-router-dom';

class TestWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            studentAnswers: {},
        };
    }

    getScore = () => {
        let userScore = 0;
        for (let i = 0; i < this.props.selectedQuestions.length; i++) {
            if (
                this.props.selectedQuestions[i].correctAnswer ===
                this.state.studentAnswers[i]
            ) {
                userScore++;
            }
        }
        return userScore;
    };

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value,
            studentAnswers: {
                ...this.state.studentAnswers,
                [this.props.id]: changeEvent.target.value,
            },
        });
    };

    componentDidUpdate(prevProps,prevState) {
        console.log(1);
        if (prevProps.id !== this.props.id) {
            this.setState({
                selectedOption: `${prevState.studentAnswers.hasOwnProperty(this.props.id)   ? prevState.studentAnswers[this.props.id]  : "" }`,
            });
        }
    }

    render() {
        console.log(this.state);
        console.log(this.props);
        return (
            <div className="container">
                <div id="question-area">
                    <div id="question">
                        {this.props.selectedQuestions[this.props.id].question}
                    </div>
                    <pre>
                        <code id="code">
                            {this.props.selectedQuestions[this.props.id].code}
                        </code>
                    </pre>

                    <div id="answers">
                        <div className="answer">
                            <input
                                type="radio"
                                name="answer"
                                id="answer0"
                                value="0"
                                checked={this.state.selectedOption === '0'}
                                onChange={this.handleOptionChange}
                            />
                            <label htmlFor="answer0" className="answer-label">
                                {
                                    this.props.selectedQuestions[this.props.id]
                                        .answers.answer0
                                }
                            </label>
                        </div>
                        <div className="answer">
                            <input
                                type="radio"
                                name="answer"
                                id="answer1"
                                value="1"
                                checked={this.state.selectedOption === '1'}
                                onChange={this.handleOptionChange}
                            />
                            <label htmlFor="answer1" className="answer-label">
                                {
                                    this.props.selectedQuestions[this.props.id]
                                        .answers.answer1
                                }
                            </label>
                        </div>
                        <div className="answer">
                            <input
                                type="radio"
                                name="answer"
                                id="answer2"
                                value="2"
                                checked={this.state.selectedOption === '2'}
                                onChange={this.handleOptionChange}
                            />
                            <label htmlFor="answer2" className="answer-label">
                                {
                                    this.props.selectedQuestions[this.props.id]
                                        .answers.answer2
                                }
                            </label>
                        </div>
                        <div className="answer">
                            <input
                                type="radio"
                                name="answer"
                                id="answer3"
                                value="3"
                                checked={this.state.selectedOption === '3'}
                                onChange={this.handleOptionChange}
                            />
                            <label htmlFor="answer3" className="answer-label">
                                {
                                    this.props.selectedQuestions[this.props.id]
                                        .answers.answer3
                                }
                            </label>
                        </div>
                        <div className="answer">
                            <input
                                type="radio"
                                name="answer"
                                id="answer4"
                                value="4"
                                checked={this.state.selectedOption === '4'}
                                onChange={this.handleOptionChange}
                            />
                            <label htmlFor="answer4" className="answer-label">
                                {
                                    this.props.selectedQuestions[this.props.id]
                                        .answers.answer4
                                }
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Link
                        id="send-button"
                        className="btn btn-danger col-2"
                        to={
                            this.props.id - 1 >= 0 && {
                                pathname: `/test/${+this.props.id - 1}`,
                            }
                        }
                    >
                        Назад
                    </Link>
                </div>
                <div className="row justify-content-center">
                    <Link
                        id="send-button"
                        className="btn btn-warning col-2"
                        to={{
                            pathname: `/finish`,
                            search: `?rightAnswers=${this.getScore()}&countOfQuestion=${
                                this.props.countOfQuestions
                            }`,
                        }}
                    >
                        Отправить
                    </Link>
                </div>
                <div className="row justify-content-center">
                    <Link
                        id="send-button"
                        className="btn btn-success col-2"
                        to={
                            this.props.id < this.props.countOfQuestions - 1 && {
                                pathname: `/test/${+this.props.id + 1}`,
                            }
                        }
                    >
                        Вперед
                    </Link>
                </div>
            </div>
        );
    }
}

export default TestWindow;
