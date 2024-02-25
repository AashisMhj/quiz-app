import { NextRequest, NextResponse } from "next/server";
//
import { getQuestionsList } from "@/db/model/question";
import { setUserSession } from "@/db/model/userSession";
import { shuffle } from "@/helper/array.helper";
import {StartExam} from "@/validation-schema";
import { validate } from "@/helper/validation.helper";

export const dynamic = 'force-dynamic';

export async function POST(request:NextRequest, {params}:{params:{exam_id:string}}){
    try {
        const validatedData = validate(StartExam, request.json());
        let tags:number[] = [];
        if(validatedData !== null){
            tags = validatedData.tags;
        }
        const exam_id = parseInt(params.exam_id);
        if (!exam_id) {
            return NextResponse.json({
                msg: "Error"
            }, { status: 400 })
        }
        let questions = (await getQuestionsList(exam_id, tags)).map(el => el.id);
        questions = shuffle(questions);
        console.log(questions);
        await setUserSession(exam_id, JSON.stringify(questions), 0, 0)
        return NextResponse.json({
            msg: "Exam Started"
        })
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: 'Server Error'
        }, { status: 500 });
    }
}