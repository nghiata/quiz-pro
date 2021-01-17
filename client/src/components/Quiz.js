import React, {Component} from 'react';
import axios from 'axios';

import Input from './Input';
import ListQuiz from './ListQuiz';

class Quiz extends Component {

  state = {
    quizs: []
  }

  componentDidMount(){
    this.getQuizs();
  }

  getQuizs = () => {
    axios.get('/api/quiz-pro')
      .then(res => {
        if(res.data){
          this.setState({
            quizs: res.data
          })
        }
      })
      .catch(err => console.log(err))
  }

  deleteQuiz = (id) => {

    axios.delete(`/api/quiz-pro/${id}`)
      .then(res => {
        if(res.data){
          this.getQuizs()
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    let { quizs } = this.state;

    return(
      <div>
        <h1>My Quiz(s)</h1>
        <Input getQuizs={this.getQuizs}/>
        <ListQuiz quizs={quizs} deleteQuiz={this.deleteQuiz}/>
      </div>
    )
  }
}

export default Quiz;