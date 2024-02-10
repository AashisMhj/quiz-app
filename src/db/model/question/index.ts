import prisma from "@/db";

export async function getQuestionsList(id:number, tags:number[] | undefined){
    const data = await prisma.question.findMany({
        where: {
            topic_id: id,
            tag_id: {
                in: tags
            }
        },
        select: {id: true}
    });
    return data;
}

export async function getQuestion(id:number){
    const question = await prisma.question.findFirst({
        where: {id},
        select: {
            question:true, options:true, tag: true, answer: true, revalidate: true
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

const Question = {
    getQuestionsList,
    getQuestion,
    getAnswer
};

export default Question;