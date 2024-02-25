import { NextRequest, NextResponse } from "next/server";
import { getQuestionsList } from "@/db/model/question";
import { shuffle } from "@/helper/array.helper";
import { setSession } from "@/lib/session";

export const dynamic = 'force-dynamic';

export async function POST(request:NextRequest, {params}:{params:{exam_id:string}}){
    try {
        const data = await request.json() as { tags: number[] }
        const exam_id = parseInt(params.exam_id);
        if (!exam_id) {
            return NextResponse.json({
                msg: "Error"
            }, { status: 400 })
        }
        let questions = (await getQuestionsList(exam_id, data.tags)).map(el => el.id);
        questions = shuffle(questions);
        setSession({
            [exam_id]: {
                questions,
                current_index: 0,
                correct_answer: 0
            }
        })
        return NextResponse.json({
            questions
        })
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: 'Server Error'
        }, { status: 500 });
    }
}