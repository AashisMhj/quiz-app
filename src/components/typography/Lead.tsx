import { TypographyProps } from "./types";

export function TypographyLead({ text }: TypographyProps) {
    return (
        <p className="text-xl text-muted-foreground">
            {text}
        </p>
    )
}
