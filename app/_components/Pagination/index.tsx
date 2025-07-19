import { NEWS_LIST_LIMIT } from '@/app/_constants';
import Link from 'next/link';
import styles from './index.module.css';

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
};

export default function Pagination({
  totalCount,
  current = 1,
  basePath = '/news',
}: Props) {
  const pages = Array.from(
    // ページ数を計算（ニュースコンテンツの合計数/ページごとの表示数で割った結果の整数部分）
    { length: Math.ceil(totalCount / NEWS_LIST_LIMIT) },
    // 1からはじまるページ番号の配列を生成（作成した配列からインデックスナンバーをプラス1）
    (_, i) => i + 1
  );

  return (
    <nav>
      <ul className={styles.container}>
        {pages.map((p) => (
          <li className={styles.list} key={p}>
            {current !== p ? (
              <Link href={`${basePath}/p/${p}`} className={styles.item}>
                {p}
              </Link>
            ) : (
              <span className={`${styles.item} ${styles.current}`}>{p}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}