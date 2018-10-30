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
                            <label>{{ printMonth }}</label>
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
                            <div class="data"></div>
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
                            <span class="text">9월 총 매출</span>
                        </dt>
                        <dd id="total">
                            -
                        </dd>
                    </dl>
                </div>
                <div class="column">
                    <dl class="averge_box">
                        <dt>
                            <span class="icon"><i class="clock outline icon"></i></span>
                            <span class="text">9월 평균 매출</span>
                        </dt>
                        <dd id="averge">
                            -
                        </dd>
                    </dl>
                </div>
                <div class="column">
                    <dl class="max_box">
                        <dt>
                            <span class="icon"><i class="chevron circle up icon"></i></span>
                            <span class="text">8월 최대 매출일</span>
                        </dt>
                        <dd id="max">
                            -
                        </dd>
                    </dl>
                </div>
                <div class="column">
                    <dl class="min_box">
                        <dt>
                            <span class="icon"><i class="chevron circle down icon"></i></span>
                            <span class="text">9월 최대 매출일</span>
                        </dt>
                        <dd id="min">
                            -
                        </dd>
                    </dl>
                </div>
            </div> <!-- row -->
        </div> <!-- total_list -->
    </div>
</template>

<script>
import api from '../api.js';
import Axios from 'axios';

export default {
  data() {
    return {
      calendar: {
        selectedMonth: moment().toDate()
      },
      list: []
    };
  },
  computed: {
    printMonth() {
      return moment(this.calendar.selectedMonth).format("YYYY-MM");
    },

    totalWeek() {
      const totalDays = moment(this.calendar.selectedMonth).daysInMonth();

      return Math.ceil((this.startWeek() + totalDays) / 7);
    }
  },
  methods: {
    startWeek() {
      return moment(this.calendar.selectedMonth)
        .startOf("month")
        .weekday();
    },
    printDay(weekIndex, dayIndex) {
        const day = weekIndex * 7 + dayIndex - this.startWeek() + 1;
        return day <= 0 || day > moment(this.calendar.selectedMonth).daysInMonth() ? -1 : day;
    },
    changeMonth(month) {
      this.calendar.selectedMonth = moment(this.calendar.selectedMonth).add(month, "month");

      this.getSalesData();
    },
    getSalesData() {
        const self = this;
        const start = moment(this.calendar.selectedMonth).startOf('month').toDate();
        const end = moment(this.calendar.selectedMonth).endOf('month').toDate();

        api.companySales(this.$store.state.company.id, start, end)
            .then(response => {
                const list = response.data;

                self.list = list;
            }).catch(err => {
                console.log(err);
            });
    }
  }
};
</script>
