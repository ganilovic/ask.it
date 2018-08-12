import { questionConstants } from "../_constants";
import { questionService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const questionActions = {
  getAll,
  create,
  createAnswer
};

function getAll() {
  return dispatch => {
    questionService
      .getAll()
      .then(
        questions => dispatch(successGetQuestions(questions)),
        error => dispatch(failure(error.toString()))
      );
  };

  function failure(error) {
    return { type: questionConstants.GETALL_FAILURE, error };
  }
}

function successGetQuestions(questions) {
  return { type: questionConstants.GETALL_SUCCESS, questions };
}

function create(text, user, questions) {
  return dispatch => {
    questionService.create(text, user.username).then(
      question => {
        var items = questions.items || [];
        items.push(question);

        dispatch(successGetQuestions(items));
        dispatch(alertActions.success("Question created"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function failure(error) {
    return { type: questionConstants.CREATE_FAILURE, error };
  }
}

function createAnswer(questions, _id, text, user) {
  return dispatch => {
    questionService.createAnswer(_id, text, user.username).then(
      answer => {
        questions.items.map(
          (question, index) =>
            question.id === _id ? question.answers.push(answer) : []
        );

        dispatch(successGetQuestions(questions.items));
        dispatch(alertActions.success("Answer added"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  
  function failure(text, error) {
    return { type: questionConstants.CREATE_FAILURE_ANSWER, error };
  }
}
