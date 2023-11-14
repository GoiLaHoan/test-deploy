import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import ListItemFourLine from "~/src/components-news/ArticleListItems/ListItemFourLine";
import Layout from "~/src/components/Layout/Layout";

export const getServerSideProps = (async ({ query }) => {
  return {
    props: {
      alias: query.alias,
    },
  };
}) satisfies GetServerSideProps;

const AllGuestsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ alias }) => {
  const { data } = useQuery(
    news.guestByUrlAlias({
      variables: { urlAlias: `/guests/${alias}` },
    }),
  );

  const { data: nodes } = useQuery(
    news.nodeListByGuest({
      variables: { urlAlias: `/guests/${alias}` },
    }),
  );

  return (
    <Layout title="Kitco Guest">
      <h2 className="text-5xl font-bold">{data?.guest?.fullName}</h2>
      <div className="layout-cols-2">
        <div>
          {!nodes ? (
            <ListItemFourLine.Loading howMany={5} />
          ) : (
            nodes?.guestNodes?.items?.map((x: any) => (
              <ListItemFourLine.Data
                key={x.id}
                authorName={!x.author ? "" : x.author?.fullName}
                authorUrlAlias={
                  !x.author ? "/author/[alias]" : x.author?.urlAlias
                }
                date={x.createdAt}
                summary={x.summary}
                image={x.image?.detail.sources?.teaser_small?.srcset}
                source={x.sponsor?.name}
                title={x.title}
                url={x.urlAlias}
              />
            ))
          )}
        </div>
        <div className="mt-4">
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default AllGuestsPage;
