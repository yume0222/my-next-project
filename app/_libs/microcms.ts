// microCMSと通信処理を行う関数
import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

// ニュースの型定義
export type Category = {
  name: string;
} & MicroCMSListContent;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

// export type Category = {
//   name: string;
// };

// export type News = {
//   id: string;
//   title: string;
//   category: {
//     name: string;
//   };
//   publishedAt: string;
//   createdAt: string;
// };

// .env.lacalファイルに設定した環境変数を参照
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// クライアントを作成
const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// メンバーの一覧を表示する関数
export const getMembersList = async (queries?: MicroCMSQueries) => { // queriesは、引数。MicroCMSQueriesとは、microCMSに渡すクエリパラメータの型情報
  const listData = await client.getList<Member>({ // getList（非同期通信）は、async/awaitという仕組みで同期的に処理している。<Member>は、取得してきたデータの型
    endpoint: 'members', // endpointには、microCMS側で定義したメンバー管理APIのエンドポイントを設定
    queries, // queriesには、引数から受け取ったものをそのまま渡している
  });
  return listData;
};

// ニュース一覧を取得する関数
export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: 'news',
    queries,
  });
  return listData;
};

// ニュース詳細情報の取得（1つのニュース記事を取得する関数）
export const getNewsDetail = async (
  contentId: string, // 第一引数に、contentIdという文字列
  queries?: MicroCMSQueries // 第二引数に、queries
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: 'news',
    contentId,
    queries,
    // データ単位でキャッシュを制御
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });

  return detailData;
};

// カテゴリーのコンテンツを取得する関数
export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Category>({
    endpoint: 'categories',
    contentId,
    queries,
  });

  return detailData;
};