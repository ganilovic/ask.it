import React from "react";

const askQuestion = props => {
  return (
    
    localStorage.getItem("user") && (
        <div>
          <div className="form-group">
            <label for="comment">Question:</label>
            <textarea
              className="form-control"
              rows="4"
              id="comment"
              onChange={props.onChange}
            />
          </div>
          <button
            className="btn btn-primary btn-lg btn-lg"
            onClick={props.onClick}
          >
            Ask Question
          </button>
        </div>
      )
  );
};

export default askQuestion;
