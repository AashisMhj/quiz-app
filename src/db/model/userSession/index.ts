import prisma from "@/db";

export async function setUserSession(exam_id:number, data: string, current_index: number, current_answer: number, tags: string){
    return prisma.userSession.create({
        data: {
            topic_id: exam_id,
            current_answer: current_answer,
            current_index: current_index,
            tags,
            data
        },
        select: {topic_id: true, current_answer: true, current_index: true, data: true, tags: true}
    },)
}

export async function getSession(exam_id: number){
    return prisma.userSession.findFirst({
        where: {topic_id: exam_id},
        select: {topic_id: true, current_answer: true, current_index: true, data: true, tags: true}
    })
}

export async function hasSession(exam_id:number):Promise<boolean>{
    try {
        const data =  await prisma.userSession.findFirst({
            where: {
                topic_id: exam_id
            }
        });
        return !!data;
    } catch (error) {
        return false;
    }
}

export async function endSession(exam_id:number){
    return prisma.userSession.delete({
        where: {
            topic_id: exam_id
        }
    })
}

export async function incrementValue(exam_id:number, increment_score:boolean){
    // TODO user fetched row in controller
    // TODO find easier/ more readable way to do this
    if(increment_score){
        return prisma.$executeRaw`update "userSession" set current_index = current_index + 1, current_answer = current_answer + 1 where topic_id = ${exam_id}`
    }else{
        return prisma.$executeRaw`update "userSession" set  current_index = current_index + 1 where topic_id = ${exam_id}`
    }
}
