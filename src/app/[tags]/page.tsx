import db from "@/db";
import TagSelectForm from "./(component)/TagSelectForm";
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
    return (
        <div className="max-w-7xl mx-auto pt-6">
            <h1 className="text-center text-2xl">Select the Fields</h1>
            <TagSelectForm tags={tags} topic_id={topic_id} />
        </div>
    )
}

export default TagPage;