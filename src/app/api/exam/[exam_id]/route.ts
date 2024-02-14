import { getQuestionsList } from "@/db/model/question";
import { shuffle } from "@/helper/array.helper";
import { getSession, setSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
// next js config
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { exam_id: string } }) {
    try {
        const tags = request.nextUrl.searchParams.get('tags');
        const tags_array = tags ? tags.split(',').map(el => parseInt(el)) : [];
        const exam_id = parseInt(params.exam_id);
        if (!exam_id) {
            return NextResponse.json({
                msg: "Error"
            }, { status: 400 })
        }
        // check if the exam has already started
        const session = getSession();
        if(session && session[exam_id]){
            return NextResponse.json({...session});
        }else{
            let questions = (await getQuestionsList(exam_id, tags_array)).map(el => el.id);
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
        }
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: 'Server Error'
        }, { status: 500 })
    }
}