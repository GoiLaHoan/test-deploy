import clsx from "clsx";
import Link from "next/link";

export const CategoryTeaserLink = ({
  urlAlias,
  text,
  className,
}: {
  urlAlias: string;
  text: string;
  className?: string;
}) => (
  <>
    <Link
      className={clsx(
        "text-ktc-category uppercase font-extrabold text-xs leading-3 tracking-wider",
        "relative block mt-4",
        !className ? null : className,
      )}
      href={urlAlias ?? "/_error"}
    >
      {text}
    </Link>
    <div className="h-1 bg-transparent" />
  </>
);
