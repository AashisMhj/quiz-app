import {getQuestion} from "@/db/model/question";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request:NextRequest, {params}:{params:{question_id:string}} ){
    try {
        // TODO check session
        let question_id = parseInt(params.question_id);
        if(!question_id){
            return NextResponse.json({
                msg: 'Invalid QuestionId'
            }, {status: 400})
        }
        // TODO check if the id is in session
        const question = await getQuestion(question_id);
        if(!question){
            return NextResponse.json({
                msg: "Can't find the question."
            }, {status: 404})
        }
        // calculate the no of answer
        const answer = JSON.parse(question.answer);
        const no_answer = Array.isArray(answer) ? answer.length : 1;
        return NextResponse.json({
            data: {
                question: question.question,
                revalidate: question.revalidate,
                options: JSON.parse(question.options),
                tag: question.tag,
                no_answer
            }
        }, {status: 200});
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: 'Server Error'
        }, {status: 500});
    }
}