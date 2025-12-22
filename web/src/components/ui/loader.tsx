import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
}

export function Loader({ size = "md", className }: LoaderProps) {
  return (
    <Loader2
      className={cn("animate-spin text-primary", sizeMap[size], className)}
    />
  )
}

