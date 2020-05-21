import React from 'react';
import Questions from './edit-tests/Questions';
import NewQuestion from './edit-tests/NewQuestion';
import QuestionView from './edit-tests/QuestionView';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import MainMenu from './main/MainMenu';
import TestWindow from './main/TestWindow';
import FinishTest from './main/FinishWindow';
import Settings from './edit-tests/Settings';
import EditSettings from './edit-tests/EditSettings';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            selectedQuestions: [],
            date: '',
            settings: {},
        };
    }

    getDb() {
        fetch('http://localhost:8080/db')
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            )
    }

    getSettings = () => {
        fetch('http://localhost:8080/settings')
            .then((res) => res.json())
            .then(
                (result) => {
                    for (let i = 0; i < result.length; i++) {
                        this.setState({
                            isLoaded: true,
                            settings: {
                                ...this.state.settings,
                                [result[i].name]: {
                                    id: result[i]._id,
                                    value: result[i].value,
                                    text: result[i].text,
                                },
                            },
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            )
            .then(() => this.generateQuiz(this.state.settings.countOfQuestion.value));
    };

    generateQuiz = (amount = 10, questionList = this.state.items) => {
        let usedQuestions = [];
        let questionSet = [];
        let questionListLength = questionList.length;

        for (let i = 0; i < amount; ) {
            let randomQuestionIndex = Math.floor(
                Math.random() * questionListLength
            );

            if (!usedQuestions[randomQuestionIndex]) {
                questionSet[i] = questionList[randomQuestionIndex];
                usedQuestions[randomQuestionIndex] = true;
                i++;
            }
        }
        this.setState({
            selectedQuestions: questionSet,
        });
    };

    updateItemsAfterDelete(id) {
        this.setState({
            items: this.state.items.filter((prod) => prod._id !== id),
        });
    }

    componentDidMount() {
        this.getDb();
        this.getSettings();


        // fetch("http://localhost:8080/settings", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({name: "teacher",value:"10",text:"Иванов Иван Иванович"}),
        // })

        // fetch("http://localhost:8080/settings/dZzzOuB2FRJ54MCb", {
        //     method: "DELETE",
        //
        // })
    }

    render() {
        if (this.state.error) {
            return <div>Ошибка: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <MainMenu items={this.state.items} settings={this.state.settings}/>
                        </Route>
                        <Route
                            path="/test/:id"
                            render={({ match, location }) => (
                                <TestWindow
                                    id={match.params.id}
                                    selectedQuestions={
                                        this.state.selectedQuestions
                                    }
                                    countOfQuestions={
                                        this.state.settings.countOfQuestion.value
                                    }
                                    location={location.search}
                                    settings={this.state.settings}
                                />
                            )}
                        />
                        <Route
                            path="/finish"
                            render={({ location }) => (
                                <FinishTest location={location.search} />
                            )}
                        />
                        <Route
                            path="/settings"
                            render={({ location }) => (
                                <Settings settings={this.state.settings} />
                            )}
                        />
                        <Route
                            path="/edit-settings"
                            render={({ location }) => (
                                <EditSettings onUpdate={() => this.getSettings()} location={location.search} />
                            )}
                        />
                        <div className="questions-edit">
                            <div className="container">
                                <div className="row">
                                    <Link to="/">
                                        <img
                                            src=".\lens.png"
                                            style={{ width: 75 + 'px' }}
                                            alt="Logo"
                                        />
                                    </Link>
                                    <h1 className="align-self-end">
                                        Добавление новых вопросов для теста
                                    </h1>
                                    <hr className="w-100" />
                                </div>
                            </div>
                            <Route path="/questions">
                                <Questions
                                    items={this.state.items}
                                    onUpdate={(i) =>
                                        this.updateItemsAfterDelete(i)
                                    }
                                />
                            </Route>
                            <Route
                                path="/new-question"
                                render={({ location }) => (
                                    <NewQuestion
                                        onUpdate={() => this.getDb()}
                                        location={location.search}
                                    />
                                )}
                            />
                            <Route
                                path="/question-view/:id"
                                render={({ match }) => (
                                    <QuestionView id={match.params.id} />
                                )}
                            />
                        </div>
                    </Switch>
                </BrowserRouter>
            );
        }
    }
}

export default App;
