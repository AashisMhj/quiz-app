import fs from "fs";
import { PrismaClient, Prisma } from "@prisma/client";
// aws solutions architect
import solutions_architect_data from "../../data/aws/associate-solutions-architect/data.json";
import solutions_architect_data_private from "../../data/aws/associate-solutions-architect/data2.json";
import directrev_data from "../../data/aws/associate-solutions-architect/directrev.json";
// aws 
import associate_developer from "../../data/aws/associate-developer/data.json";
// front end react
import frontend_data from "../../data/frontend/react/data.json";

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
            data: [...directrev_data, ...solutions_architect_data, ...solutions_architect_data_private].map(el => ({
                question: el.question,
                options: JSON.stringify(el.options),
                answer: JSON.stringify(el.answer || 0),
                tag: el.tag,
                type: 'aws-solutions-architect',
                revalidate: false,
            }))
        },
        {
            name: 'AWS Associate Developer',
            slug: 'aws-associate-developer',
            color: '#FF9900',
            image: QuestionImage,
            data: [...associate_developer].map(el => ({
                question: el.question,
                options: JSON.stringify(el.options),
                answer: JSON.stringify(el.answer),
                tag: el.tag,
                type: 'aws-associate-developer',
                revalidate: false
            }))
        },
        {
            name: 'React',
            slug: 'react',
            image: QuestionImage,
            data: [...frontend_data].map(el =>({
                question: el.question,
                options: JSON.stringify(el.options),
                answer: JSON.stringify(el.answer || 0),
                tag: el.tag,
                type: 'frontend-react',
                revalidate: false,
            }))
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
    // install default tag 
    const default_tag = await prisma.tag.create({
        data: {
            tag_name: 'other',
            topic_id: topic_data.id
        }
    });
    // Create Many is not supported in sqlite
    for(let i=0; i < topics.data.length; i++){
        let el = topics.data[i];
        let tag_id: number = default_tag.id;
        // in case of new tag
        // case when the tag is already inserted
        if (el.tag) {
            if (tag_titles.includes(el.tag) && tags[el.tag]) {
                tag_id = tags[el.tag].id
            } else {
                const tag_data = await prisma.tag.create({
                    data: {
                        tag_name: el.tag,
                        topic_id: topic_data.id
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
                topic_id: topic_data.id,
                tag: undefined
            }
        })
    }
}

(async () => {
    const types = await getTopics();
    types.forEach(async el => {
        insertData(el)
    });
})()