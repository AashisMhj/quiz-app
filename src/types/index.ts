export type QuestionType = {
    question: string,
    options: Array<string>,
    answer: number | Array<number>
    tag?: Array<string>,
}

export type CardDataType = {
    name: string,
    id: number,
    image: string,
    color?: string | null
}
