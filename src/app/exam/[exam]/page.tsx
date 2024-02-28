import QuizForm from "./(components)/QuizForm";
import { getTopicDetail } from "@/db/model/topic";
interface Props {
  params: {
    exam: string;
  };
}
const ExamPage = async ({ params }: Props) => {
  const exam_id = parseInt(params.exam);
  if (!exam_id) {
    // TODO navigate to 404
  }
  const topic_data = await getTopicDetail(exam_id);
  if (!topic_data) {
    // TODO navigate to 404 page
  }
  return <QuizForm exam_id={exam_id} title={topic_data?.name || ""} />;
};

export default ExamPage;
