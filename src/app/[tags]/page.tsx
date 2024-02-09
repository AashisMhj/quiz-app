import db from "@/db";
import Link from "next/link";
interface Props{
    params: {
        tags: string
    }
}
const TagPage = async ({params}:Props)=>{
    const topic_id = parseInt(params.tags);
    if(!topic_id){
        return <div>Not Found</div>
    }
    const tags = await db.tag.findMany({
        where: {
            topic_id
        }
    });
    console.log(tags);
    return (
        <div className="max-w-7xl mx-auto pt-6">
            Please Select the Tag
            <div>
                <Link href={`/exam`} >Start Test</Link>
            </div>
        </div>
    )
}

export default TagPage;