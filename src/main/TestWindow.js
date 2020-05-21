import React from 'react';
import './TestWindow.css';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Countdown from 'react-countdown-now';

class TestWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            studentAnswers: {},
            show: false,
            date: +new URLSearchParams(this.props.location).get("date"),
            fio: new URLSearchParams(this.props.location).get("fio"),
            group: new URLSearchParams(this.props.location).get("group"),
            teacher: new URLSearchParams(this.props.location).get("teacher")
        };
    }

    //user score
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

    //handle answer
    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value,
            studentAnswers: {
                ...this.state.studentAnswers,
                [this.props.id]: changeEvent.target.value,
            },
        });
    };

    //save answers
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this.setState({
                selectedOption: `${
                    prevState.studentAnswers.hasOwnProperty(this.props.id)
                        ? prevState.studentAnswers[this.props.id]
                        : ''
                }`,
            });
        }
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

    render() {
        return (
            <div className="container">
                <div className="d-flex">
                    <div id="question-number">
                        Вопрос {+this.props.id + 1} из{' '}
                        {this.props.countOfQuestions}{' '}
                    </div>
                    <div id="timer">
                        Время:
                        <Countdown
                            date={this.state.date + +this.props.settings.time.value}

                        >
                            <Redirect
                                to={{
                                pathname: `/finish`,
                                search: `?rightAnswers=${this.getScore()}&countOfQuestion=${
                                    this.props.countOfQuestions
                                }&time=${this.state.date}&fio=${this.state.fio}&group=${this.state.group}&teacher=${this.state.teacher}`,
                            }}
                            />
                        </Countdown>
                    </div>
                </div>
                <div id="question-area">
                    <div id="question">
                        {this.props.selectedQuestions[this.props.id].question}
                    </div>
                    <pre style={{"background-color": "rgb(245, 242, 240)"}}>
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
                <div className="row test-button">
                    <Link
                        id="send-button"
                        className={`btn btn-danger col-1 ${
                            this.props.id == 0 && 'disabled'
                        }`}
                        to={
                            this.props.id - 1 >= 0 && {
                                pathname: `/test/${+this.props.id - 1}`,
                            }
                        }
                    >
                        Назад
                    </Link>
                    <Link
                        id="send-button"
                        className={`btn btn-success col-1 ${
                            this.props.id == this.props.countOfQuestions - 1 &&
                            'disabled'
                        }`}
                        to={
                            this.props.id < this.props.countOfQuestions - 1 && {
                                pathname: `/test/${+this.props.id + 1}`,
                            }
                        }
                    >
                        Вперед
                    </Link>
                    <Button
                        id="send-button"
                        className="btn btn-warning col-2 offset-8"
                        onClick={this.handleShow}
                    >
                        Закончить тест
                    </Button>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Подтверждение об окончании теста
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Вы уверены, что хотите закончить тест?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={this.handleClose}
                            >
                                Закрыть окно
                            </Button>
                            <Link
                                className="btn btn-primary"
                                onClick={this.handleClose}
                                to={{
                                    pathname: `/finish`,
                                    search: `?rightAnswers=${this.getScore()}&countOfQuestion=${
                                        this.props.countOfQuestions
                                    }&time=${this.state.date}&fio=${this.state.fio}&group=${this.state.group}&teacher=${this.state.teacher}`,
                                }}
                            >
                                Закончить тест
                            </Link>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default TestWindow;
