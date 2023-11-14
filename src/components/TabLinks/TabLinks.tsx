import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  items: { name: string; href: string }[];
}

const TabLinks: FC<Props> = ({ items }) => {
  const router = useRouter();

  return (
    <ul className="flex flex-wrap">
      {items.map((item, idx) => (
        <li
          key={idx}
          className={
            item.href === router.asPath
              ? "border-solid border-gray-900 border-b-2 mr-4"
              : "mr-4"
          }
        >
          <Link className="text-gray-700" href={item.href}>
            <button
              type="button"
              className="tab"
              aria-current={item.href === router.asPath}
            >
              {item.name}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TabLinks;
