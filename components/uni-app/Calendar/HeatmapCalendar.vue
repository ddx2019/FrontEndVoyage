<template>
  <view :class="`custom-calendar--${calendarType}`">
    <view class="custom-calendar-month">
      <view class="week-day" v-for="item in weekDays">
        {{ item }}
      </view>
      <template v-for="item in calendarDays">
        <view
          v-if="item"
          class="custom-calendar-days"
          :class="{ today: item.isToday }"
          :style="{
            'background-color': item.bgColor,
            border:
              item.isToday && calendarType !== 'compact'
                ? `4rpx solid ${item.bgColor}`
                : 'none'
          }"
          @click.stop="emits('select', item)"
        >
        </view>
        <view v-else></view>
      </template>
    </view>
  </view>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import { ref, watch } from "vue";
import { TMarkedDates, TSelectedDayInfo } from "./types";

type TDateProps = Date | string | number | dayjs.Dayjs;

const props = withDefaults(
  defineProps<{
    initDate: TDateProps; //初始化显示的年月,年-月,默认显示当前年月
    markedDates: TMarkedDates; //需要特殊标记的日期
    calendarType: "standard" | "compact"; // 控制总体显示样式
  }>(),
  {
    initDate: () => new Date(),
    markedDates: () => [],
    calendarType: "standard"
  }
);

const emits = defineEmits<{
  (e: "select", val: TSelectedDayInfo): void;
}>();

// const weekDays = ['一', '二', '三', '四', '五', '六', '日']//周日在后
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

const calendarDays = ref<Array<TSelectedDayInfo>>([]); //日历数据
const currentYear = ref<number>(); //年
const currentMonth = ref<number>(); //月

function renderCalendar() {
  const { initDate, markedDates } = props;
  if (!dayjs(initDate).isValid()) {
    throw new Error("initDate is not a valid date");
  }
  const dateStr = dayjs(initDate).format("YYYY-MM");
  const todayStr = dayjs().format("YYYY-MM-DD"); //今天——年-月-日
  currentYear.value = dayjs(dateStr).year();
  currentMonth.value = dayjs(dateStr).month() + 1;
  const currentMonthDays: Array<TSelectedDayInfo> = [
    ...new Array(dayjs(dateStr).daysInMonth()).keys()
  ].map(i => {
    const dayNumber: number = i + 1; //日,从1号开始
    const currDate: string = `${dateStr}-${dayNumber}`;
    const isToday: boolean = dayjs(currDate).diff(todayStr, "day") === 0;
    const bgColor: string =
      markedDates.find(val => dayjs(currDate).diff(val.date, "day") === 0)
        ?.bgColor || "";
    const selectItem = { dayNumber, currDate, bgColor, isToday };
    return selectItem;
  });
  const week: number = dayjs(
    `${currentYear.value}-${currentMonth.value}-1`
  ).day(); //获取当前是第几周，值0-6，0为周天
  // calendarDays.value = [...new Array(week ? week - 1 : 6).fill(null), ...currentMonthDays]//周日在后
  calendarDays.value = [
    ...new Array(week ? week : 7).fill(null),
    ...currentMonthDays
  ];
}

watch(
  () => props.markedDates,
  val => {
    renderCalendar();
  },
  { immediate: true }
);
</script>
<style scoped lang="scss">
.custom-calendar--standard {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  .custom-calendar-month {
      display: grid;
      justify-items: center;
      align-items: center;
      gap: 24rpx;
      grid-template-columns: repeat(7, 1fr);
  }
  .custom-calendar-days {
      width: 44rpx;
      height: 44rpx;
      border-radius: 8rpx;
      background-color: #f2f2f6;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .today {
      box-sizing: border-box;
      &::before {
          content: '';
          width: 36rpx;
          height: 36rpx;
          border-radius: 6rpx;
          box-sizing: border-box;
          border: 4rpx solid #fff;
      }
  }
  .week {
      font-size: 24rpx;
      font-weight: normal;
      line-height: 28rpx;
      letter-spacing: 0.025em;
      color: rgba(23, 26, 29, 0.24);
      margin-bottom: 6rpx;
  }
}
.custom-calendar--compact {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  .custom-calendar-month {
      display: grid;
      justify-items: center;
      align-items: center;
      gap: 8rpx;
      grid-template-columns: repeat(7, 1fr);
  }
  .custom-calendar-days {
      width: 24rpx;
      height: 24rpx;
      border-radius: 2rpx;
      background-color: #f2f2f6;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .week-day {
      font-size: 24rpx;
      font-weight: normal;
      line-height: 28rpx;
      letter-spacing: 0.025em;
      color: rgba(23, 26, 29, 0.8);
      margin-bottom: 6rpx;
  }
}
</style>
