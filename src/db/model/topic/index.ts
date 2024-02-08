import prisma from "@/db";

export async function getTopics(){
    return prisma.topic.findMany();
}