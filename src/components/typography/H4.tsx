import { TypographyProps } from "./types";
export function H4({ text, children }: TypographyProps) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children || text || ''}
    </h4>
  )
}
