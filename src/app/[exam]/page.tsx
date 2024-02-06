"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { shuffle } from "@/helper/array.helper";
import { QuestionType } from "@/types";
import clsx from "clsx";

const ExamPage = () => {
    const [question_ids, setQuestionsIds] = useState<number[]>([]);
    const [current_question_index, setCurrentQuestionIndex] = useState(0);
    const [current_question, setCurrentQuestion] = useState<{ question: string, options: string[] } | null>(null);
    const [user_answer, setUserAnswer] = useState<Array<number>>([]);
    const [current_question_answers, setCurrentQuestionAnswer] = useState<number[] | number | null>(null);
    const [no_answers, setNoAnswers] = useState(1);
    const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);

    function checkBoxChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const index = user_answer?.indexOf(parseInt(event.target.value));
        let temp = [...user_answer];
        if (index === -1) {
            // TODO: make so that the user can only accept the no of specified answer
            temp.push(parseInt(event.target.value));
        } else {
            temp = temp.splice(1, index)
        }
        setUserAnswer(temp);
    }

    function nextQuestion() {
        setCurrentQuestionIndex(current_question_index+1);
        setIsCheckingAnswer(false);
        setCurrentQuestionAnswer(null);
        setUserAnswer([]);
    }


    function isAnswer(option_index: number):boolean {
        if(!current_question_answers) return false
        if (Array.isArray(current_question_answers)) {
            return current_question_answers.includes(option_index);
        } else {
            return option_index === current_question_answers
        }
    }

    function checkAnswer(){
        setIsCheckingAnswer(true);
        fetch(`/api/answer/${question_ids[current_question_index]}`, {method: 'POST', body: JSON.stringify({answer: user_answer})})
            .then(data => data.json())
            .then(data => {
                if(data.answer){
                    setCurrentQuestionAnswer(data.answer)
                }
            })
            .catch(console.trace)
    }

    useEffect(() => {
        if(!current_question_index) return;
        fetch(`/api/question/${question_ids[current_question_index]}`)
            .then(data => data.json())
            .then(data => {
                if (data.data) {
                    const question_data = data.data as { question: string, options: string[] };
                    setCurrentQuestion(question_data)
                }
            })
    }, [current_question_index])


    useEffect(() => {
        fetch('/api/exam')
            .then(data => data.json())
            .then(data => {
                if (data.questions) {
                    setQuestionsIds(data.questions as number[]);
                    setCurrentQuestionIndex(1)
                }
            })
            .catch(console.trace)
    }, []);

    return <div className="text-black max-w-6xl mx-auto pt-4">
        <div className="text-3xl text-center mb-3">Solutions Architect </div>
        <div className="mb-3">No of Question: {current_question_index + 1}/{question_ids.length}</div>
        <div className="p-2 border-b-2">
            {
                current_question ? (
                    current_question_index > question_ids.length ? (
                        <div>Finished</div>
                    ) : (
                        <div>
                            <div className="text-4xl font-medium mb-2">{current_question.question}</div>
                            <span>Please Select {no_answers}</span>
                            <div className="mb-3">
                                {
                                    current_question.options.map((option, index) => <div key={option} className={clsx("text-2xl mb-1", { 'bg-green-500': isCheckingAnswer && isAnswer(index + 1) })}><input type="checkbox" className="cursor-pointer p-8" onChange={checkBoxChangeHandler} value={index + 1} checked={user_answer?.includes(index + 1)} /> {option}</div>)

                                }
                            </div>
                            <div className="w-full flex justify-center items-center">
                                {
                                    isCheckingAnswer ? (
                                        <button className="py-2 px-4 border-2 border-black" onClick={nextQuestion}>Next</button>
                                    ) : (
                                        <button className="py-2 px-4 border-2 border-black" onClick={checkAnswer}>Check</button>
                                    )
                                }
                            </div>
                        </div>
                    )
                ) : <div>Loading </div>
            }
        </div>
    </div>
}

export default ExamPage;