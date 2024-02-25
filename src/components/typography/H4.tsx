import { TypographyProps } from "./types";
export function TypographyH4({ text }: TypographyProps) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {text}
    </h4>
  )
}
