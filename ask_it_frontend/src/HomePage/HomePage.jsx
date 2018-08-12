import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Question from "../_components/Question";
import Answer from "../_components/Answer";
import ShowAnswers from "../_components/ShowAnswers";
import AskQuestion from "../_components/AskQuestion";

import { questionActions } from "../_actions";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionId: null,
      questionInput: "",
      answerInput: "",
      limitQuestions: 4
    };
  }

  componentDidMount() {
    this.props.dispatch(questionActions.getAll());
  }

  addQuestion(text) {
    var user = JSON.parse(localStorage.getItem("user"));
    var questions = this.props.questions;
    return e =>
      this.props.dispatch(questionActions.create(text, user, questions));
  }

  addAnswer(text, questionId) {
    var user = JSON.parse(localStorage.getItem("user"));
    var questions = this.props.questions;
    return e =>
      this.props.dispatch(
        questionActions.createAnswer(questions, questionId, text, user)
      );
  }

  questionInputHandler(event) {
    const text = event.target.value;
    this.setState({ questionInput: text });
  }

  answerInputHandler(event) {
    const text = event.target.value;
    this.setState({ answerInput: text });
  }

  toggleAnswersHandler(questionId) {
    this.state.questionId === questionId
      ? this.setState({ questionId: null })
      : this.setState({ questionId: questionId });
  }

  showAnswers(questionId) {
    this.setState({ questionId: questionId });
  }

  renderQuestions(questions) {
    if (questions && questions.items && questions.items.length > 0) {
      return questions.items
        .slice(0, this.state.limitQuestions)
        .map((question, index) => {
          return (
            <div>
              <Question
                question={question}
                questionId={this.state.questionId}
                inputHandler={(this.onChange = e => this.answerInputHandler(e))}
                addAnswer={this.addAnswer(this.state.answerInput, question.id)}
                show={this.showAnswers.bind(this, question.id)}
              />
              <ShowAnswers
                stateQuestionId={this.state.questionId}
                questionId={question.id}
                show={this.toggleAnswersHandler.bind(this, question.id)}
              />
            </div>
          );
        });
    } else return null;
  }

  loadMore() {
    this.setState({ limitQuestions: this.state.limitQuestions + 2 });
  }

  render() {
    const { question, questions } = this.props;
    return (
      <div>
        {questions && questions.items && questions.items.length > 0 ? (
        <h2>All Questions:</h2> ) : <h2>No questions asked yet</h2> } 
        {questions.loading && <em>Loading questions...</em>}
        {questions.error && (
          <span className="text-danger">ERROR: {questions.error}</span>
        )}

        <ul>{this.renderQuestions(questions)}</ul>

        {questions && questions.items && questions.items.length > 0 ? (
          <button
            className="btn btn-secondary"
            onClick={this.loadMore.bind(this)}
          >
            Load more
          </button>
        ) : null}

        <AskQuestion
          onChange={(this.onChange = e => this.questionInputHandler(e))}
          onClick={this.addQuestion(this.state.questionInput)}
        />

        {!localStorage.getItem("user") && (
          <div className="card">
            <div className="card-body">
              <h3>Login to Ask questions!</h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { questions, authentication } = state;
  const { question } = authentication;
  return {
    question,
    questions
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
