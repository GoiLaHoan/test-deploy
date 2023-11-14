import Link from "next/link";
import { type NextRouter, useRouter } from "next/router";
import { type FC, useRef } from "react";
import { useEffect, useState } from "react";
import type { Category, NewsCategoriesTreeQuery } from "~/src/generated";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";

import cs from "~/src/utils/cs";
import useScreenSize from "~/src/utils/useScreenSize";

import styles from "./news-category.module.scss";
import listenForOutsideClick from "~/src/utils/listenForOutsideClick";

const checkCategory = (data, r) => {
  let isOpinions = false;
  let hasChildren = false;
  let isInvestmentTrend = false;
  let isMining = false;

  for (const category of data?.categoriesTree || []) {
    const isOpinionsCategory = category.urlAlias === "/opinions";
    const isCurrentCategory =
      category.urlAlias === `/news/category/${r?.query?.parent}` &&
      category.urlAlias === r?.asPath;

    if (
      isOpinionsCategory &&
      (r?.asPath === "/opinions" || r?.query?.parent === "opinions")
    ) {
      isOpinions = true;
    }

    if (isOpinionsCategory && r?.asPath === "/opinions/investment-trends") {
      isInvestmentTrend = true;
    }

    if (
      category.urlAlias === "/news/category/mining" &&
      r?.asPath === "/news/category/mining"
    ) {
      isMining = true;
    }

    if (
      (isCurrentCategory || isOpinions || isInvestmentTrend || isMining) &&
      category.children?.length > 0
    ) {
      hasChildren = true;
    }

    if (isOpinions && hasChildren && isInvestmentTrend && isMining) {
      break;
    }
  }

  return { isOpinions, isInvestmentTrend, isMining, hasChildren };
};

export const NewsCategoryTitle = () => {
  const { isMobile } = useScreenSize();
  const [openSectionsMenu, setOpenSectionsMenu] = useState(false);
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const r = useRouter();

  const { data } = useQuery(news.newsCategoriesTree());

  const { isOpinions, isInvestmentTrend, isMining, hasChildren } =
    checkCategory(data, r);

  const baseH1 = "uppercase text-[32px] md:text-[48px]";
  const baseSubH1 =
    "uppercase text-[32px] md:leading-[58px] leading-[38px] md:text-[48px]";

  const parentCSS =
    !r?.query?.subcategory &&
    !r?.query?.opinion &&
    r.asPath !== "/opinions/investment-trends"
      ? "text-kitco-black"
      : "text-ktc-date-gray hidden md:block";

  useEffect(() => {
    if (isMobile) {
      setOpenSectionsMenu(true);
    } else {
      setOpenSectionsMenu(false);
    }
  }, [isMobile]);

  function currentParentCategory() {
    return data?.categoriesTree?.find(
      (c) =>
        c.urlAlias === `/news/category/${r?.query?.parent}` ||
        c.urlAlias === `/opinions`,
    );
  }

  const handleLink =
    isOpinions || isInvestmentTrend
      ? "/opinions"
      : isMining
      ? "/news/category/mining"
      : `/news/category/${r.query.parent}`;

  const showTitle =
    isOpinions || isInvestmentTrend
      ? "Opinions"
      : isMining
      ? "Mining"
      : r?.query?.parent;

  // Handle click out side
  useEffect(() => {
    if (isMobile) {
      listenForOutsideClick(
        listening,
        setListening,
        menuRef,
        setOpenSectionsMenu,
      );
    }
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center leading-[38px] md:leading-[58px]"
          ref={menuRef}
        >
          <Link href={handleLink}>
            <h1 className={cs([baseH1, parentCSS])}>{showTitle}</h1>
          </Link>

          <ShowSubCategoryDesktopAndTablet
            r={r}
            baseH1={baseH1}
            baseSubH1={baseSubH1}
            parentCSS={parentCSS}
          />

          <ShowSubCategoryMobile
            hasChildren={hasChildren}
            r={r}
            setOpenSectionsMenu={setOpenSectionsMenu}
            openSectionsMenu={openSectionsMenu}
            baseSubH1={baseSubH1}
          />
        </div>
      </div>

      <ShowSectionsMenu
        openSectionsMenu={openSectionsMenu}
        currentParentCategory={currentParentCategory}
        data={data}
        setOpenSectionsMenu={setOpenSectionsMenu}
        isInvestmentTrend={isInvestmentTrend}
      />
    </>
  );
};

const ShowSubCategoryMobile = ({
  hasChildren,
  r,
  setOpenSectionsMenu,
  openSectionsMenu,
  baseSubH1,
}: {
  hasChildren: boolean;
  r: NextRouter;
  setOpenSectionsMenu: (b: boolean) => void;
  openSectionsMenu: boolean;
  baseSubH1: string;
}) => {
  if (hasChildren || r?.query?.subcategory) {
    return (
      <>
        <div
          className="flex items-center text-base text-[#0C87D2] md:hidden"
          onClick={() => setOpenSectionsMenu(!openSectionsMenu)}
        >
          <h1 className={cs([baseSubH1, "text-[#232323]"])}>
            {r?.query?.subcategory ?? r?.query?.opinion}
          </h1>

          {!openSectionsMenu ? (
            <div className="w-4 h-4 relative">
              <IoIosArrowUp
                className="absolute text-kitco-black ml-1"
                size={16}
              />
            </div>
          ) : (
            <div className="w-4 h-4 relative">
              <IoIosArrowDown
                className="absolute text-kitco-black ml-1 z-[-1]"
                size={16}
              />
            </div>
          )}
        </div>
      </>
    );
  }

  if (r?.asPath === "/opinions/investment-trends") {
    return (
      <div className="flex items-center text-base text-[#0C87D2] md:hidden">
        <h1 className={cs([baseSubH1, "text-[#232323]"])}>investment trends</h1>
      </div>
    );
  }

  return null;
};

const ShowSubCategoryDesktopAndTablet = ({
  r,
  baseH1,
  baseSubH1,
  parentCSS,
}: {
  r: NextRouter;
  baseH1: string;
  baseSubH1: string;
  parentCSS: string;
}) => {
  if (r?.query?.subcategory || r?.query?.opinion) {
    return (
      <>
        <h1 className={cs([baseH1, parentCSS, "px-1 md:px-2"])}>/</h1>
        <h1 className={cs([baseSubH1, "hidden md:block", "text-kitco-black"])}>
          {r?.query?.subcategory ?? r?.query?.opinion}
        </h1>
      </>
    );
  }

  if (r?.asPath === "/opinions/investment-trends") {
    return (
      <>
        <h1 className={cs([baseH1, parentCSS, "px-1 md:px-2"])}>/</h1>
        <h1 className={cs([baseSubH1, "hidden md:block", "text-kitco-black"])}>
          investment trends
        </h1>
      </>
    );
  }

  return null;
};

const ShowSectionsMenu = ({
  openSectionsMenu,
  currentParentCategory,
  data,
  setOpenSectionsMenu,
  isInvestmentTrend,
}: {
  openSectionsMenu: boolean;
  currentParentCategory: () => NewsCategoriesTreeQuery["categoriesTree"][number];
  data: NewsCategoriesTreeQuery;
  setOpenSectionsMenu: (b: boolean) => void;
  isInvestmentTrend: boolean;
}) => {
  if (isInvestmentTrend) {
    return (
      <div className="flex flex-col md:pb-5 md:flex-row md:items-center"></div>
    );
  }

  if (!openSectionsMenu) {
    return (
      <div className={styles.sectionsWrap}>
        {data?.categoriesTree?.length > 0 && (
          <div className="flex flex-col md:pb-5 md:flex-row md:items-center">
            {currentParentCategory()?.children?.length > 0 ? (
              <h5 className="hidden font-bold text-[16px] md:block pr-[3px]">
                <span>Sections:</span>
              </h5>
            ) : null}

            <MobileCategoryDropdown
              setOpenSectionsMenu={setOpenSectionsMenu}
              currentParentCategory={currentParentCategory}
            />
            <DesktopSectionsList
              currentParentCategory={currentParentCategory}
            />
          </div>
        )}
      </div>
    );
  }

  return null;
};

// basically this is the full cateogyr menu for mobile site
const MobileCategoryDropdown = ({
  setOpenSectionsMenu,
  currentParentCategory,
}: {
  setOpenSectionsMenu: (b: boolean) => void;
  currentParentCategory: () => NewsCategoriesTreeQuery["categoriesTree"][number];
}) => {
  return (
    <ul
      className="flex flex-col flex-grow md:flex-row md:items-center md:hidden"
      onClick={() => setOpenSectionsMenu(true)}
    >
      {currentParentCategory()?.children?.map((x: Category) => {
        if (x.urlAlias.includes("/opinion/")) {
          x.urlAlias = x.urlAlias.replace("/opinion/", "/opinions/");
        }
        if (x.status) {
          return (
            <SectionItem
              category={x}
              key={x.id}
              setOpenSectionsMenu={setOpenSectionsMenu}
            />
          );
        }
        return null;
      })}
    </ul>
  );
};

// basically this only shows sections as category children
const DesktopSectionsList = ({
  currentParentCategory,
}: {
  currentParentCategory: () => NewsCategoriesTreeQuery["categoriesTree"][number];
}) => {
  return (
    <ul className="hidden md:flex md:flex-grow md:flex-row md:items-center font-normal">
      {currentParentCategory()?.children?.map((x: Category, idx: number) => {
        if (x.urlAlias.includes("/opinion/")) {
          x.urlAlias = x.urlAlias.replace("/opinion/", "/opinions/");
        }
        if (x.status) {
          return (
            <SectionItem
              category={x}
              key={x.id}
              dots={idx !== currentParentCategory()?.children?.length - 1}
            />
          );
        }
        return null;
      })}
    </ul>
  );
};

const SectionItem: FC<{
  category: Category;
  dots?: boolean;
  setOpenSectionsMenu?: (b: boolean) => void;
}> = ({ category, dots, setOpenSectionsMenu }) => {
  return (
    <li className={styles.itemLi}>
      <Link className={styles.itemAnchor} href={category.urlAlias}>
        {category?.name}
      </Link>
      <ul className={styles.subChildren}>
        {category?.children?.map((x, idx) => (
          <li key={`${x.id}-${idx}`}>
            <Link
              onClick={() => setOpenSectionsMenu(true)}
              className={styles.itemAnchor}
              href={x.urlAlias}
            >
              {x?.name}
            </Link>
          </li>
        ))}
      </ul>
      {dots && <span className="hidden text-[10px] md:inline-block">•</span>}
    </li>
  );
};

export const NewsCategoryTitleDetailPage: FC<{
  category: string;
  heightTitle?: number;
}> = ({ category, heightTitle }) => {
  let manipulate = category
    ?.split("/")
    .filter((x) =>
      x === "news" || x === "category" || x === "" ? false : true,
    );

  const baseH3 = "!uppercase !text-[24px] !font-normal font-babasNeue";

  const parentCSS = !manipulate?.[1]
    ? "!text-kitco-black"
    : "!text-[#23232333]";

  if (category?.includes("/opinion/")) {
    category = category.replace("/opinion/", "/opinions/");

    manipulate = category
      ?.split("/")
      .filter((x) =>
        x === "news" || x === "category" || x === "" ? false : true,
      );
  }

  const prefixUrl = handlePrefixUrl(category);

  if (!category) {
    return <></>;
  }

  return (
    <div
      className="w-full flex items-start flex-wrap leading-[29px] mt-2.5 md:mt-1 border-b border-ktc-borders mb-5"
      style={{ minHeight: `${heightTitle + 24}px` }}
    >
      <div className="flex flex-wrap">
        <Link href={`${prefixUrl}/${manipulate?.[0]}`}>
          <h3 className={`${baseH3} ${parentCSS}`}>{manipulate?.[0]}</h3>
        </Link>
        {manipulate?.[1] && (
          <>
            <h3 className={`${baseH3} px-2 ${parentCSS}`}>/</h3>
            <Link href={`${prefixUrl}/${manipulate?.[0]}/${manipulate?.[1]}`}>
              <h3 className={`text-kitco-black ${baseH3}`}>
                {manipulate?.[1]}
              </h3>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const handlePrefixUrl = (category) => {
  if (
    category === "opinions/investment-trends" ||
    category?.startsWith("/opinions")
  ) {
    return "";
  }
  if (category === "news/off-the-wire") return "/news/";

  return "/news/category";
};
