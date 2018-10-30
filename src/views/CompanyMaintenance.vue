<template>
    <div class="sales08">
        <div class="page_title">
            <h2>경영정보 분석</h2>
            <h3>지난달 운영비용 입력</h3>
        </div>

        <div class="section">

            <h4><i class="chevron plus icon"></i> 지난 달 운영비용</h4>

            <div class="data_box">
                <div class="ui column doubling stackable grid">
                    <div class="three wide column data_name">
                        <span>전월 공과금(전기/가스/수도)</span>
                    </div>
                    <div class="thirteen wide column data_contents">
                        <div class="ui three column doubling stackable grid">
                            <div class="column">
                                <div class="ui fluid right labeled input">
                                    <input type="number" placeholder="금액입력" v-model.number="maintenance.electric">
                                    <div class="ui basic label">원</div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="ui fluid right labeled input">
                                    <input type="number" placeholder="금액입력" v-model.number="maintenance.gas">
                                    <div class="ui basic label">원</div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="ui fluid right labeled input">
                                    <input type="number" placeholder="금액입력" v-model.number="maintenance.water">
                                    <div class="ui basic label">원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- row -->

                <div class="ui column doubling stackable grid">
                    <div class="three wide column data_name">
                        <span>전월 월세</span>
                    </div>
                    <div class="thirteen wide column data_contents">
                        <div class="ui three column doubling stackable grid">
                            <div class="column">
                                <div class="ui fluid right labeled input">
                                    <input type="number" placeholder="금액입력" v-model.number="maintenance.spaceRant">
                                    <div class="ui basic label">원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- row -->

                <div class="ui column doubling stackable grid">
                    <div class="three wide column data_name">
                        <span class="data_name">전월 관리비</span>
                    </div>
                    <div class="thirteen wide column data_contents">
                        <div class="ui three column doubling stackable grid">
                            <div class="column">
                                <div class="ui fluid right labeled input">
                                    <input type="number" placeholder="금액입력" v-model.number="maintenance.management">
                                    <div class="ui basic label">원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- row -->

                <div class="ui column doubling stackable grid">
                    <div class="three wide column data_name">
                        <span class="data_name">전월 수리비</span>
                    </div>
                    <div class="thirteen wide column data_contents">
                        <div class="ui three column doubling stackable grid">
                            <div class="column">
                                <div class="ui fluid right labeled input">
                                    <input type="number" placeholder="금액입력" v-model.number="maintenance.repiar">
                                    <div class="ui basic label">원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- row -->

                <div class="ui column doubling stackable grid">
                    <div class="three wide column data_name">
                        <span class="data_name">전월 운영비(교통 및 잡비)</span>
                    </div>
                    <div class="thirteen wide column data_contents">
                        <div class="ui three column doubling stackable grid">
                            <div class="column">
                                <div class="ui fluid right labeled input">
                                    <input type="number" placeholder="금액입력" v-model.number="maintenance.etc">
                                    <div class="ui basic label">원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- row -->

                <div class="ui column doubling stackable grid total_price data_sel" style="border:1px solid #e2e2e2;">
                    <div class="three wide column data_name">
                        <span class="data_name">TOTAL 운영비용</span>
                    </div>
                    <div class="thirteen wide column data_contents">
                        <strong>{{ total.toLocaleString() }}</strong>
                        <span>원</span>
                    </div>
                </div> <!-- row -->

                <div class="ui right aligned mini basic segment">
                    <button @click="addMaintenance" class="ui big blue button">입력완료</button>
                </div>

            </div> <!-- data_box -->
        </div> <!-- section -->

        <sui-modal
            v-model="modal.show">
            <sui-modal-content>
                {{ modal.message }}
            </sui-modal-content>

            <sui-modal-actions>
                <sui-button
                    primary
                    @click="modal.show = false">
                    닫기
                </sui-button>
            </sui-modal-actions>
        </sui-modal>

    </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      maintenance: {
          targetDate: moment().endOf('month').format('YYYY-MM-DD')
      },
      modal: {
          show: false,
          message: ''
      }
    };
  },
  watch: {
      'modal.show': function (newValue) {
          if (!newValue) this.modal.message = '';
      }
  },
  computed: {
    total() {
      const self = this;
      const values = this.maintenance;
      delete values.targetDate;

      return Object.keys(this.maintenance).reduce((acc, key) => {
        return Number(acc) + Number(values[key]);
      }, 0);
    }
  },
  methods: {
    addMaintenance() {
        const self = this;
        let data = this.maintenance;
        const company = this.$store.state.company;
        data.targetDate = moment().endOf('month').format('YYYY-MM-DD');
        data.companyId = company.id;
        data.franchiseId = company.franchise.id;

        this.maintenance = {};

        api.updateMaintence(data)
            .then(response => response.data)
            .then(data => {
                self.modal.message = `${moment().format('YYYY년 MM월')} 운영비용이 정상적으로 반영되었습니다`;
                self.modal.show = true;
            }).catch(err => {
                self.modal.message = '알 수 없는 이유로 운영비용을 작성하지 못하였습니다';
                self.modal.show = true;
            });
    }
  }
};
</script>
