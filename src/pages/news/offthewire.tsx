import Layout from "~/src/components/Layout/Layout";
// import ListItemFourLine from '~/src/components/ArticleListItems/ListItemFourLine'
import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
// import { Commentary } from '~/src/generated'
// import { useMarketNewsCellQuery } from '~/cells/market-news-cell/market-news-cell.generated'

export async function getStaticProps() {
  return {
    props: {},
  };
}

const OffTheWire = () => {
  // TODO: FIX
  // TODO: FIX
  // TODO: FIX
  // const { data } = useMarketNewsCellQuery({
  //   limit: 25,
  //   offset: 0,
  // })

  return (
    <Layout title="News">
      <h2 className="font-bold text-5xl">OFF THE WIRE</h2>
      <div className="layout-cols-2">
        <div>
          <ul>
            {/* {!data ? ( */}
            {/*   <ListItemFourLine.Loading howMany={5} /> */}
            {/* ) : ( */}
            {/*   data.marketNews.items.map((x: Commentary) => ( */}
            {/*     <ListItemFourLine.Data */}
            {/*       key={x.id} */}
            {/*       authorName={x.author?.fullName} */}
            {/*       authorUrlAlias={x.author?.urlAlias} */}
            {/*       date={x.changed} */}
            {/*       summary={x.summary} */}
            {/*       image={x.image?.detail.sources?.teaser_small?.srcset} */}
            {/*       title={x.title} */}
            {/*       url={x.urlAlias} */}
            {/*     /> */}
            {/*   )) */}
            {/* )} */}
          </ul>
        </div>
        <div className="mt-4">
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default OffTheWire;
