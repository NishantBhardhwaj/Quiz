import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./assets/style.css";
import quizService from './quizService';
import QuestionBox from './components/questionBox';
import Result from './components/result';
class QuizGame extends Component {
    state = {  
        questionBank : [],
        score:0,
        responses:0
    };

    playAgain=()=>{
        this.getQuestions();
        this.setState({
            score:0,
            responses:0
        });
    };

    computeAnswer=(answers,correctAnswer)=>{
      if (answers === correctAnswer){
          this.setState({   
              score: this.state.score + 1
          });
      }
      this.setState({
          responses: this.state.responses+1
      });
    };
       

    getQuestions=()=>{
        quizService().then(question=>{
            this.setState({
                questionBank:question
            });
        });
    };
    

    componentDidMount(){
        this.getQuestions();
    }

    render() { 
        return ( 
            <div className="container">
                <div className="title">QuizGame</div>
                
                { this.state.questionBank.length > 0 &&
                  this.state.responses < 5 &&
                  this.state.questionBank.map(
                    
                    ({question, questionId, correct, answers})=>(
                    <QuestionBox 
                      question={question}  
                      option={answers} 
                      key={questionId} 
                      selected={answers => this.computeAnswer(answers,correct)}/>
                      
                    )
                )}

                {this.state.responses===5 ? (
                <Result score={this.state.score} playAgain={this.playAgain}/>
                ):null}
                    
            </div>
         );
    }
}
 
//export default QuizGame;
ReactDOM.render(<QuizGame />, document.getElementById("root"));