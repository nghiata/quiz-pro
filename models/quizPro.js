const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for quizPro
const QuizProSchema = new Schema({
  question: {
    type: String,
    required: [true, 'The quizPro text field is required']
  },
  description: {
      type: Array,
      required: [true, 'description is required']
  },
  answer: {
      type: Number,
      required: [true, 'ansert is required']
  }
})

//create model for quizPro
const quizPro = mongoose.model('quizPro', QuizProSchema);

module.exports = quizPro;