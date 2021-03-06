import React, { useState } from 'react';


    const QuestionBox =({question,option,selected})=>{
            const [answers , setAnswer]= useState(option); 
        return (  
            <div className="questionBank">
                <div className="questionBox">{question}</div>
                {answers.map((text, index)=>
                <button 
                key={index} 
                className="answerBtn"
                onClick = {()=>{
                    setAnswer([text]);
                    selected(text); 
                }}>
                     {text}
                </button>)}
            </div>
        );
    }

 
export default QuestionBox;