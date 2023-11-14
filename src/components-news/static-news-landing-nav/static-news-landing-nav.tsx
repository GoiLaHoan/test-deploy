import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from "react-icons/io";

import cs from "~/src/utils/cs";

import { useQuery } from "react-query";
import fontStyles from "~/src/styles/news-typefaces.module.scss";
import { news } from "~/src/lib/news-factory.lib";
import css from "./static-news-landing-nav.module.scss";

export default function StaticNewsLandingNavigation() {
  const { data } = useQuery(news.newsCategoriesTree());
  return (
    <div className={css.wrapper}>
      <ul className="flex justify-between mb-[60px]">
        {data?.categoriesTree?.map(
          (x) =>
            x.status && (
              <li key={x.id}>
                <Link
                  className="text-3xl uppercase text-kitco-black"
                  href={x.urlAlias}
                >
                  {x.name}
                </Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

export function StaticNewsLandingNavigationMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery(news.newsCategoriesTree({}));

  return (
    <div className={cs([css.wrapper, "mb-4"])}>
      <div className="flex justify-between items-center">
        <h1 className="uppercase text-[24px] md:text-[48px]">news</h1>
        <button
          className="flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cs([fontStyles.titles, "mr-2"])}>Sections</span>
          {!isOpen ? (
            <IoIosArrowDropdown size={18} />
          ) : (
            <IoIosArrowDropdownCircle size={18} />
          )}
        </button>
      </div>
      {isOpen && (
        <ul className="absolute z-50 bg-kitco-black left-0 w-full p-4">
          {data?.categoriesTree?.map((x) => (
            <>
              {!x.status ? null : (
                <li
                  key={x.id}
                  className="relative px-4 py-2 border-b border-neutral-600 last:border-b-0"
                >
                  <Link
                    href={x.urlAlias}
                    className="text-[16px] text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{x.name}</span>
                  </Link>
                  <ul className="flex flex-col list-disc">
                    {x?.children?.length > 0 &&
                      x?.children?.map((y) => (
                        <>
                          {!y.status ? null : (
                            <li key={`${x.id}${x.name}`}>
                              <Link
                                href={y.urlAlias}
                                className="text-white pl-6"
                                onClick={() => setIsOpen(false)}
                              >
                                <span>{y?.name}</span>
                              </Link>
                            </li>
                          )}
                        </>
                      ))}
                  </ul>
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </div>
  );
}
