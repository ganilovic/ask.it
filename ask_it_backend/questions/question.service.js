const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;
const Question = db.Question;

module.exports = {
  create,
  getAll,
  getById,
  getHotQuestions,
  delete: _delete
};

async function getAll() {
  const question = await Question.find().populate("answers");
  return question;
}

async function getHotQuestions() {
  return await Question.find()
    .sort({ rating: 1 })
    .limit(20);
}

async function getById(id) {
  return await Question.find({ _id: id });
}

async function create(questionParam) {
  const question = new Question(questionParam);
  const response = await question.save();
  console.log(response);
  return response;
}

async function getAnswers(req) {
  return await Question.find({
    id: req.params.questionId
  });
}

async function _delete(id) {
  await Question.findByIdAndRemove(id);
}
