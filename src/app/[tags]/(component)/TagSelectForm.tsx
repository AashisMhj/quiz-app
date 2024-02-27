"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
//
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getUrlWithQueryParams } from "@/helper/url.helper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Spinner from "@/components/common/spinner/Spinner";
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
    const [is_loading, setIsLoading] = useState(true);
    const [is_loading_exam, setIsLoadingExam] = useState(false);
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
        setIsLoadingExam(true);
        fetch(`/api/exam/${topic_id}/start`, {
            method: 'POST',
            body: JSON.stringify({ tags: selected_tags })
        }).then(() => {
            const url = getUrlWithQueryParams(`/exam/${topic_id}`, "tags", selected_tags);
            router.push(url);
        }).catch(console.trace)
        .finally(() => setIsLoadingExam(false));
    }

    const examStatus = useCallback(() => {
        setIsLoading(true);
        fetch(`/api/exam/${topic_id}/status`)
            .then(data => {
                if (data.status === 200) {
                    router.push(`/exam/${topic_id}`);
                }
            })
            .catch(console.trace)
            .finally(() => setIsLoading(false))
    }, [topic_id, router])

    useEffect(() => {
        examStatus();
    }, [examStatus])

    if (is_loading) return <Card className="flex justify-center items-center py-6 gap-4">
        <Spinner />
        <Spinner />
        <Spinner />
    </Card>

    return <Card>
        <CardContent className="mt-3">
            <div className="grid grid-cols-1 lg:grid-cols-6 sm:grid-cols-2 gap-4 p-2">
                {
                    tags.map(tag => <div key={tag.id}>
                        {/* TODO: Use correct change handler */}
                        <Checkbox name={tag.tag_name} value={tag.id} checked={selected_tags.includes(tag.id)} onCheckedChange={() => changeHandler(tag.id)} /> {tag.tag_name}
                    </div>)
                }
            </div>
        </CardContent>
        <CardFooter >
            <Button disabled={is_loading_exam} onClick={clickHandler}>Start Quiz</Button>
        </CardFooter>
    </Card>
}

export default TagSelectForm;