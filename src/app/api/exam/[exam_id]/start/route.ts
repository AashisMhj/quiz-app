import { NextRequest, NextResponse } from "next/server";
//
import { getQuestionsList } from "@/db/model/question";
import { setUserSession } from "@/db/model/userSession";
import { shuffle } from "@/helper/array.helper";
import {StartExam} from "@/validation-schema";
import { validate } from "@/helper/validation.helper";
import { getTags } from "@/db/model/tags";

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
        const tag_names = (await getTags(tags)).map(el => el.tag_name);
        const tag_string = tag_names.length > 1 ? JSON.stringify(tag_names) : `["all"]`
        questions = shuffle(questions);
        const data = await setUserSession(exam_id, JSON.stringify(questions), 0, 0, tag_string)
        return NextResponse.json({
            msg: "Exam Session Started"
        });
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: 'Server Error'
        }, { status: 500 });
    }
}