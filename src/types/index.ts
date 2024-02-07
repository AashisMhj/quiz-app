export type QuestionType = {
    question: string,
    options: Array<string>,
    answer: number | Array<number>
    tag?: Array<string>,
}

export type CardDataType = {
    label: string,
    link: string,
    image: string,
    color?: string
}
