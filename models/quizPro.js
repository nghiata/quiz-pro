const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for quizPro
const QuizProSchema = new Schema({
  question: {
    type: String,
    required: [true, 'The quizPro text field is required']
  },
  answers: {
      type: Array,
      required: [true, 'answers is required']
  }
})

//create model for quizPro
const quizPro = mongoose.model('quizPro', QuizProSchema);

module.exports = quizPro;
