"use client";
import {  useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
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

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        const tag_id = parseInt(event.target.value);
        let temp = [...selected_tags];
        if (tag_id) {
            const tag_index = temp.indexOf(tag_id);
            if (tag_index === -1) {
                temp.push(tag_id);
            } else {
                temp = temp.splice(1, tag_index);
            }
        }
        setSelectedTags(temp);
    }

    function clickHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const urlParams = new URLSearchParams();
        if (selected_tags.length >= 1) {
            urlParams.set("tags", selected_tags.toString());
        }
        const url = `/exam/${topic_id}?`+urlParams.toString();
        router.push(url);
    }

    return <div className="flex flex-col gap-4 w-full bg-white p-2 rounded-lg">
        <div >
            <button className="border-2 p-2 border-black" onClick={clickHandler}>Start Quiz</button>
        </div>
        <div className="flex gap-4 p-2">
            {
                tags.map(tag => <div key={tag.id} className="flex justify-center gap-2 cursor-pointer">
                    <input type="radio" name={tag.tag_name} onChange={changeHandler} value={tag.id} checked={selected_tags.includes(tag.id)} />
                    <label className="" htmlFor={tag.tag_name} >{tag.tag_name}</label>
                </div>)
            }
        </div>
    </div>
}

export default TagSelectForm;