const express = require ('express');
const router = express.Router();
const QuizPro = require('../models/quizPro');

router.get('/quiz-pro', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  QuizPro.find({}, 'action')
    .then(data => res.json(data))
    .catch(next)
});

router.post('/quiz-pro', (req, res, next) => {
  if(req.body.action){
    QuizPro.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/quiz-pro/:id', (req, res, next) => {
  QuizPro.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;