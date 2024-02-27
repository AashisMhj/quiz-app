import ThemeToggleBtn from "../themeToggleBtn/ThemeToggleBtn";
import H2 from "@/components/typography/H2";

export default function Header(){
    return <header className="w-full py-4 px-8 flex justify-between items-center border-b-2">
        <H2>Quiz App</H2>
        <ThemeToggleBtn />
    </header>
}