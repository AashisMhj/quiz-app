import prisma from "@/db";

export async function getTagDetail(tag_id:number){
    return prisma.tag.findFirst({
        where: {
            id: tag_id
        }
    });
}

export async function getTags(tags_ids: number[]){
    return prisma.tag.findMany({
        where: {
            id: {
                in: tags_ids
            }
        }
    });
}