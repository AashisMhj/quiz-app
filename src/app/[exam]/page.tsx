"use client"
import { ChangeEvent, useEffect, useState } from "react";
import data from "@/data/solutions-architect/data.json";
import { shuffle } from "@/helper/array.helper";
import { QuestionType } from "@/types";
import clsx from "clsx";

const ExamPage = () => {
    const [question_data, setQuestionData] = useState(data as Array<QuestionType>);
    const [current_question_index, setCurrentQuestionIndex] = useState(0);
    const [user_answer, setUserAnswer] = useState<Array<number>>([]);
    const [no_answers, setNoAnswers] = useState(1);
    const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
    const [correct_answer_count, setCorrectAnswerCount] = useState(0);

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
        const current_index = current_question_index;
        setCurrentQuestionIndex(current_question_index+1);
        setIsCheckingAnswer(false);
        setUserAnswer([]);
        let no_answer = 1;
        const nextQuestionAnswers = question_data[current_index+1].answer;
        if(Array.isArray(nextQuestionAnswers)){
            const no_answer = nextQuestionAnswers.length;
        }
        setNoAnswers(no_answer)
    }


    function isAnswer(option_index: number) {
        const current_question = question_data[current_question_index];
        if (Array.isArray(current_question.answer)) {
            return current_question.answer.includes(option_index);
        } else {
            return option_index === current_question.answer
        }
    }


    useEffect(() => {
        setQuestionData(shuffle(question_data));
    }, [question_data]);
    return <div className="text-black max-w-6xl mx-auto pt-4">
        <div className="text-3xl text-center mb-3">Solutions Architect </div>
        <div className="mb-3">No of Question: {current_question_index + 1}/{data.length}</div>
        <div className="p-2 border-b-2">
        {
            current_question_index > data.length ? (
                <div>Finished</div>
            ) : (
                <div>
                    <div className="text-4xl font-medium mb-2">{question_data[current_question_index].question}</div>
                    <span>Please Select {no_answers}</span>
                    <div className="mb-3">
                        {
                            question_data[current_question_index].options.map((option, index) => <div key={option} className={clsx("text-2xl mb-1", { 'bg-green-500': isCheckingAnswer && isAnswer(index + 1) })}><input type="checkbox" className="cursor-pointer p-8" onChange={checkBoxChangeHandler} value={index + 1} checked={user_answer?.includes(index + 1)} /> {option}</div>)

                        }
                    </div>
                    <div className="w-full flex justify-center items-center">
                        {
                            isCheckingAnswer ? (
                                <button className="py-2 px-4 border-2 border-black" onClick={nextQuestion}>Next</button>
                            ) : (
                                <button className="py-2 px-4 border-2 border-black" onClick={() => setIsCheckingAnswer(true)}>Check</button>
                            )
                        }
                    </div>
                </div>
            )
        }
        </div>
    </div>
}

export default ExamPage;