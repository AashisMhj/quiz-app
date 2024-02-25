import { TypographyProps } from "./types"
export default function H1({text, children}:TypographyProps) {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children || text || ''}
      </h1>
    )
  }
  