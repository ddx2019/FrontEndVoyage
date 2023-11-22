export type TSelectedDayInfo = {
  dayNumber: number; //日
  currDate: string; //当前select 年-月-日
  bgColor: string; //当前项的背景色
  isToday: boolean; //是否为今日
};

export type TMarkedDateItem = {
  date: number | string | Date; //日期
  bgColor: string; //背景颜色
};

export type TMarkedDates = Array<TMarkedDateItem>;
