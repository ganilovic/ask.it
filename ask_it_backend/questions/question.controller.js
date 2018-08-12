const express = require('express');
const router = express.Router();
const questionService = require('./question.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/hotQuestions', getHotQuestions);
router.get('/:id', getById);


router.delete('/:questionId', _delete);

module.exports = router;

function create(req, res, next) {
    questionService.create(req.body)
        .then((response) => {
          res.json(response)
        })
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    questionService.getByUserId(req.params.userId)
        .then(question => question ? res.json(question) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    questionService.getAll()
        .then(questions => res.json(questions))
        .catch(err => next(err));
}

function getById(req, res, next) {
    questionService.getById(req.params.id)
        .then(questions => res.json(questions))
        .catch(err => next(err));
}

function getHotQuestions(req, res, next) {
    questionService.getHotQuestions()
        .then(questions => res.json(questions))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    questionService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
