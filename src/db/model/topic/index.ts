import prisma from "@/db";

export async function getTopics(){
    return prisma.topic.findMany();
}

export async function getTopicDetail(id:number){
    return prisma.topic.findFirst({
        where: {
            id
        }
    })
}