import db from "@/db";
//
import TagSelectForm from "./(component)/TagSelectForm";
import H1 from "@/components/typography/H1";
interface Props {
    params: {
        tags: string
    }
}
export async function generateStaticParams() {
    const topic_ids = await db.topic.findMany({
        select: {
            id: true
        }
    });

    return topic_ids.map((topic) => ({
        tags: topic.id + ''
    }));
}
const TagPage = async ({ params }: Props) => {
    const topic_id = parseInt(params.tags);
    if (!topic_id) {
        return <div>Not Found</div>
    }
    // TODO check if the session exists
    const tags = await db.tag.findMany({
        where: {topic_id}
    });
    return (
        <div className="max-w-7xl mx-auto pt-6">
            <div className="text-center mb-4">
                <H1>Tag Selection</H1>
            </div>
            <TagSelectForm tags={tags} topic_id={topic_id} />
        </div>
    )
}

export default TagPage;