import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Question from "../_components/Question";
import Answer from "../_components/Answer";
import ShowAnswers from "../_components/ShowAnswers";
import AskQuestion from "../_components/AskQuestion";

import { questionActions } from "../_actions";

class MyQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionId: null,
      questionInput: "",
      answerInput: ""
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

  render() {
    const { question, questions } = this.props;
    return (
      <div>
        <h2>My Questions:</h2>
        {questions.loading && <em>Loading questions...</em>}
        {questions.error && (
          <span className="text-danger">ERROR: {questions.error}</span>
        )}
        {questions.items && (
          <ul>
            {questions.items.map(
              (question, index) =>
                question.username ===
                JSON.parse(localStorage.getItem("user")).username ? (
                  <div>
                    <Question
                      question={question}
                      questionId={this.state.questionId}
                      inputHandler={
                        (this.onChange = e => this.answerInputHandler(e))
                      }
                      addAnswer={this.addAnswer(this.state.answerInput, question.id)}
                      show={this.showAnswers.bind(this, question.id)}
                    />
                    <ShowAnswers
                      stateQuestionId={this.state.questionId}
                      questionId={question.id}
                      hide={this.toggleAnswersHandler.bind(this, question.id)}
                      show={this.toggleAnswersHandler.bind(this, question.id)}
                    />
                  </div>
                ) : null
            )}
            <AskQuestion
              onChange={(this.onChange = e => this.questionInputHandler(e))}
              onClick={this.addQuestion(this.state.questionInput)}
            />
          </ul>
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

const connectedMyQuestions = connect(mapStateToProps)(MyQuestions);
export { connectedMyQuestions as MyQuestions };
