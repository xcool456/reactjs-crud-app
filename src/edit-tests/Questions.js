import React from "react";
import { Link } from "react-router-dom";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(e) {
    const id = e.target.value;
    fetch(`http://localhost:8080/db/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => this.props.onUpdate(id));
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    let items = this.props.items;
    
    items = items.filter(
      (prod) => prod.question.indexOf(this.state.name) !== -1
    );

    return (
      <div className="container my-5">
        <Link to="/new-question" className="btn btn-secondary">
          Добавить новый вопрос
        </Link>
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
              <div className="col-3">
                <Link to={{ pathname: `/question-view/${item._id}` }}>
                  {item.question}
                </Link>
              </div>
              <div className="col-3">
                <pre>{item.code}</pre>
              </div>
              <div className="col-3">
                {Object.keys(item.answers).map((key, index) => (
                  <div key={key}>
                    {index + 1}){item.answers[key]}
                  </div>
                ))}
              </div>
              <div className="col-1">{+item.correctAnswer+1}</div>
              <div className="col-2">
                <Link
                  to={{
                    pathname: "/new-question",
                    search: `?question=${item.question}&code=${item.code}&correctAnswer=${item.correctAnswer}&answer0=${item.answers["answer0"]}&answer1=${item.answers["answer1"]}&answer2=${item.answers["answer2"]}&answer3=${item.answers["answer3"]}&answer4=${item.answers["answer4"]}&id=${item._id}`,
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

export default Questions;
