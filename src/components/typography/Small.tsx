import { TypographyProps } from "./types";

export function Small({text, children}:TypographyProps) {
    return (
      <small className="text-sm font-medium leading-none">{children || text || ''}</small>
    )
  }
  