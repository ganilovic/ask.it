const express = require('express');
const router = express.Router({ mergeParams: true });
const answerService = require('./answers.service');

// routes
router.post('/create', addAnswer);
router.get('/', getAll);

module.exports = router;

function addAnswer(req, res, next) {
  answerService.addAnswer(req.body)
      .then((response) => res.json(response))
      .catch(err => next(err));
}


function getAll(req, res, next) {
  answerService.getAll()
      .then(answers => res.json(answers))
      .catch(err => next(err));
}

