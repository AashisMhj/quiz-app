"use client";
import { ChangeEvent, useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
//
import { Badge } from "@/components/ui/badge";
import { shuffle } from "@/helper/array.helper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import H3 from "@/components/typography/H3";
import { Progress } from "@/components/ui/progress";
import { H4 } from "@/components/typography/H4";

interface Props {
  params: {
    exam: string;
  };
}

// TODO separate from component
function getStringArray(data: string): string[] {
  const parsed_data = JSON.parse(data);
  if (
    Array.isArray(parsed_data) &&
    parsed_data.every((el) => typeof el === "string")
  ) {
    return parsed_data;
  }
  return [];
}

const ExamPage = ({ params }: Props) => {
  const exam_id = parseInt(params.exam);
  const searchParams = useSearchParams();
  if (!exam_id) {
    // TODO navigate to 404
  }
  const [question_ids, setQuestionsIds] = useState<number[]>([]);
  const [current_question_index, setCurrentQuestionIndex] = useState(0);
  const [current_question, setCurrentQuestion] = useState<{
    question: string;
    options: { option: string; original_index: number }[];
    revalidate: boolean;
    revise: boolean;
  } | null>(null);
  const [user_answer, setUserAnswer] = useState<Array<number>>([]);
  const [current_question_answers, setCurrentQuestionAnswer] = useState<
    number[] | number | null
  >(null);
  const [exam_tags, setExamTags] = useState<string[]>([]);
  const [no_answers, setNoAnswer] = useState(1);
  const [score, setScore] = useState(0);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const router = useRouter();

  function checkBoxChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const index = user_answer?.indexOf(parseInt(event.target.value));
    let temp = [...user_answer];
    if (index === -1) {
      // TODO: make so that the user can only accept the no of specified answer
      temp.push(parseInt(event.target.value));
    } else {
      temp.splice(index, 1);
    }
    setUserAnswer(temp);
  }

  if (question_ids.length >= 1) {
    console.log(question_ids[current_question_index], current_question_index);
  }

  function nextQuestion() {
    setIsCheckingAnswer(false);
    setCurrentQuestionAnswer(null);
    setUserAnswer([]);
    fetchQuestion(current_question_index + 1, question_ids);
  }

  function isAnswer(option_index: number): boolean {
    if (!current_question_answers) return false;
    if (Array.isArray(current_question_answers)) {
      return current_question_answers.includes(option_index);
    } else {
      return option_index === current_question_answers;
    }
  }

  function checkAnswer() {
    setIsCheckingAnswer(true);
    fetch(`/api/answer/${question_ids[current_question_index]}/${exam_id}`, {
      method: "POST",
      body: JSON.stringify({ answer: user_answer }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.answer) {
          setCurrentQuestionAnswer(data.answer);
          if (data.is_correct) {
            setScore((prevData) => prevData + 1);
          }
        }
      })
      .catch(console.trace);
  }

  function enableRevise() {
    fetch(`/api/question/revise/${question_ids[current_question_index]}`, {
      method: "PATCH",
    })
      .then(() => {
        setCurrentQuestion((prevData) => {
          if (prevData) {
            return {
              options: prevData.options,
              question: prevData.question,
              revise: true,
              revalidate: prevData.revise,
            };
          } else return null;
        });
      })
      .catch(console.trace);
  }

  function requestRevalidate() {
    fetch(`/api/request-revalidate/${question_ids[current_question_index]}`)
      .then(() => {
        setCurrentQuestion((prevData) => {
          if (prevData) {
            return {
              options: prevData.options,
              question: prevData.question,
              revise: prevData.revise,
              revalidate: true,
            };
          } else return null;
        });
      })
      .catch(console.trace);
  }

  function endExamHandler() {
    fetch(`/api/exam/${exam_id}/end`)
      .then((data) => {
        if (data.status === 200) {
          router.push(`/`);
        }
      })
      .catch(console.trace);
  }

  function fetchQuestion(next_question_index: number, question_ids: number[]) {
    if (question_ids.length === 0) return;
    fetch(`/api/question/${question_ids[next_question_index]}`)
      .then((data) => data.json())
      .then((data) => {
        if (data.data) {
          const question_data = data.data as {
            question: string;
            options: string[];
            revalidate: boolean;
            revise: boolean;
            no_answer: number;
          };
          setCurrentQuestion({
            ...question_data,
            options: shuffle(
              question_data.options.map((el, index) => ({
                option: el,
                original_index: index,
              })),
            ),
          });
          setNoAnswer(question_data.no_answer);
          setCurrentQuestionIndex(current_question_index+1)
        }
      })
      .catch(console.trace);
  }

  useEffect(() => {
    if (!exam_id) return;
    const tags = searchParams.get("tags") || null;
    let url = `/api/exam/${exam_id}?`;
    if (tags) {
      url += `tags=${tags}`;
    }
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        if (data.data) {
          const { questions, current_answer, current_index, tags } =
            data.data as {
              questions: number[];
              topic_id: number;
              current_answer: number;
              current_index: number;
              tags: string;
            };
          // TODO implement a hook for that the components renders after all the states are set
          setQuestionsIds(questions as number[]);
          setCurrentQuestionAnswer(current_answer);
          setCurrentQuestionIndex(current_index);
          // TODO store tags in memory as it doesn't change
          const parsed_tags = getStringArray(tags);
          setExamTags(parsed_tags);
          fetchQuestion(current_index, questions as number[]);
        }
      })
      .catch(console.trace);
  }, [exam_id, searchParams]);

  return (
    <div className="mx-auto max-w-7xl pt-4 text-black">
      <div className="text-center dark:text-white">
        <H3>The Title</H3>
        {question_ids[current_question_index]}
      </div>
      <div className="mb-4 flex items-center justify-between px-6">
        <div className="flex flex-row items-center gap-2">
          <div className="dark:text-white">
            (<span className="text-green-600">{score}</span> +{" "}
            <span className="text-red-600">
              {current_question_index - score}
            </span>
            ) /<span className="text-blue-600">{question_ids.length}</span>
          </div>
          <div className="flex">
            {exam_tags.map((el) => (
              <Badge key={el}>{el}</Badge>
            ))}
          </div>
        </div>
        <div className=" flex items-center gap-2">
          <span
            className={clsx({
              "text-green-400": current_question?.revise,
              "text-red-400": !current_question?.revise,
            })}
          >
            Revise
          </span>
          |
          <span
            className={clsx({
              "text-green-400": current_question?.revalidate,
              "text-red-400": !current_question?.revalidate,
            })}
          >
            Revalidate
          </span>
          <Button onClick={endExamHandler}>End Exam</Button>
        </div>
      </div>
      <div className="mx-6 mb-3">
        <Progress
          className="w-full"
          value={current_question_index / question_ids.length}
        />
      </div>
      <Card>
        {current_question ? (
          current_question_index > question_ids.length ? (
            <CardHeader>
              <CardTitle>Finished</CardTitle>
            </CardHeader>
          ) : (
            <div>
              <CardHeader>
                <CardTitle>{current_question.question}</CardTitle>
                <CardDescription>
                  <span className="mb-4">Please Select {no_answers}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {current_question.options.map((option) => (
                  <div
                    key={option.original_index}
                    className={clsx("mb-2 flex items-start gap-2 text-2xl", {
                      "bg-green-500":
                        isCheckingAnswer && isAnswer(option.original_index + 1),
                    })}
                  >
                    <input
                      type="checkbox"
                      className="mt-2 cursor-pointer"
                      onChange={checkBoxChangeHandler}
                      value={option.original_index + 1}
                      checked={user_answer?.includes(option.original_index + 1)}
                    />
                    <H4>{option.option}</H4>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex gap-2">
                {isCheckingAnswer ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={enableRevise}
                      disabled={current_question.revise}
                    >
                      Revise
                    </Button>
                    <Button
                      variant="outline"
                      onClick={requestRevalidate}
                      disabled={current_question.revalidate}
                    >
                      Request Correction
                    </Button>
                    <Button variant="outline" onClick={nextQuestion}>
                      Next
                    </Button>
                  </>
                ) : (
                  <Button
                    className="border-2 border-black px-4 py-2"
                    onClick={checkAnswer}
                  >
                    Check
                  </Button>
                )}
              </CardFooter>
            </div>
          )
        ) : (
          <div>Loading </div>
        )}
      </Card>
    </div>
  );
};

export default ExamPage;
