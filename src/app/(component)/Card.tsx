import { CardDataType } from "@/types";
import Link from "next/link";

interface Props {
    data: CardDataType
}
const Card = ({ data }: Props) => {
    return (
        <Link key={data.link} href={data.link} className="text-white py-2 px-2 font-medium rounded-lg shadow-lg" style={{backgroundColor: data.color || '#0FF7E0'}}>
            {data.label}
        </Link>
    )
}

export default Card;