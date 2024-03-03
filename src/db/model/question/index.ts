import prisma from "@/db";

export async function getQuestionsList(id:number, tags:number[], is_revise:boolean){
    const data = await prisma.question.findMany({
        where: tags.length > 0 ? {
            topic_id: id,
            tag_id: {
                in: tags
            },
            revise: is_revise
        } : {
            topic_id: id,
            revise: is_revise
        },
        select: {id: true}
    });
    return data;
}

export async function getQuestion(id:number){
    const question = await prisma.question.findFirst({
        where: {id},
        select: {
            question:true, options:true, tag: true, answer: true, revalidate: true, revise: true
        }
    });
    return question;
}

export async function getAnswer(id:number){
    const question = await prisma.question.findFirst({
        where: {id},
        select: {answer:true}
    });
    return question;
}


export async function enableRevalidate(question_id:number){
    await prisma.question.update({
        where: {id: question_id},
        data: {revalidate: true}
    })
}

export async function enableRevise(question_id:number){
    await prisma.question.update({
        where: {id: question_id},
        data: {revise: true}
    });
}

const Question = {
    getQuestionsList,
    getQuestion,
    getAnswer
};

export default Question;