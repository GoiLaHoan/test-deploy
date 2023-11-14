import type { FC } from "react";
import { Fragment, useEffect, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Link from "next/link";
import clsx from "clsx";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";
import type {
  Sponsored,
  Category,
  NewsCategoriesTreeQuery,
} from "~/src/generated";

import useScreenSize from "~/src/utils/useScreenSize";
import { ImageMS } from "../ImageMS/ImageMS.component";
import ImageWithFallback from "~/src/components/ImageWithFallback/ImageWithFallback";

import styles from "./investment-trends.module.scss";

export const InvestmentTrends: FC = () => {
  const { data } = useQuery(
    news.sponsoredContent({
      variables: {
        limit: 4,
        offset: 0,
      },
      options: {
        enabled: true,
      },
    }),
  );

  return (
    <div>
      <ImageWithFallback
        src="/kitco_investment_trends.png"
        alt="Investment Trends"
        height="30"
        width="145"
      />
      <div className={styles.lineTitle} />
      <ul className={styles.ulWrap}>
        {data?.nodeList?.items?.map((x: Sponsored) => (
          <li key={x.id}>
            <Link href={x.urlAlias}>
              <div className={styles.itemInvestmentTrend}>
                <div className="w-[120px] relative block aspect-video">
                  <ImageMS
                    src={
                      x.image.detail.sources.teaser_small.srcset ??
                      x?.legacyThumbnailImageUrl
                    }
                    alt="Article teaser image"
                    priority={true}
                    width={304}
                    height={170}
                    service="icms"
                    className="'object-cover h-[90px] relative rounded-lg w-full'"
                  />
                </div>
                <div className="block pl-[14px] w-[calc(100%_-_120px)]">
                  <h5
                    className={clsx(
                      "text-[16px] leading-[130%] line-clamp-3",
                      styles.title,
                    )}
                  >
                    {x?.teaserHeadline ?? x.title}
                  </h5>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className={styles.investmentTrendMore}
        href={"opinions/investment-trends"}
      >
        + More
      </Link>
    </div>
  );
};

export const InvestmentTrendsTitle = () => {
  const { isMobile } = useScreenSize();
  const [openSectionsMenu, setOpenSectionsMenu] = useState(false);
  const { data } = useQuery(news.newsCategoriesTree());
  const baseH1 = "uppercase text-[24px] md:text-[48px]";
  const parentCSS = "text-ktc-date-gray";

  const handleOpenSectionsMenu = (isMobile) => {
    if (isMobile) {
      return setOpenSectionsMenu(true);
    }
    return setOpenSectionsMenu(false);
  };

  useEffect(() => {
    handleOpenSectionsMenu(isMobile);
  }, [isMobile]);

  return (
    <Fragment>
      <div className="flex items-center justify-between md:pb-4">
        <div className="flex items-center w-full">
          <Link href={`/opinions`}>
            <h1 className={clsx(baseH1, parentCSS)}>opinions</h1>
          </Link>
          <>
            <h1 className={clsx(baseH1, parentCSS, "px-1 md:px-2")}>/</h1>
            <Link href={`/opinions/investment-trends`}>
              <h1 className={clsx(baseH1, "text-kitco-black")}>
                investment trends
              </h1>
            </Link>
          </>
        </div>

        <button
          className="flex items-center md:hidden text-base text-[#0C87D2]"
          type="button"
          onClick={() => setOpenSectionsMenu(!openSectionsMenu)}
        >
          <span>Sections</span>
          <IconSectionsMenu openMenu={openSectionsMenu} />
        </button>
      </div>
      {!openSectionsMenu && (
        <div className={styles.sectionsWrap}>
          {data?.categoriesTree?.length >= 1 && (
            <div className="flex flex-col md:flex-row md:items-center">
              <MobileCategoryDropdown
                setOpenSectionsMenu={setOpenSectionsMenu}
                data={data}
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

const IconSectionsMenu: FC<any> = (openMenu: boolean) => {
  if (!openMenu) {
    return <RiArrowDropUpLine size={18} />;
  }
  return <RiArrowDropDownLine size={18} />;
};

const MobileCategoryDropdown = ({
  setOpenSectionsMenu,
  data,
}: {
  setOpenSectionsMenu: (b: boolean) => void;
  data: NewsCategoriesTreeQuery;
}) => {
  return (
    <ul className="flex flex-col flex-grow md:flex-row md:items-center md:hidden">
      {data?.categoriesTree?.map((x: Category, idx: number) => (
        <SectionItem
          category={x}
          key={x.id}
          dots={idx !== data?.categoriesTree?.length - 1}
          setOpenSectionsMenu={setOpenSectionsMenu}
        />
      ))}
    </ul>
  );
};

const SectionItem: FC<{
  category: Category;
  dots: boolean;
  setOpenSectionsMenu: (b: boolean) => void;
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
      {dots && (
        <span className="hidden text-[16px] md:inline-block">&middot;</span>
      )}
    </li>
  );
};
