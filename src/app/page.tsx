import Link from "next/link";
const exams = [
  {
    label: 'Solution Architect',
    link: 'solution-architect'
  }
  
]
const HomePage = () => {
  return (
      <div className="grid grid-cols-1 max-w-4xl mx-auto pt-4">
        {
          exams.map(exam => <Link key={exam.link} href={exam.link} className=" bg-green-400 text-white py-2 px-2 font-medium rounded-md">{exam.label}</Link>)
        }
      </div>
  );
}

export default HomePage;
