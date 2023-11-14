import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import { LeadGen } from "~/src/generated";
import { news } from "~/src/lib/news-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";

export const getServerSideProps: GetServerSideProps = async (c) => {
  const title = c.query.title as string;
  const fullSlug = `/leadgen/companies/${title}`;

  const { dehydratedState } = await ssrQueries({
    ctxRes: c.res,
    queries: [
      news.nodeByUrlAlias({
        variables: {
          urlAlias: fullSlug,
        },
      }),
    ],
  });

  return {
    props: {
      dehydratedState,
      urlAlias: fullSlug,
    },
  };
};

const LeadgenCompaniesTitle: NextPage<{ urlAlias: string }> = ({
  urlAlias,
}) => {
  const { data } = useQuery(
    news.nodeByUrlAlias({
      variables: { urlAlias },
    }),
  );
  const leadgenData = data.nodeByUrlAlias as LeadGen;

  return <div dangerouslySetInnerHTML={{ __html: leadgenData.body }}></div>;
};

export default LeadgenCompaniesTitle;
