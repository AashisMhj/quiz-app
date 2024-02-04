"use client"
import data from "@/data/solutions-architect/data.json";
import { shuffle } from "@/helper/array.helper";
import { useState } from "react";

const ExamPage = () => {
    const questions = shuffle(data);
    const [current_question, setCurrentQuestion] = useState(0);
    const [count, setCount] = useState(0);
    return <div className="text-white max-w-2xl mx-auto pt-4">
        <div className="text-3xl text-center mb-3">Solutions Architect </div>
        <div>No of Question: {data.length}</div>
        <div>
            {
            }
        </div>
    </div>
}

export default ExamPage;