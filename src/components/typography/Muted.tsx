import { TypographyProps } from "./types";

export function Muted({text, children}:TypographyProps) {
    return (
        <p className="text-sm text-muted-foreground">{children || text || '' }</p>
    )
}
