import questionModel from "@/db/model/question";
import { shuffle } from "@/helper/array.helper";
import { NextRequest, NextResponse } from "next/server";
// next js config
export const dynamic = 'force-dynamic';

export async function GET(request:NextRequest){
    try {
        // TODO: start user session
        let questions = (await questionModel.getQuestionsList('aws-solutions-architect')).map(el => el.id);
        questions = shuffle(questions);
        return NextResponse.json({
            questions
        })
    } catch (error) {
        return NextResponse.json({
            msg: 'Server Error'
        }, {status: 500})
    }
}