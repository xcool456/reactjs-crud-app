import React from "react";
import { Link } from "react-router-dom";

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/db/" + this.props.id)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    if (this.state.error) {
      return <div>Ошибка: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="container">
          <div className="row">
            <h1 className="col my-3">{this.state.item.question}</h1>
          </div>
          <div className="row">
            <div className="col">
              <div className="font-weight-bold">Вопрос:</div>
              {this.state.item.question}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="font-weight-bold">Код:</div>
              {this.state.item.code}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="font-weight-bold">Варианты ответа:</div>
              {Object.keys(this.state.item.answers).map((key, index) => (
                <div key={key}>
                  {index + 1}){this.state.item.answers[key]}
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="font-weight-bold">Номер правильного ответа:</div>
              {+this.state.item.correctAnswer + 1}
            </div>
          </div>
          <div className="row">
            <div className="col my-3">
              <Link to="/questions">Назад к списку вопросов</Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default QuestionView;
