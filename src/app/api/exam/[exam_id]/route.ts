import { getQuestionsList } from "@/db/model/question";
import { getSession, setUserSession } from "@/db/model/userSession";
import { shuffle } from "@/helper/array.helper";
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
        const session = await getSession(exam_id);
        if(session){
            return NextResponse.json({
                data: {
                    ...session,
                    data: JSON.parse(session?.data || "[]")
                }
            });
        }else{
            let questions = (await getQuestionsList(exam_id, tags_array)).map(el => el.id);
            questions = shuffle(questions);
            await setUserSession(exam_id, JSON.stringify(questions), 0, 0);
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