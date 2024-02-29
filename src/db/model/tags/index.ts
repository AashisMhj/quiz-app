import prisma from "@/db";

export async function getTagDetail(tag_id: number) {
    return prisma.tag.findFirst({
        where: {
            id: tag_id
        }
    });
}

export async function getTagsByExam(exam_id: number) {
    return prisma.tag.findMany({
        where: {
            topic_id: exam_id
        }
    });
}

export async function getTags(tags_ids: number[]) {
    return prisma.tag.findMany({
        where: {
            id: {
                in: tags_ids
            }
        }
    });
}

export async function getTagsWithTopicCount(topic_id: number) {
    return prisma.tag.findMany({
        where: {
            topic_id: topic_id
        },
        select: {
            _count: {
                select: {
                    questions: true
                }
            },
            tag_name: true
        },

    });
    
}

export async function getTagsWithTopicCountReviseGroupBy(topic_id: number) {
    const promise = Promise.all([
        prisma.question.groupBy({
            by: ['tag_id', 'revise',],
            where: {
                topic_id
            },
            _count: {
                _all: true
            },
        }),
        getTagsByExam(topic_id)
    ]);
    const [tagsCount, tags] = await promise
    return tags.map(tag => {
        return {
            ...tag,
            revise_count: tagsCount.find((tagC) => tagC.tag_id === tag.id && tagC.revise === true)?._count._all || 0,
            non_revise_count: tagsCount.find((tagC) => tagC.tag_id === tag.id && !tagC.revise)?._count._all || 0
        }
    })
    
}