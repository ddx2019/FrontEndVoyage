<template>
  <view class="calendar--container">
    <view class="calendar-header">
      <button @click="getPrevYear">上一年</button>
      <button @click="getNextYear">下一年</button>
      <button @click="getPrevMonth">上个月</button>
      <button @click="getNextMonth">下个月</button>
      <button @click="backToToday">回今日</button>
    </view>
    <view class="calendar-date">{{ currentYear }}年{{ currentMonth }}月</view>
    <view class="calendar-month">
      <view class="week-day" v-for="weekDay in weekDays">
        {{ weekDay }}
      </view>
      <view
        v-for="day in calendarDays"
        class="calendar-day"
        :class="{
          'selected-month-day': day.isSelectedMonth,
          'today-num': day.isToday
        }"
        @click.stop="emit('select', day)"
      >
        {{ day.isToday ? "今" : day.dayNumber }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

interface ICustomCalendaItem {
  dayNumber: number; //日
  formattedDate: string; //当前select 年-月-日
  isToday: boolean; //是否为今日
  isSelectedMonth: boolean; //是否为当前选中月份
}
interface IGenerateDaysParams {
  startDate: dayjs.Dayjs; //开始日期,这些日期对象从这一天开始生成
  count: number; //生成日期对象的数量
  isSelectedMonth: boolean; //这些日期对象是否属于当前选中的月份
}

type TDateProps = Date | string | number | dayjs.Dayjs;

const props = withDefaults(
  defineProps<{
    initialDate: TDateProps; //初始化显示的年月,年-月,默认显示当前年月
    startOfWeek: "Monday" | "Sunday"; //控制一周的第一天,默认周一
  }>(),
  {
    initialDate: () => new Date(),
    startOfWeek: "Monday"
  }
);

const emit = defineEmits<{
  (e: "select", val: ICustomCalendaItem): void;
}>();

const currentDate = ref<TDateProps>(new Date());
const currentYear = computed(() => dayjs(currentDate.value).year());
const currentMonth = computed(() => dayjs(currentDate.value).month() + 1);

const calendarDays = ref<Array<ICustomCalendaItem>>([]); //日历数据
const weekDaysArray = ["日", "一", "二", "三", "四", "五", "六"]; //周日为一周的第一天

const weekDays = computed(() => {
  const offset = props.startOfWeek === "Monday" ? 1 : 0;
  return Array.from({ length: 7 }, (_, i) => weekDaysArray[(i + offset) % 7]);
});

onLoad(() => {
  const { initialDate } = props;
  const isValidDate = dayjs(initialDate).isValid();
  currentDate.value = isValidDate ? initialDate : new Date();
  renderCalendar();
});

/**
 * 将当前日期设置为上一年的同一天，并重新渲染日历。
 */
function getPrevYear() {
  const prevYear = dayjs(currentDate.value).subtract(1, "year");
  currentDate.value = prevYear;
  renderCalendar();
}

/**
 * 将当前日期设置为下一年的同一天，并重新渲染日历。
 */
function getNextYear() {
  const nextYear = dayjs(currentDate.value).add(1, "year");
  currentDate.value = nextYear;
  renderCalendar();
}

/**
 * 将当前日期设置为上个月的同一天，并重新渲染日历。
 */
function getPrevMonth() {
  const prevMonth = dayjs(currentDate.value).subtract(1, "month");
  currentDate.value = prevMonth;
  renderCalendar();
}

/**
 * 将当前日期设置为下个月的同一天，并重新渲染日历。
 */
function getNextMonth() {
  const nextMonth = dayjs(currentDate.value).add(1, "month");
  currentDate.value = nextMonth;
  renderCalendar();
}

/**
 * 将当前日期设置为今天，并重新渲染日历。
 */
function backToToday() {
  currentDate.value = new Date();
  renderCalendar();
}

/**
 * 生成一系列日期对象。每个对象包含日期的日、格式化的日期、这个日期是否是今天和这个日期是否属于当前选中的月份
 */
function generateDays({
  startDate,
  count,
  isSelectedMonth
}: IGenerateDaysParams) {
  const todayStr = dayjs().format("YYYY-MM-DD"); //今天——年-月-日
  return new Array(count).fill(null).map((_, i) => {
    const dayNumber = startDate.add(i, "day").date();
    const formattedDate = startDate.add(i, "day").format("YYYY-MM-DD");
    const isToday = dayjs(formattedDate).diff(todayStr, "day") === 0;
    return {
      dayNumber,
      formattedDate,
      isToday,
      isSelectedMonth
    };
  });
}

/**
 * @description 渲染日历视图。
 * 首先，检查初始日期的格式是否正确。
 * 然后，计算当前月份的天数，以及第一天和最后一天是一周中的第几天。
 * 最后，生成上个月、当前月份和下个月在日历视图中应显示的日期，并将它们存储在 calendarDays 中。
 */
function renderCalendar() {
  const dateStr = dayjs(currentDate.value).format("YYYY-MM");
  const daysInMonth = dayjs(dateStr).daysInMonth();

  const startMonday = props.startOfWeek === "Monday";
  const weekOfFirstDay = startMonday
    ? (dayjs(dateStr).day() + 6) % 7
    : dayjs(dateStr).day();
  const weekOfLastDay = startMonday
    ? (dayjs(dateStr).endOf("month").day() + 6) % 7
    : dayjs(dateStr).endOf("month").day();

  const prevMonthDays = generateDays({
    startDate: dayjs(dateStr).subtract(weekOfFirstDay, "day"),
    count: weekOfFirstDay,
    isSelectedMonth: false
  });

  const currentMonthDays = generateDays({
    startDate: dayjs(dateStr),
    count: daysInMonth,
    isSelectedMonth: true
  });

  const nextMonthDays = generateDays({
    startDate: dayjs(dateStr).endOf("month").add(1, "day"),
    count: 6 - weekOfLastDay,
    isSelectedMonth: false
  });

  calendarDays.value = [
    ...prevMonthDays,
    ...currentMonthDays,
    ...nextMonthDays
  ];
}
</script>

<style scoped lang="scss">
.calendar--container {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      padding: 20rpx;
      background-color: #f5f5f5;
      border-bottom: 2rpx solid #e0e0e0;
      font-size: 28rpx;
      width: 100%;

      button {
          flex: 1;
          height: 80rpx;
          line-height: 80rpx;
          border-radius: 8rpx;
          background-color: #fff;
          border: 2rpx solid #e0e0e0;
          color: #000;
          font-size: 28rpx;
          letter-spacing: 0.025em;
          text-align: center;
          cursor: pointer;
          &:hover {
              background-color: #1a1a18;
              color: #fff;
          }
      }
  }

  .calendar-date {
      font-size: 32rpx;
      font-weight: 500;
      line-height: 48rpx;
      letter-spacing: 0.025em;
      color: rgba(23, 26, 29, 0.8);
      margin: 30rpx 0;
      text-align: center;
  }
  .calendar-month {
      display: grid;
      justify-items: center;
      align-items: center;
      row-gap: 48rpx;
      grid-template-columns: repeat(7, 1fr);
  }
  .week-day {
      font-size: 48rpx;
      font-weight: normal;
      line-height: 56rpx;
      letter-spacing: 0.025em;
      color: rgba(23, 26, 29, 0.24);
  }
  .calendar-day {
      min-width: 82rpx;
      height: 82rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      color: rgba(23, 26, 29, 0.24);
      &.selected-month-day {
          color: #000;
      }
      &.today-num {
          background-color: #ff3a3a;
          border-radius: 50%;
          border: none;
          color: #fff;
      }
  }
}
</style>
