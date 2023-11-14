import clsx from "clsx";
import Link from "next/link";
import { FC, Fragment } from "react";
import {
  TeaserCard,
  TeaserCardForNewParent,
  TeaserTextOnlyWithAuthor,
  TeaserWide,
  TeaserWideForNewParent,
  TeaserWideForSubCategory,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import { PressReleaseForSidebar } from "~/src/components/press-releases/press-releases.component";
import {
  NewsByCategoryGenericQuery,
  NodeListQueueQuery,
} from "~/src/generated";
import type { TeasersUnion } from "~/src/types/types";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import useScreenSize from "~/src/utils/useScreenSize";

type Data =
  | NewsByCategoryGenericQuery["nodeListByCategory"]["items"]
  | NodeListQueueQuery["nodeListQueue"]["items"];

interface Props {
  data: Data;
  disableAdverts?: boolean;
  hideCategory?: boolean;
  layoutSecond?: boolean;
  layoutNewParent?: boolean;
  classTitle?: string;
}

export const GenericNewsList: FC<Props> = ({
  data,
  disableAdverts,
  hideCategory,
  layoutSecond,
}) => {
  const { isDesktop, isMobile } = useScreenSize();
  let adCounter = 1;

  if (isMobile && layoutSecond) {
    return (
      <GenericNewsListMobileLayoutSecond
        data={data}
        disableAdverts={disableAdverts}
      />
    );
  }

  if (isMobile) {
    return (
      <GenericNewsListMobile data={data} disableAdverts={disableAdverts} />
    );
  }

  function advertInjector(idx: number) {
    if (disableAdverts) return false;
    if (idx === 2 || (idx % 7 === 0 && idx !== 0)) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-10 pt-5">
      <div className="col-span-3 xl:col-span-2">
        {data?.map((node: TeasersUnion, idx: number) => (
          <Fragment key={idx}>
            {idx === 0 && (
              <TeaserWideForSubCategory
                size="xl"
                aspectRatio="auto"
                node={node}
                hideCategory={hideCategory}
              />
            )}
            {idx > 0 && (
              <TeaserWideForSubCategory
                node={node}
                size="lg"
                aspectRatio="auto"
                key={node.id}
                hideCategory={hideCategory}
              />
            )}
            {advertInjector(idx) && (
              <AdvertisingSlot
                id={`banner-${adCounter}`}
                className={"md:h-[90px] md:w-[728px] bg-red-400 mx-auto mb-10"}
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
      {isDesktop && (
        <AdvertisingSlot
          id={"right-rail-lg"}
          className={"h-[1050px] w-[300px] bg-red-400 mx-auto xl:block hidden"}
          viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
        />
      )}
    </div>
  );
};

export const GenericNewsListLayoutNewParent: FC<Props> = ({
  data,
  disableAdverts,
  hideCategory,
  classTitle,
}) => {
  const { isDesktop, isMobile } = useScreenSize();
  let adCounter = 1;

  if (isMobile) {
    return (
      <GenericNewsListMobileLayoutNewParent
        data={data}
        disableAdverts={disableAdverts}
        hideCategory={hideCategory}
      />
    );
  }

  function advertInjector(idx: number) {
    if (disableAdverts) return false;
    if (idx === 3 || ((idx - 3) % 5 === 0 && idx !== 0)) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-[20px] py-10">
      <div className="col-span-3 xl:col-span-2">
        {data?.map((node: TeasersUnion, idx: number) => (
          <Fragment key={idx}>
            {idx === 0 && (
              <TeaserWideForNewParent
                size="xl"
                key={node.id}
                aspectRatio="16x9"
                node={node}
                hideCategory={hideCategory}
                classTitle={classTitle}
              />
            )}
            {idx > 0 && (
              <TeaserWideForNewParent
                node={node}
                size="lg"
                aspectRatio="16x9"
                key={node.id}
                hideCategory={hideCategory}
              />
            )}
            {advertInjector(idx) && (
              <AdvertisingSlot
                id={`banner-${adCounter}`}
                className={"md:h-[90px] md:w-[728px] bg-red-400 mx-auto my-12"}
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
      {isDesktop && (
        <AdvertisingSlot
          id={"right-rail-lg"}
          className={"h-[1050px] w-[300px] bg-red-400 mx-auto sticky top-4"}
          viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
        />
      )}
    </div>
  );
};

export const GenericNewsListMobile: FC<Props> = ({
  data,
  hideCategory,
  disableAdverts,
}) => {
  let adCounter = 0;
  function shouldInsertAdvert(idx: number) {
    if (idx % 4 === 0 && idx !== 0) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-10 pb-5">
      <div className="col-span-3 xl:col-span-2">
        {data?.map((node: TeasersUnion, idx: number) => (
          <>
            {idx === 0 && (
              <div className="pb-5">
                <TeaserCard size="md" node={node} hideCategory={hideCategory} />
              </div>
            )}
            {idx > 0 && (
              <div key={idx} className="pt-5">
                <TeaserWide
                  node={node}
                  size="md"
                  aspectRatio="16x9"
                  key={node.id}
                  hideCategory={hideCategory}
                />
              </div>
            )}
            {!disableAdverts && shouldInsertAdvert(idx) && (
              <AdvertisingSlot
                id={`banner-${adCounter}`}
                className={
                  "h-[250px] w-[300px] md:h-[90px] md:w-[728px] bg-red-400 mx-auto my-5 md:my-10"
                }
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export const GenericNewsListMobileLayoutSecond: FC<Props> = ({
  data,
  hideCategory,
}) => {
  let adCounter = 0;
  function shouldInsertAdvert(idx: number) {
    if (idx % 4 === 0 && idx !== 0) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-10 pb-5">
      <div className="col-span-3 xl:col-span-2">
        {data?.map((node: TeasersUnion, idx: number) => (
          <Fragment key={idx}>
            <div key={idx} className="pt-5 border-t border-ktc-borders">
              <TeaserWide
                node={node}
                size="md"
                aspectRatio="16x9"
                key={node.id}
                hideCategory={hideCategory}
              />
            </div>
            {shouldInsertAdvert(idx) && (
              <AdvertisingSlot
                id={`banner-${adCounter}`}
                className={
                  "h-[250px] w-[300px] md:h-[90px] md:w-[728px] bg-red-400 mx-auto my-5 md:my-10"
                }
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const GenericNewsListMobileLayoutNewParent: FC<Props> = ({
  data,
  hideCategory,
  disableAdverts,
}) => {
  let adCounter = 0;
  function shouldInsertAdvert(idx: number) {
    if (idx === 2 || ((idx - 2) % 5 === 0 && idx !== 0)) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-10 pb-5">
      <div className="col-span-3 xl:col-span-2">
        {data?.map((node: TeasersUnion, idx: number) => (
          <Fragment key={idx}>
            {idx === 0 && (
              <div className="pb-5 mb-[18px] border-b border-ktc-borders last:border-b-0">
                <TeaserCardForNewParent
                  size="md"
                  node={node}
                  hideCategory={hideCategory}
                />
              </div>
            )}
            {idx > 0 && (
              <div
                key={idx}
                className="mb-[19px] border-b border-ktc-borders last:border-b-0"
              >
                <TeaserWideForNewParent
                  node={node}
                  size="sm"
                  aspectRatio="16x9"
                  key={node.id}
                  hideCategory={hideCategory}
                />
              </div>
            )}
            {!disableAdverts && shouldInsertAdvert(idx) && (
              <div
                key={idx + "adv"}
                className="mb-[18px] border-b border-ktc-borders"
              >
                <AdvertisingSlot
                  id={`banner-${adCounter}`}
                  className={
                    "h-[250px] w-[300px] md:h-[90px] md:w-[728px] bg-red-400 mx-auto my-[19px] md:my-10"
                  }
                  viewportsEnabled={{
                    mobile: true,
                    tablet: false,
                    desktop: false,
                  }}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const GenericNewsListWithAuthor: FC<Props> = ({
  data,
  disableAdverts,
}) => {
  const { isMobile } = useScreenSize();

  if (isMobile) {
    return (
      <GenericNewsListWithAuthorMobile
        data={data}
        disableAdverts={disableAdverts}
      />
    );
  }

  return (
    <GenericNewsListWithAuthorDesktopAndTablet
      data={data}
      disableAdverts={disableAdverts}
    />
  );
};

const GenericNewsListWithAuthorMobile: FC<Props> = ({
  data,
  disableAdverts,
}) => {
  const { isDesktop } = useScreenSize();
  let adCounter = 1;

  function advertInjector(idx: number) {
    if (disableAdverts) return false;
    if (isDesktop) return false;
    if (idx === 3 || ((idx - 3) % 5 === 0 && idx !== 0)) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="flex flex-col pt-5">
      <>
        {data.map((x, idx: number) => (
          <Fragment key={idx}>
            <div
              className="flex gap-5 border-t border-t-ktc-borders pt-5 mb-5"
              key={x.id}
            >
              <div className="flex-initial w-[120px]">
                <Link href={x?.urlAlias ?? "/"}>
                  <ImageMS
                    src={
                      x?.image?.detail?.default?.srcset ??
                      x?.legacyThumbnailImageUrl
                    }
                    alt={`${x?.title} teaser image`}
                    priority={true}
                    width={400}
                    height={340}
                    service="icms"
                    className={clsx(
                      "w-full",
                      "relative",
                      "rounded-lg aspect-[4/3] mb-2.5",
                    )}
                  />
                </Link>
              </div>
              <div className="flex-initial w-[calc(100%_-_140px)]">
                <TeaserTextOnlyWithAuthor
                  node={x as any}
                  size="sm"
                  hideCategory={true}
                  hideSummary={true}
                />
              </div>
            </div>
            {advertInjector(idx) && (
              <AdvertisingSlot
                id={`banner-${adCounter}`}
                className={"h-[250px] w-[300px] bg-red-400 mx-auto mb-5"}
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            )}
          </Fragment>
        ))}
      </>
    </div>
  );
};

const GenericNewsListWithAuthorDesktopAndTablet: FC<Props> = ({
  data,
  disableAdverts,
}) => {
  const { isDesktop } = useScreenSize();
  let adCounter = 1;

  function advertInjector(idx: number) {
    if (disableAdverts) return false;
    if (isDesktop) return false;
    if (idx === 3 || ((idx - 3) % 5 === 0 && idx !== 0)) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-10 pt-10">
      <div className="col-span-3 lg:col-span-2">
        {data?.map((node, idx: number) => (
          <Fragment key={idx}>
            {idx === 0 && (
              <div className="flex gap-5 mb-10">
                <div className="w-[51.66%]">
                  <Link href={node?.urlAlias ?? "/"}>
                    <ImageMS
                      src={
                        node?.image?.detail?.default?.srcset ??
                        node?.legacyThumbnailImageUrl
                      }
                      alt={`${node?.title} teaser image`}
                      priority={true}
                      width={800}
                      height={450}
                      service="icms"
                      className={clsx(
                        "rounded-lg aspect-[8/5] object-cover",
                        "w-full",
                      )}
                    />
                  </Link>
                </div>
                <div className="w-[calc(100%_-_51.66%_+_20px)]">
                  <TeaserTextOnlyWithAuthor
                    node={node}
                    size="xxl"
                    hideCategory={true}
                    hideSummary={false}
                    key={node?.id}
                    classTitle="mt-[-5px]"
                  />
                </div>
              </div>
            )}
            {idx > 0 && (
              <div className="flex flex-row gap-5 mb-10" key={node?.id}>
                <div className="w-[150px]">
                  <Link href={node?.urlAlias ?? "/"}>
                    <ImageMS
                      src={
                        node?.image?.detail?.default?.srcset ??
                        node?.legacyThumbnailImageUrl
                      }
                      alt={`${node?.title} teaser image`}
                      priority={true}
                      width={800}
                      height={450}
                      service="icms"
                      className={clsx(
                        "rounded-lg aspect-[4/3] object-cover",
                        "w-full",
                      )}
                    />
                  </Link>
                </div>

                <div className="w-[calc(100%_-_170px)]">
                  <TeaserTextOnlyWithAuthor
                    node={node}
                    size="md"
                    hideCategory={true}
                    hideSummary={false}
                    classTitle="mt-[-4px]"
                  />
                </div>
              </div>
            )}
            {advertInjector(idx) && (
              <AdvertisingSlot
                id={`banner-${adCounter}`}
                className={"md:h-[90px] md:w-[728px] bg-red-400 mx-auto mb-10"}
                viewportsEnabled={{
                  mobile: false,
                  tablet: true,
                  desktop: true,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
      {isDesktop && (
        <AdvertisingSlot
          id={"right-rail-lg"}
          className={"h-[1050px] w-[300px] bg-red-400 mx-auto sticky top-4"}
          viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
        />
      )}
    </div>
  );
};

export const GenericNewsListMining: FC<Props> = ({
  data,
  disableAdverts,
  hideCategory,
}) => {
  const { isMobile, isDesktopExtraLarge } = useScreenSize();
  let adCounter = 1;

  if (isMobile) {
    return (
      <GenericNewsListMiningMobile
        data={data}
        disableAdverts={disableAdverts}
      />
    );
  }

  function advertInjector(idx: number) {
    if (disableAdverts) return false;
    if (idx === 2 || (idx % 7 === 0 && idx !== 0)) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-10 pt-5">
      <div className="col-span-3 xl:col-span-2">
        {data?.map((node: TeasersUnion, idx: number) => (
          <Fragment key={idx}>
            {idx === 0 && (
              <TeaserWideForSubCategory
                size="xl"
                aspectRatio="auto"
                node={node}
                hideCategory={hideCategory}
                classTitle="mt-[-5px]"
              />
            )}
            {idx > 0 && (
              <TeaserWideForSubCategory
                node={node}
                size="lg"
                aspectRatio="auto"
                key={node.id}
                hideCategory={hideCategory}
              />
            )}
            {advertInjector(idx) && (
              <AdvertisingSlot
                id={`banner-${adCounter}`}
                className={"md:h-[90px] md:w-[728px] bg-red-400 mx-auto mb-10"}
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
      {isDesktopExtraLarge && (
        <div>
          <PressReleaseForSidebar />
          <AdvertisingSlot
            id={"right-rail-lg"}
            className={"h-[600px] w-[300px] bg-red-400 mx-auto sticky top-4"}
            viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
          />
        </div>
      )}
    </div>
  );
};

const GenericNewsListMiningMobile: FC<Props> = ({ data, hideCategory }) => {
  let adCounter = 0;
  function shouldInsertAdvert(idx: number) {
    if (idx % 4 === 0 && idx !== 0) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="grid grid-cols-3 gap-10 pb-5">
      <div className="col-span-3 xl:col-span-2">
        {data?.map((node: TeasersUnion, idx: number) => (
          <Fragment key={idx}>
            {idx === 0 && (
              <div className="pb-5">
                <TeaserCard size="md" node={node} />
              </div>
            )}
            {idx > 0 && (
              <div key={idx} className="pt-5">
                <TeaserWide
                  node={node}
                  size="md"
                  aspectRatio="16x9"
                  key={node.id}
                  hideCategory={hideCategory}
                />
              </div>
            )}
            {shouldInsertAdvert(idx) && (
              <AdvertisingSlot
                id={`banner-${adCounter}`}
                className={
                  "h-[250px] w-[300px] md:h-[90px] md:w-[728px] bg-red-400 mx-auto mb-10"
                }
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
