const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;
const Answer = db.Answer;
const Question = db.Question;

module.exports = {
  addAnswer,
  getAll
};

async function addAnswer(body) {
  const answer = new Answer({
    text: body.text
  });

  const response = await answer.save();

  await Question.findByIdAndUpdate(
    body._id,
    {
      $push: { answers: response.id }
    },
    { new: true }
  );

  return response;
}

async function getAll() {
  return await Answer.find();
}
