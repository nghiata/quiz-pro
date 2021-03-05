const express = require('express');
const router = express.Router();
const QuizPro = require('../models/quizPro');

/**
 * Show all quiz currently
 * @params none
 * @return object
 */
router.get('/quiz-pro', (req, res, next) => {

    //this will return all the data, exposing only the id and action field to the client
    QuizPro.find()
        .then(data => res.json(data))
        .catch(next)
});
/**
 * Show only the quiz by id
 * @params id
 * @return object
 */
router.get('/quiz-pro/:id', (req, res, next) => {
    QuizPro.findOne({ "_id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
})
/**
 * Add a new quiz
 * @params object
 * @return object
 */
router.post('/quiz-pro', (req, res, next) => {
    if (req.body) {
        QuizPro.create(req.body)
            .then(data => res.json(data))
            .catch(next)
    } else {
        res.json({
            error: "The input field is empty"
        })
    }
});
/**Update a quiz by id
 * @params object
 * @return object
 */
router.put('/quiz-pro/:id', (req, res, next) => {
    if (req.body) {
        QuizPro.updateOne({"_id": req.params.id}, {
            "question": req.body.question,
            "answers": req.body.answers
        })
        .then(data => res.json(data))
        .catch(next)
    } else {
        res.json({
            error: "The input field is empty"
        })
    }
})
/**
 * Remove a quiz by id
 * @params id
 * @return object
 */
router.delete('/quiz-pro/:id', (req, res, next) => {
    QuizPro.findOneAndDelete({ "_id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
})

module.exports = router;
