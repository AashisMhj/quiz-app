import db from "@/db";
import TagSelectForm from "./(component)/TagSelectForm";
interface Props{
    params: {
        tags: string
    }
}
export async function generateStaticParams(){
    const topic_ids = await db.topic.findMany({
        select: {
            id: true
        }
    });

    return topic_ids.map((topic) => ({
        tags: topic.id+''
    }));
}
const TagPage = async ({params}:Props)=>{
    const topic_id = parseInt(params.tags);
    if(!topic_id){
        return <div>Not Found</div>
    }
    // TODO check if the session exists
    const tags = await db.tag.findMany({
        where: {
            topic_id
        }
    });
    return (
        <div className="max-w-7xl mx-auto pt-6">
            <h1 className="text-center text-2xl">Select the Fields</h1>
            <TagSelectForm tags={tags} topic_id={topic_id} />
        </div>
    )
}

export default TagPage;