const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for quizPro
const QuizProSchema = new Schema({
  action: {
    type: String,
    required: [true, 'The quizPro text field is required']
  }
})

//create model for quizPro
const quizPro = mongoose.model('quizPro', QuizProSchema);

module.exports = quizPro;