import { TypographyProps } from "./types"
export default function H3({text}:TypographyProps) {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {text}
      </h3>
    )
  }
  