import { CardDataType } from "@/types";
import Card from "./(component)/Card";
const exams:CardDataType[] = [
  {
    label: 'AWS Associate Solution Architect',
    link: 'solution-architect',
    color: '#FF9900',
    image: ''
  },
  {
    label: 'AWS Associate Developer',
    link: '#',
    color: '#FF9900',
    image: ''
  },
  {
    label: 'AWS Devops',
    link: '#',
    color: '#FF9900',
    image: ''
  },
  {
    label: 'Frontend React',
    link: '#',
    image: ''
  },
  {
    label: 'Nodejs',
    link: '#',
    image: ''
  },
  {
    label: 'System Design',
    link: '#',
    image: ''
  },
]
const HomePage = () => {
  return (
      <div className="grid grid-cols-4 p-4 md:p-2 sm:p-1 mx-auto pt-4 gap-4">
        {
          exams.map(exam => <Card key={exam.link} data={exam} /> )
        }
      </div>
  );
}

export default HomePage;
