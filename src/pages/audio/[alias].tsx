import React from "react";

import Layout from "~/src/components/Layout/Layout";
// import TitleBlock from '~/src/components/Article/TitleBlock/TitleBlock'
// import ArticleAudioPlayer from '~/src/components/ArticleAudioPlayer/ArticleAudioPlayer'
// import LatestNewsCell from '$cells/LatestNewsCell/LatestNewsCell'
// import ArticleSignature from '~/src/components/ArticleSignature/ArticleSignature'
//
// import useRecordView from '~/src/utils/useRecordView'
// import styles from '~/src/styles/videoArticlePage.module.scss'
// import { useOneAudioNodeQuery } from '~/gql/fetchOnes/oneAudioNode.generated'
// import { AudioArticle } from '~/src/generated'

export async function getServerSideProps({ query }) {
  return { props: { alias: query.alias } };
}

const AudioDetailPage = ({ alias }) => {
  // const { data } = useOneAudioNodeQuery({
  //   urlAlias: `/audio/${alias}`,
  // })
  // // reassign & pick type
  // const fetched = data?.audio as AudioArticle
  // useRecordView(fetched, fetched?.id)

  return (
    <Layout title={alias}>
      <h1>soon to be audio page</h1>
      {/* <div className={styles.gridTwoColumn}> */}
      {/*   <div> */}
      {/*     <TitleBlock */}
      {/*       loading={!data} */}
      {/*       author={fetched?.author} */}
      {/*       category={!fetched?.category ? '' : fetched?.category[0]?.name} */}
      {/*       changed={fetched?.changed} */}
      {/*       title={fetched?.title} */}
      {/*     /> */}
      {/*     {fetched?.audio && ( */}
      {/*       <ArticleAudioPlayer */}
      {/*         assetSnippetUuid={fetched?.audioSnippet?.asset?.uuid} */}
      {/*         // thumbnail={fetched?.audioSnippet?.thumbnailUuid} */}
      {/*         // thumbnailPrefix={fetched?.audioSnippet?.thumbnailUuid} */}
      {/*         data={data} */}
      {/*       /> */}
      {/*     )} */}
      {/*     <main */}
      {/*       dangerouslySetInnerHTML={{ */}
      {/*         __html: !fetched?.body ? fetched?.summary : fetched?.body, */}
      {/*       }} */}
      {/*       className={styles.bodyContent} */}
      {/*     ></main> */}
      {/*     {fetched?.author && <ArticleSignature author={fetched.author} />} */}
      {/*   </div> */}
      {/**/}
      {/*   <div> */}
      {/*     <LatestNewsCell /> */}
      {/*   </div> */}
      {/* </div> */}
    </Layout>
  );
};

export default AudioDetailPage;
