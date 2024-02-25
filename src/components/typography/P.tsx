import { TypographyProps } from "./types"
export function P({text}:TypographyProps) {
    return (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {text}
      </p>
    )
  }
  