import Link from "next/link";
import { clsx } from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import { useQuery } from "react-query";
import dataJeweler from "~/src/lib/dataJeweler";
import { news } from "~/src/lib/news-factory.lib";

import st from "./FavoritesBar.module.scss";

// custom Hook
const getPosition = (containerRef: { current: any }) => {
  const [position, setPosition] = useState<number>();

  useEffect(() => {
    const container = containerRef.current;
    const activeElement = container.querySelector(".border-b-ktc-blue");

    if (activeElement) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      if (container && container.scrollWidth > 0) {
        setPosition(
          activeRect.left +
            container.scrollLeft -
            containerRect.left -
            containerRect.width / 2 +
            activeRect.width / 2,
        );
      }
    }
  });

  return { position };
};

export const FavoritesBar = () => {
  const router = useRouter();

  const containerRef = useRef(null);

  const navBar = () => {
    if (
      router.pathname.includes("/news") ||
      router.pathname.includes("/author") ||
      router.pathname.includes("/opinions") ||
      router.pathname === "/podcasts" ||
      router.pathname === "/mining/press-release"
    ) {
      return <NewsNav router={router} containerRef={containerRef} />;
    }

    if (
      router.pathname === "/jeweler-resources" ||
      router.pathname.startsWith("/jeweler-table")
    ) {
      return <JewelerNav router={router} containerRef={containerRef} />;
    }

    return <DefaultFavorites />;
  };

  return (
    <div className={st.background} ref={containerRef}>
      {navBar()}
    </div>
  );
};

const externalLinks = [
  { id: 1, label: "Silver", url: "http://www.kitcosilver.com/" },
  { id: 2, label: "Base Metals", url: "http://www.kitcometals.com/" },
  { id: 3, label: "Education", url: "https://education.kitco.com/" },
  { id: 4, label: "Gold Forum", url: "https://gold-forum.kitco.com/" },
  {
    id: 5,
    label: "Jewelry Resources",
    url: "/jeweler-resources",
  },
];

const DefaultFavorites = () => {
  return (
    <div className="hidden md:flex gap-2 w-full h-full px-2 mx-auto max-w-[1240px]">
      <ul className="flex items-center mx-auto text-xs text-black divide-x divide-black/30">
        <li className="px-2">
          <Link href="/opinions" className="text-black">
            Opinion
          </Link>
        </li>
        {externalLinks.map((link) => (
          <li key={link.id} className="px-2">
            <a className="text-black" href={link.url}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NewsNav = ({ router, containerRef }) => {
  const baseLiStyle =
    "px-4 pt-3 pb-2 border-b-[2px] h-full font-mulish font-bold text-xs leading-4";

  const { data } = useQuery(news.newsCategoriesTree());

  const { position } = getPosition(containerRef);

  useEffect(() => {
    if (position !== undefined) {
      // TODO: this breaks refresh position
      // containerRef?.current?.scrollTo(position, 0);
    }
  }, [position]);

  return (
    <ul className="flex max-w-[1240px] mx-auto">
      {data?.categoriesTree?.map(
        (x) =>
          x.status && (
            <li
              key={x.id}
              className={clsx(
                baseLiStyle,
                router.asPath.includes(x.urlAlias)
                  ? "border-b-ktc-blue"
                  : "border-b-transparent",
              )}
            >
              <Link
                className="text-kitco-black hover:underline"
                href={x.urlAlias}
              >
                {x.name}
              </Link>
            </li>
          ),
      )}
    </ul>
  );
};

const JewelerNav = ({ router, containerRef }) => {
  const baseLiStyle =
    "px-4 pt-3 pb-2 border-b-[2px] h-full font-mulish font-bold text-xs leading-4 text-[0.8125rem]";

  const { position } = getPosition(containerRef);

  useEffect(() => {
    if (position !== undefined) {
      containerRef?.current?.scrollTo(position, 0);
    }
  }, [position]);

  return (
    <ul className="flex max-w-[1240px] mx-auto whitespace-nowrap">
      {dataJeweler?.map((x) => (
        <li
          key={x.id}
          className={clsx(
            baseLiStyle,
            router.asPath.includes(x.urlAlias)
              ? "border-b-ktc-blue"
              : "border-b-transparent",
          )}
        >
          <Link className="text-kitco-black hover:underline" href={x.urlAlias}>
            {x.name}
          </Link>
        </li>
      ))}
      <li className={clsx(baseLiStyle, "border-b-transparent")}>
        <a
          className="flex items-center gap-1 text-kitco-black hover:underline"
          href={"https://online.kitco.com/refining/refining-services.html"}
          target="_blank"
          rel="noreferrer"
        >
          Refining Services
          <HiExternalLink />
        </a>
      </li>
    </ul>
  );
};
