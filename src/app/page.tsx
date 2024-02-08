import { getTopics } from "@/db/model/topic";
import { CardDataType } from "@/types";
import Card from "./(component)/Card";

const HomePage = async () => {
  const exam_data = await getTopics();
  return (
      <div className="grid grid-cols-4 p-4 md:p-2 sm:p-1 mx-auto pt-4 gap-8">
        {
          exam_data.map(exam => <Card key={exam.id} data={exam} /> )
        }
      </div>
  );
}

export default HomePage;
