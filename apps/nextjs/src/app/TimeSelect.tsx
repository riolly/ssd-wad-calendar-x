import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function TimeSelect({
  className,
  placeholder,
  defaultValue,
  opts,
}: {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  opts: string[];
}) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="min-w-fit">
        {opts.map((opt, i) => (
          <SelectItem key={`${i}-${opt}`} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
