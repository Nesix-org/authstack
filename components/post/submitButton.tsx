"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="sm"
      className="gap-2"
      disabled={disabled || pending}
    >
      {pending ? "POSTING..." : "POST"}
    </Button>
  );
}

