import React from "react";
import Answer from "../_components/Answer";

const question = props => {
  return (
    <div>
      <div className="card">
        <div className="card text-white bg-secondary mb-3">
          <h5 className="card-text">Question posted by {props.question.username}</h5>
          <p key className={props.question.id}>
            {props.question.text}
          </p>
        </div>
      </div>

      {props.question.id === props.questionId ? (
        <Answer answers={props.question.answers} />
      ) : null}

      <div>
        <div className="form-group">
          <label for="comment">Answer:</label>
          <textarea
            onClick={props.show}
            className="form-control"
            rows="4"
            id="comment"
            onChange={props.inputHandler}
          />
        </div>
        {}
        {localStorage.getItem("user") && (
          <button
            className="btn btn-primary pull-right"
            onClick={props.addAnswer}
          >Add Answer</button>
        )}
      </div>
    </div>
  );
};

export default question;
