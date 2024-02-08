import fs from "fs";
import { PrismaClient, Prisma } from "@prisma/client";
import data from "../../data/aws/solutions-architect/data.json"

const prisma = new PrismaClient();

const toBase64 = (filePath: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const reader = await fs.promises.readFile(filePath);
            let base64String = '';
            base64String = reader.toString('base64');
            resolve(base64String)
        } catch (error) {
            reject(error);
        }
    });
};
const getTopics = async () => {
    const QuestionImage = await toBase64(__dirname + '/images/question.png');
    const SolutionsImage = await toBase64(__dirname + '/images/Solutions-Architect.-Associate.png');
    return [
        {
            name: 'AWS Associate Solutions Architect',
            slug: 'aws-associate-solutions-architect',
            color: '#FF9900',
            image: SolutionsImage,
            data: data.map(el => ({
                question: el.question,
                options: JSON.stringify(el.options),
                answer: JSON.stringify(el.answer),
                tag: el.tag,
                type: 'aws-solutions-architect',
                revalidate: !!el.revalidate,
            }))
        },
        {
            name: 'AWS Associate Developer',
            slug: 'aws-associate-developer',
            color: '#FF9900',
            image: QuestionImage,
            data: []
        },
        {
            name: 'Frontend',
            slug: 'frontend',
            image: QuestionImage,
            data: []
        }
    ]
}

let tags: {
    [key: string]: { id: number, tag_name: string }
} = {};
let tag_titles: String[] = [];

const insertData = async (topics: {
    name: string;
    image: string;
    slug: string;
    color?: string;
    data: {
        question: string,
        options: string,
        answer: string,
        tag?: string,
        type: string,
        revalidate: boolean
    }[]
}) => {

    const topic_data = await prisma.topic.create({
        data: {
            image: topics.image,
            name: topics.name,
            slug: topics.slug,
            color: topics.color
        },
    });
    // Create Many is not supported in sqlite
    topics.data.forEach(async (el) => {
        let tag_id: number | null = null;
        if (el.tag && tags[el.tag]) {
            tag_id = tags[el.tag].id;
        } else {
            if (el.tag && !tag_titles.includes(el.tag)) {
                const tag_data = await prisma.tag.create({
                    data: {
                        tag_name: el.tag,
                    }
                });
                tags[el.tag] = tag_data;
                tag_id = tag_data.id;
                tag_titles.push(tag_data.tag_name);
            }
        }
        await prisma.question.create({
            data: {
                ...el,
                tag_id: tag_id,
                tag: undefined
            }
        })
    })
}

(async () => {
    const types = await getTopics();
    types.forEach(async el => {
        insertData(el)
    });
})()