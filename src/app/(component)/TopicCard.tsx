import Image from "next/image";
import Link from "next/link";
//
import { CardDataType } from "@/types";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    data: CardDataType
}

const TopicCard = ({ data }: Props) => {
    return (
        <Link key={data.id} href={`/${data.id}`}>
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>{data.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Image className="h-24 aspect-square" height={96} width={96} alt="question" src="/images/question.png" />
                </CardContent>
            </Card>
        </Link>
    )
}

export default TopicCard;