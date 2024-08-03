import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MouseEvent } from "react";

export default function LoadingButton({
  isLoading,
  children,
  loadingText,
  onClick
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}) {
  return (
    <Button
      className="flex gap-1 items-center"
      disabled={isLoading}
      type="submit"
      onClick={(e) => onClick?.(e)}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}
