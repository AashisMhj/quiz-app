import Link from "next/link";
import { HelpCircle } from "lucide-react";
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
            <Card className="text-center h-72 flex flex-col justify-around">
                <CardHeader>
                    <CardTitle>{data.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <HelpCircle className="h-[96px] w-[96px]" />
                </CardContent>
            </Card>
        </Link>
    )
}

export default TopicCard;