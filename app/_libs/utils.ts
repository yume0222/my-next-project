import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// UTCを扱うためのプラグインと、タイムゾーンを考慮するためのプラグインを適応
dayjs.extend(utc);
dayjs.extend(timezone);

// 日付変換処理を行うための関数（日付の文字列を受け取り、日本時間を考慮した日付表示に変換して文字列を返すformatDate関数を定義してエクスポート）
export const formatDate = (date: string) => {
  return dayjs.utc(date).tz('Asia/Tokyo').format('YYYY/MM/DD');
};