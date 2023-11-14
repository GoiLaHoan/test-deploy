import type { FC } from "react";

// this exists for the sake explicit readability and intent
export const Spacer: FC<{ className: string }> = ({ className }) => (
  <div id="spacer" className={className}></div>
);
