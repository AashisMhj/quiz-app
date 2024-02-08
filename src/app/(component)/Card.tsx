import { CardDataType } from "@/types";
import Link from "next/link";

interface Props {
    data: CardDataType
}
const Card = ({ data }: Props) => {
    return (
        <Link key={data.id} href={`/${data.id}`} className=" py-6 px-2 font-medium rounded-lg shadow-lg" style={{ backgroundColor: data.color || '#0FF7E0' }}>
            <div className="flex justify-center items-center flex-col">
                <img className="h-24 aspect-square" src="/images/question.png" />
                <h1 className="text-2xl text-center text-black">
                    {data.name}
                </h1>
            </div>
        </Link>
    )
}

export default Card;