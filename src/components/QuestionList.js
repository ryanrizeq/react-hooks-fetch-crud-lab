import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions }) {
  const [questionData, setQuestionData] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestionData(questions));
  }, []);

  function onDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r)=>r.json())
      .then(()=>setQuestionData(questionData.filter((question) => question.id !== id)))
    
  }

  function onIndexChange(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex
      })
    })
      .then((r)=>r.json())
      .then((updatedQuestion)=>{
        setQuestionData(questionData.map((question)=> {
          if(question.id === updatedQuestion.id) {
            return updatedQuestion
          } else {
            return question
          }
        }))
      })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionData.map((q) => {
        return <QuestionItem
          key={q.id}
          question={q}
          onDelete={onDelete}
          onIndexChange={onIndexChange}
        />
      })}</ul>
    </section>
  );
}

export default QuestionList;
