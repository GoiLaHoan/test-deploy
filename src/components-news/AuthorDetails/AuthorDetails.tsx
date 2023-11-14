import Link from "next/link";
import React, { FC } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin, IoMailOutline } from "react-icons/io5";
import { AuthorImage } from "~/src/components/image-with-fallback/image-with-fallback.component";

import { Author } from "~/src/generated";
import StringToUrl from "~/src/utils/stringToUrl";

interface Props {
  authorData: Author;
  supportingAuthors?: any;
}

const AuthorDetails: FC<Props> = ({ authorData, supportingAuthors = [] }) => {
  const unifyAuthors: Array<Author> = [authorData, ...supportingAuthors];

  return (
    <div className="flex flex-col items-start p-5 gap-7 bg-gray-100 rounded-2xl">
      {unifyAuthors?.map((x, idx) => (
        <div
          key={idx}
          className={
            idx !== unifyAuthors?.length - 1
              ? "border-b border-gray-200 pb-5"
              : ""
          }
        >
          <div className="flex">
            <AuthorImage
              src={x?.imageUrl}
              className="rounded-full h-[75px] w-[75px] object-cover"
              style={{}}
              urlAlias={x.urlAlias}
            />
            <div className="pl-4 flex flex-col justify-between gap-3 w-[calc(100%_-_75px)]">
              <h3 className="text-[#232323]">
                <Link href={x.urlAlias} className="text-[#373737]">
                  {x?.name}
                </Link>
              </h3>
              <div
                className="text-ktc-gray font-normal leading-5 tracking-[0.005em] overflow-hidden line-clamp-3"
                dangerouslySetInnerHTML={{ __html: x?.body }}
              />
              <SocialsAuthorDetail
                email={x?.contactEmail}
                linkedInId={x?.linkedInId}
                twitterId={x?.twitterId}
                authorWebsite={StringToUrl(x?.authorWebsite)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorDetails;

interface SocialsProps {
  authorWebsite: string | null;
  email: string | null;
  linkedInId: string | null;
  twitterId: string | null;
}

const SocialsAuthorDetail: FC<SocialsProps> = ({
  authorWebsite,
  email,
  twitterId,
  linkedInId,
}) => {
  return (
    <div className="flex items-center gap-2">
      {twitterId && (
        <a
          className="text-ktc-icon-black"
          href={`https://twitter.com/${twitterId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter size={20} />
        </a>
      )}
      {linkedInId && (
        <a
          href={`https://www.linkedin.com/${linkedInId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ktc-icon-black"
        >
          <IoLogoLinkedin size={20} />
        </a>
      )}
      {authorWebsite && (
        <a
          className="text-ktc-icon-black"
          href={authorWebsite}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/icons/mdi_earth.svg"
            alt="Mdi Earth Logo"
            height={20}
            width={20}
          />
        </a>
      )}
      {email && (
        <a className="text-ktc-icon-black" href={`mailto:${email}`}>
          <IoMailOutline size={20} />
        </a>
      )}
    </div>
  );
};
