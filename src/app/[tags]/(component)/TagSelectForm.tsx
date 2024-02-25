"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getUrlWithQueryParams } from "@/helper/url.helper";
interface Props {
    tags: {
        id: number;
        tag_name: string;
        topic_id: number | null;
    }[],
    topic_id: number
}
const TagSelectForm = ({ tags, topic_id }: Props) => {
    const [selected_tags, setSelectedTags] = useState<number[]>([]);
    const router = useRouter();

    function changeHandler(tag_id: number) {
        let temp = [...selected_tags];
        if (tag_id) {
            const tag_index = temp.indexOf(tag_id);
            if (tag_index === -1) {
                temp.push(tag_id);
            } else {
                temp.splice(tag_index, 1);
            }
        }
        setSelectedTags(temp);
    }

    function clickHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        fetch(`/api/exam/${topic_id}/start`, {
            method: 'POST',
            body: JSON.stringify({ tags: selected_tags})
        }).then(data => {
            const url = getUrlWithQueryParams(`/exam/${topic_id}`, "tags", selected_tags);
            console.log(url);
        }).catch(console.trace);
    }

    return <div className="flex flex-col gap-4 w-full border-2 border-black p-2 rounded-lg">
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-6 sm:grid-cols-2 gap-4 p-2">
                {
                    tags.map(tag => <div key={tag.id}>
                        {/* TODO: Use correct change handler */}
                        <Checkbox name={tag.tag_name} value={tag.id} checked={selected_tags.includes(tag.id)} onClick={() => changeHandler(tag.id)} /> {tag.tag_name}
                    </div>)
                }
            </div>
        </div>
        <div >
            <Button onClick={clickHandler}>Start Quiz</Button>
        </div>
    </div>
}

export default TagSelectForm;