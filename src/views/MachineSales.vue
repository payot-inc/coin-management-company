<template>
    <div class="sales09">
        <div class="page_title">
            <h2>경영정보 분석</h2>
            <h3>매출집중 시간(장비별)</h3>
        </div>

        <div class="section">

            <h4><i class="chevron plus icon"></i>매출집중시간 파악 <span>(장비/매출이 집중되는 장비를 분석하여 장비 운영정책에 도움되는 정보를 제공합니다)</span></h4>

            <div class="data_box">

                <div class="date_sel">
                    <dl>
                        24H 기준분석
                        <sui-input fluid type="date" v-model="selected.daily" />
                        <span>※선택일의 24시간 판매현황 입니다.</span>
                    </dl>
                </div>
                <div class="grap_box">
                    <line-chart :data="updateDailyChartData"></line-chart>
                </div>
            </div> <!-- data_box -->

            <div class="data_box">
                <div class="date_sel">
                    <dl>
                        1 Week 기준분석
                        <sui-input fluid type="date" v-model="selected.week" />
                        <span>※시작일로 부터 일주일간 판매현황 입니다.</span>
                    </dl>
                </div>
                <div class="grap_box">
                    <line-chart :data="updateWeekChartData"></line-chart>
                </div>
            </div> <!-- data_box -->
        </div> <!-- section -->
    </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      selected: {
        daily: moment().format("YYYY-MM-DD"),
        week: moment()
          .add(-7, "days")
          .format("YYYY-MM-DD")
      },
      data: {
        daily: [],
        week: []
      }
    };
  },
  mounted() {
    this.dailyChartData();
    this.weekChartData();
  },
  watch: {
      'selected.daily': function (newValue) {
          this.dailyChartData();
      },
      'selected.week': function (newValue) {
          this.weekChartData();
      }
  },
  computed: {
    updateDailyChartData() {
      let machines = this.$store.state.company.machines;
      const dailyGroup = _.groupBy(this.data.daily, d => {
        return moment(d.payAt).format("H");
      });

      // 장비명으로 정렬
      machines = _.sortBy(machines, m => m.name);

      // 각 장비별 판매목록 추출
      return machines.map(m => {
        return {
          name: m.name,
          data: _.times(24, time => {
            const array = dailyGroup[time];
            if (!array) return [time, 0];

            const targetMachine = array.filter(pay => pay.mac === m.mac);

            if (_.isEmpty(targetMachine)) return [time, 0];

            return [time, _.sumBy(targetMachine, i => Number(i.amount))];
          })
        };
      });
    },

    updateWeekChartData() {
      let machines = this.$store.state.company.machines;
      const weekGroup = _.groupBy(this.data.week, d => {
        return moment(d.payAt).weekday();
      });

      // 장비명으로 정렬
      machines = _.sortBy(machines, m => m.name);

      // 각 장비별 판매목록 추출
      return machines.map(m => {
        return {
          name: m.name,
          data: _.times(7, week => {
            const weekdayKo = ["일", "월", "화", "수", "목", "금", "토"];
            const array = weekGroup[week];
            if (!array) return [weekdayKo[week], 0];

            const targetMachine = array.filter(pay => pay.mac === m.mac);

            if (_.isEmpty(targetMachine)) return [weekdayKo[week], 0];

            return [
              weekdayKo[week],
              _.sumBy(targetMachine, i => Number(i.amount))
            ];
          })
        };
      });
    }
  },
  methods: {
    getSalesData(start, end) {
      const companyId = this.$store.state.company.id;
      return api
        .companySales(companyId, start, end)
        .then(response => response.data);
    },

    dailyChartData() {
      const self = this;
      const start = moment(this.selected.daily)
        .add(-1, "days")
        .toDate();
      const end = moment(this.selected.daily)
        .endOf("day")
        .toDate();

      this.getSalesData(start, end).then(data => {
        self.data.daily = data;
      });
    },

    weekChartData() {
      const self = this;
      const start = moment(this.selected.daily)
        .add(-1, "week")
        .toDate();
      const end = moment(this.selected.daily)
        .endOf("day")
        .toDate();

      this.getSalesData(start, end).then(data => {
        self.data.week = data;
      });
    }
  }
};
</script>
