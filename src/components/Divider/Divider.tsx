import React from "react";
import clsx from "clsx";

const Divider = ({ className }: { className?: string }) => {
  return <hr className={clsx("w-full h-[3px] bg-[#666]", className)} />;
};

export default Divider;
