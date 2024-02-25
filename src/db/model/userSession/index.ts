import prisma from "@/db";

export async function setUserSession(exam_id:number, data: string, current_index: number, current_answer: number){
    return prisma.userSession.create({
        data: {
            topic_id: exam_id,
            current_answer: current_answer,
            current_index: current_index,
            data
        }
    })
}

export async function getSession(exam_id: number){
    return prisma.userSession.findFirst({
        where: {topic_id: exam_id}
    })
}
