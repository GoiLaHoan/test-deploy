import type { FC } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FiPlus } from "react-icons/fi";

const ArticleMoreButton: FC<{
  title: string;
  href: string;
}> = ({ title, href }) => {
  return (
    <Link
      href={href}
      className={clsx("px-3 h-7", "inline-block", "bg-[#0a4e8d] rounded")}
    >
      <span
        className={clsx("text-xs text-white", "flex items-center gap-1 h-full")}
      >
        <FiPlus color="white" />
        {title}
      </span>
    </Link>
  );
};

export default ArticleMoreButton;

export const ArticleMoreButtonNewsPages: FC<{
  href: string;
  label: string;
}> = ({ href, label }) => {
  return (
    <Link
      className={clsx(
        "px-4 py-[5px] w-full mt-5",
        "inline-block",
        "border border-kitco-black",
        "uppercase text-kitco-black font-bold tracking-widertext-sm text-[12px] text-center",
        "transition hover:opacity-80",
      )}
      href={href}
    >
      {label}
    </Link>
  );
};
