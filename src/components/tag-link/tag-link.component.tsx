import type { FC } from "react";

import Link from "next/link";
import cs from "~/src/utils/cs";

export const TagLink: FC<{
  href: string;
  name: string;
}> = ({ href, name }) => {
  return (
    <Link
      className={cs([
        "border border-[#111111] border-opacity-20 rounded-md px-2",
        "flex justify-center items-center font-normal",
      ])}
      href={href}
    >
      <span className="text-xs text-[#111] text-opacity-80 my-1">{name}</span>
    </Link>
  );
};
