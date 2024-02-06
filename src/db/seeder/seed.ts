import data from "../../data/aws/solutions-architect/data.json"
import { PrismaClient, Prisma } from "@prisma/client";
import { QuestionType } from "@/types";

const prisma = new PrismaClient();

(async () => {
    const insertData = data.map(el => ({
        question: el.question,
        options: JSON.stringify(el.options),
        answer: JSON.stringify(el.answer),
        tag: el.tag,
        type: 'aws-solutions-architect',
        revalidate: !!el.revalidate  ,
    }))
    // Create Many is not supported in sqlite
    insertData.forEach(async(el) =>{
        await prisma.question.create({
            data: el
        })
    })
})()