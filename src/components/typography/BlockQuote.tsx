import { TypographyProps } from "./types";
export function TypographyBlockquote({ text }: TypographyProps) {
    return (
        <blockquote className="mt-6 border-l-2 pl-6 italic">
            {text}
        </blockquote>
    )
}
