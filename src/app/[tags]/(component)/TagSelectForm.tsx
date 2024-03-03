"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
//
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getUrlWithQueryParams } from "@/helper/url.helper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Spinner from "@/components/common/spinner/Spinner";
import { Switch } from "@/components/ui/switch";
interface Props {
  tags: {
    id: number;
    tag_name: string;
    topic_id: number | null;
    revise_count: number;
    non_revise_count: number;
  }[];
  topic_id: number;
  total: {
    revise_count: number;
    non_revise_count: number;
  };
}
const TagSelectForm = ({ tags, topic_id, total }: Props) => {
  const [selected_tags, setSelectedTags] = useState<number[]>([]);
  const [is_loading, setIsLoading] = useState(true);
  const [is_loading_exam, setIsLoadingExam] = useState(false);
  const [is_revise, setIsRevise] = useState(false);
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
      method: "POST",
      body: JSON.stringify({ tags: selected_tags, is_revise }),
    })
      .then(() => {
        const url = getUrlWithQueryParams(
          `/exam/${topic_id}`,
          "tags",
          selected_tags,
        );
        router.push(url);
      })
      .catch(console.trace)
      .finally(() => setIsLoadingExam(false));
  }

  const examStatus = useCallback(() => {
    setIsLoading(true);
    fetch(`/api/exam/${topic_id}/status`)
      .then((data) => {
        if (data.status === 200) {
          router.push(`/exam/${topic_id}`);
        }
      })
      .catch(console.trace)
      .finally(() => setIsLoading(false));
  }, [topic_id, router]);

  const total_count = useMemo(() => {
    if (is_revise) {
      return total.revise_count;
    } else {
      return total.revise_count + total.non_revise_count;
    }
  }, [is_revise]);

  useEffect(() => {
    examStatus();
  }, [examStatus]);


  if (is_loading)
    return (
      <Card className="flex items-center justify-center gap-4 py-6">
        <Spinner />
        <Spinner />
        <Spinner />
      </Card>
    );

  return (
    <Card>
      <CardContent className="mt-3">
        <div className="mb-3 flex items-center justify-between px-2">
          <div>Total Questions: {total_count}</div>
          <div className="flex items-center gap-2">
            <Switch
              id="revise-switch"
              checked={is_revise}
              onCheckedChange={(event) => {
                setIsRevise(event);
              }}
            />
            <label htmlFor="revise-switch">Revise</label>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-6">
          {tags.map((tag) => (
            <div key={tag.id}>
              {/* TODO: Use correct change handler */}
              <Checkbox
                name={tag.tag_name}
                value={tag.id}
                checked={selected_tags.includes(tag.id)}
                onCheckedChange={() => changeHandler(tag.id)}
              />{" "}
              {tag.tag_name} (
              {is_revise
                ? tag.revise_count
                : tag.non_revise_count + tag.revise_count}
              )
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={is_loading_exam} onClick={clickHandler}>
          Start Quiz{" "}
          {selected_tags.length > 0
            ? selected_tags.reduce((prev, current) => {
                const findIndex = tags.findIndex(
                  (value) => value.id === current,
                );
                if (findIndex !== -1) {
                  if (is_revise) {
                    return prev + tags[findIndex].revise_count;
                  } else {
                    return (
                      prev +
                      tags[findIndex].non_revise_count +
                      tags[findIndex].revise_count
                    );
                  }
                }
                return prev;
              }, 0)
            : total_count}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TagSelectForm;
