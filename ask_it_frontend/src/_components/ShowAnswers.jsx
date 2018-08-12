import React from 'react';

const showAnswers = (props) => {
    return (
        props.questionId === props.stateQuestionId ? 
        <div>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={props.show}>Hide Answers</button>
        </div> :
        <div>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={props.show}>Show Answers</button>
         </div>
        
    )

      
}




export default showAnswers;
