"use client";

import * as React from "react";

const Progress = React.forwardRef<
  HTMLDivElement,
  { value?: number; className?: string }
>(({ value = 0, className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    {...props}
  >
    <span
      className="block h-full bg-blue-600 transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
));

Progress.displayName = "Progress";

export { Progress };
