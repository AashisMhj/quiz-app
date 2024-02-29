import db from "@/db";
//
import TagSelectForm from "./(component)/TagSelectForm";
import H3 from "@/components/typography/H3";
import { getTagsWithTopicCountReviseGroupBy } from "@/db/model/tags";
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
    const tags = await getTagsWithTopicCountReviseGroupBy(topic_id);
    return (
        <div className="max-w-7xl mx-auto pt-6">
            <div className="text-center mb-4">
                <H3>Tag Selection</H3>
            </div>
            <TagSelectForm tags={tags} topic_id={topic_id} total={tags.reduce((prev, next) => {
                return {
                    revise_count: prev.revise_count + next.revise_count,
                    non_revise_count: prev.non_revise_count + next.non_revise_count
                }
            }, {revise_count: 0, non_revise_count: 0})} />
        </div>
    )
}

export default TagPage;