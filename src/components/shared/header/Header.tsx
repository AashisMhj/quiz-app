import Link from "next/link";
import ThemeToggleBtn from "../themeToggleBtn/ThemeToggleBtn";
import H2 from "@/components/typography/H2";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b-2 px-8 py-4">
      <Link href="/">
        <H2>Quiz App</H2>
      </Link>
      <ThemeToggleBtn />
    </header>
  );
}
