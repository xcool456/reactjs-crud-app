import React from "react";
import { Link } from "react-router-dom";

class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        question: "",
        code: "",
        answers: {},
        correctAnswer: "",
      },
    };
    this.createItem = this.createItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createItem() {
    if (this.props.location) {
      const id = new URLSearchParams(this.props.location).get("id");
      fetch("http://localhost:8080/db/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.formControls),
      }).then(() => this.props.onUpdate());
    } else {
      fetch("http://localhost:8080/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.formControls),
      }).then(() => this.props.onUpdate());
    }
  }

  handleChange(event) {
    const { name, value } = event.target;

    if (name.indexOf("answer") !== -1) {
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

  componentDidMount() {
    if (this.props.location) {
      this.setState({
        formControls: {
          question: new URLSearchParams(this.props.location).get("question"),
          code: new URLSearchParams(this.props.location).get("code"),
          answers: {
            answer0: new URLSearchParams(this.props.location).get("answer0"),
            answer1: new URLSearchParams(this.props.location).get("answer1"),
            answer2: new URLSearchParams(this.props.location).get("answer2"),
            answer3: new URLSearchParams(this.props.location).get("answer3"),
            answer4: new URLSearchParams(this.props.location).get("answer4"),
          },
          correctAnswer: new URLSearchParams(this.props.location).get(
            "correctAnswer"
          ),
        },
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 font-weight-bold">
            <label htmlFor="question">Введите вопрос: </label>
            <input
              className="form-control w-50"
              id="question"
              onChange={this.handleChange}
              name="question"
              value={this.state.formControls.question}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12 font-weight-bold">
            <label htmlFor="code">Код(по желанию): </label>
            <textarea
              className="form-control w-50"
              id="code"
              onChange={this.handleChange}
              name="code"
              value={this.state.formControls.code}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12 font-weight-bold">
            <label>Введите ответы: </label>
            <input
              className="form-control w-25 my-1"
              id="answer0"
              onChange={this.handleChange}
              name="answer0"
              value={this.state.formControls.answers.answer0}
            />
            <input
              className="form-control w-25 my-1"
              id="answer1"
              onChange={this.handleChange}
              name="answer1"
              value={this.state.formControls.answers.answer1}
            />
            <input
              className="form-control w-25 my-1"
              id="answer2"
              onChange={this.handleChange}
              name="answer2"
              value={this.state.formControls.answers.answer2}
            />
            <input
              className="form-control w-25 my-1"
              id="answer3"
              onChange={this.handleChange}
              name="answer3"
              value={this.state.formControls.answers.answer3}
            />
            <input
              className="form-control w-25 my-1"
              id="answer4"
              onChange={this.handleChange}
              name="answer4"
              value={this.state.formControls.answers.answer4}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 font-weight-bold">
            <label>Введите номер правильного ответа(отсчет с 0): </label>
            <input
              className="form-control w-25"
              id="correctAnswer"
              onChange={this.handleChange}
              name="correctAnswer"
              value={this.state.formControls.correctAnswer}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-5">
            <Link
              to="/questions"
              className={"btn btn-primary btn-sm mr-3 "}
              onClick={this.createItem}
            >
              Добавить
            </Link>
            <Link to="/questions" className="btn btn-secondary btn-sm">
              Назад
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewQuestion;
