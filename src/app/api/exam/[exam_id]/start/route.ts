import { NextRequest, NextResponse } from "next/server";
//
import { getQuestionsList } from "@/db/model/question";
import { hasSession, setUserSession } from "@/db/model/userSession";
import { shuffle } from "@/helper/array.helper";
import {StartExam} from "@/validation-schema";
import { validate } from "@/helper/validation.helper";
import { getTags } from "@/db/model/tags";

export const dynamic = 'force-dynamic';

export async function POST(request:NextRequest, {params}:{params:{exam_id:string}}){
    try {
        const body = await request.json();
        const validatedData = validate(StartExam, body);
        let tags:number[] = [];
        let is_revise = false;
        if(validatedData !== null){
            if(validatedData.tags) tags = validatedData.tags;
            if(typeof validatedData?.is_revise === "boolean") is_revise = validatedData.is_revise;
        }
        const exam_id = parseInt(params.exam_id);
        if (!exam_id) {
            return NextResponse.json({
                msg: "Error"
            }, { status: 400 });
        }
        // 
        const has_session = await hasSession(exam_id);
        if(has_session){
            return NextResponse.json({
                msg: "Exam Already in Progress"
            }, {status: 400});
        }
        let questions = (await getQuestionsList(exam_id, tags, is_revise )).map(el => el.id);
        const tag_names = (await getTags(tags)).map(el => el.tag_name);
        const tag_string = tag_names.length >= 1 ? JSON.stringify(tag_names) : `["all"]`;
        questions = shuffle(questions);
        await setUserSession(exam_id, JSON.stringify(questions), 0, 0, tag_string)
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