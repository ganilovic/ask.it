import React from "react";

const answer = props => {
  if (!props) {
    return null;
  }

  if (!props.answers.length > 0) {
    return (
      <div className="card">
        <ul className="list-group-flush">
          <li className="list-group-item"> Noone provided an answer yet. </li>
        </ul>
      </div>
    );
  }
  let odgovor;

  return props.answers.map((answer, index) => (
    <div class="card">
      <ul class="list-group-flush">
        <li class="list-group-item">{(odgovor = answer.text)}</li>
      </ul>
    </div>
  ));

  return <p> No answers.</p>;
};

export default answer;
