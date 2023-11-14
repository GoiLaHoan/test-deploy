import Link from "next/link";
import { useState } from "react";

import cs from "~/src/utils/cs";

import { useQuery } from "react-query";
import fontStyles from "~/src/styles/news-typefaces.module.scss";
import { news } from "~/src/lib/news-factory.lib";
import css from "./static-opinions-landing-nav.module.scss";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export function StaticOpinionsLandingNavigationMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery(news.newsCategoriesTree({}));
  const iconSection = (): JSX.Element => {
    if (!isOpen) {
      return <BiChevronDown color="#2494D6" size={20} />;
    }

    return <BiChevronUp color="#2494D6" size={20} />;
  };

  return (
    <div className={cs([css.wrapper, "mb-4"])}>
      <div className="flex justify-between items-center">
        <h1 className="uppercase text-[32px] md:text-[48px]">Opinions</h1>
        <button
          className="flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cs([fontStyles.section, "mr-2"])}>Sections</span>
          {iconSection()}
        </button>
      </div>
      {isOpen && (
        <ul className="absolute z-50 bg-kitco-black left-0 w-full p-4">
          {data?.categoriesTree?.map((x) => (
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
                    <li key={`${x.id}${x.name}`}>
                      <Link
                        href={y.urlAlias}
                        className="text-white pl-6"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{y?.name}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
