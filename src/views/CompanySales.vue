<template>
    <div class="sales01">
        <div class="page_title">
            <h2>사업자 매출현황</h2>
            <h3>기간별 총 매출(장비전체)</h3>
        </div>

        <h4><i class="chevron plus icon"></i> 기간별 총 매출</h4>
        <div class="calendar">
            <table>
                <tbody>
                    <tr>
                        <td colspan="7" class="calendar_nav">
                            <div @click="changeMonth(-1)" class="calendar_arrow calendar_left"><i class="chevron left icon"></i></div>
                            <label>{{ printYearMonth }}</label>
                            <div v-on:click="changeMonth(1)" class="calendar_arrow calendar_right"><i class="chevron right icon"></i></div>
                        </td>
                    </tr>
                    <tr class="week">
                        <td>일요일</td>
                        <td>월요일</td>
                        <td>화요일</td>
                        <td>수요일</td>
                        <td>목요일</td>
                        <td>금요일</td>
                        <td>토요일</td>
                    </tr>
                    <tr v-for="(week, weekIndex) in totalWeek" :key="weekIndex" class="day_line">
                        <td v-for="(day, dayIndex) in 7" :key="dayIndex">
                            <div class="day">
                                {{ printDay(weekIndex, dayIndex) !== -1 ? printDay(weekIndex, dayIndex) : '' }}
                            </div>
                            <div class="data">
                              <span v-if="printDay(weekIndex, dayIndex) !== -1">
                                {{ sales.daily[printDay(weekIndex, dayIndex) - 1] ?
                                  sales.daily[printDay(weekIndex, dayIndex) - 1].total.toLocaleString() :
                                  0
                                }}원
                              </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="total_list">
            <h4><i class="chevron plus icon"></i> 매출통계</h4>
            <div class="ui four column doubling stackable grid">
                <div class="column">
                    <dl class="total_box">
                        <dt>
                            <span class="icon"><i class="won sign icon"></i></span>
                            <span class="text">{{ printMonth }}월 총 매출</span>
                        </dt>
                        <dd id="total">
                            {{ sales.total.toLocaleString() + '원' }}
                        </dd>
                    </dl>
                </div>
                <div class="column">
                    <dl class="averge_box">
                        <dt>
                            <span class="icon"><i class="clock outline icon"></i></span>
                            <span class="text">{{ printMonth }}월 평균 매출</span>
                        </dt>
                        <dd id="averge">
                            {{ sales.average.toLocaleString() + '원' }}
                        </dd>
                    </dl>
                </div>
                <div class="column">
                    <dl class="max_box">
                        <dt>
                            <span class="icon"><i class="chevron circle up icon"></i></span>
                            <span class="text">{{ printMonth }}월 최대 매출일</span>
                        </dt>
                        <dd id="max">
                            {{ sales.max.day + '일' }}
                        </dd>
                    </dl>
                </div>
                <div class="column">
                    <dl class="min_box">
                        <dt>
                            <span class="icon"><i class="chevron circle down icon"></i></span>
                            <span class="text">{{ printMonth }}월 최소 매출일</span>
                        </dt>
                        <dd id="min">
                            {{ sales.min.day + '일' }}
                        </dd>
                    </dl>
                </div>
            </div> <!-- row -->
        </div> <!-- total_list -->
    </div>
</template>

<script>
import api from '../api.js';

export default {
  data() {
    return {
      calendar: {
        selectedMonth: moment().toDate(),
      },
      sales: {
        total: 0,
        average: 0,
        max: 0,
        min: 0,
        daily: [],
      },
    };
  },
  mounted() {
    this.getSalesData();
  },
  computed: {
    printYearMonth() {
      return moment(this.calendar.selectedMonth).format('YYYY-MM');
    },

    printMonth() {
      return moment(this.calendar.selectedMonth).format('M');
    },

    totalWeek() {
      const totalDays = moment(this.calendar.selectedMonth).daysInMonth();

      return Math.ceil((this.startWeek() + totalDays) / 7);
    },
  },
  methods: {
    startWeek() {
      return moment(this.calendar.selectedMonth)
        .startOf('month')
        .weekday();
    },
    printDay(weekIndex, dayIndex) {
      const day = weekIndex * 7 + dayIndex - this.startWeek() + 1;
      return day <= 0 || day > moment(this.calendar.selectedMonth).daysInMonth() ? -1 : day;
    },
    bindCalendar(weekIndex, dayIndex) {
      const day = weekIndex * 7 + dayIndex - this.startWeek();
      const data = this.sales.daily;

      if (day < 0) return 0;
      return `${data[day].total.toLocaleString()}원`;
    },
    changeMonth(month) {
      this.calendar.selectedMonth = moment(this.calendar.selectedMonth).add(month, 'month');

      this.getSalesData();
    },
    getSalesData() {
      const self = this;
      const start = moment(this.calendar.selectedMonth).startOf('month').toDate();
      const end = moment(this.calendar.selectedMonth).endOf('month').toDate();

      const totalDay = moment(this.calendar.selectedMonth).daysInMonth();

      api.companySales(this.$store.state.company.id, start, end)
        .then(({ data }) => {
          const total = _.sumBy(data, o => Number(o.amount));
          const dayGroup = _.groupBy(data, o => moment(o.payAt).format('D'));
          const daily = _.times(totalDay, (day) => {
            const nowDay = day + 1;
            return {
              day: nowDay,
              total: _.sumBy(dayGroup[nowDay], o => Number(o.amount)),
            };
          });

          self.sales.total = total;
          self.sales.average = Math.round(total / totalDay);
          self.sales.daily = daily;
          self.sales.max = _.maxBy(daily, o => Number(o.total));
          self.sales.min = _.minBy(daily, o => Number(o.total));
        });
    },
  },
};
</script>
