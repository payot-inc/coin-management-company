<template>
    <div class="machine machine_list">
        <div class="page_title">
            <h2>장비관리</h2>
            <h3>장비목록</h3>
        </div>
        <section class="machine_table">
            <div class="ui segment">
                <table class="ui celled paddid table data-table">
                    <thead>
                        <tr>
                            <th>MAC</th>
                            <th>타입</th>
                            <th>장비명</th>
                            <th>용량</th>
                            <th>도입시기</th>
                            <th>도입가격</th>
                            <th>감가상각비</th>
                            <th>활성상태</th>
                            <th>상태</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(m, index) in company.machines" :key="index">
                            <td>{{ m.mac }}</td>
                            <td>{{ m.type }}</td>
                            <td>{{ m.name }}</td>
                            <td>{{ m.size }}</td>
                            <td>{{ m.installAt }}</td>
                            <td>{{ m.price }} 원</td>
                            <td>7,980,000 원</td>
                            <td>
                                <sui-checkbox toggle v-model="m.stopTime">
                                </sui-checkbox>
                            </td>
                            <td>
                                <i class="ui circle icon" :class="{ green: !isRunningMachine(m.isService), red: isRunningMachine(m.isService) }"></i>
                                {{ isRunningMachine(m.isService) ? '동작중' : '서비스 가능' }}
                            </td>
                            <td>
                                <button class="ui mini violet icon button config_btn" @click="editMachineModal(m)">
                                    <i class="ui cog icon"></i>
                                </button>
                                <button @click="claimModal(m)" class="ui mini teal icon button coin_btn">
                                    <i class="sign-in icon"></i>
                                </button>
                                <button @click="deleteMachineModal(m)" class="ui mini black icon button del_btn">
                                    <i class="delete icon"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="list_btns ui center aligned segment">
                <button class="ui labeled icon blue button eq_signup_st" @click="addMachineModal">
                    <i class="right plus icon"></i>장비등록
                </button>
            </div>

        </section> <!-- machine_list -->

        <sui-modal v-model="modal.detail.show">

            <sui-modal-header>
                <sui-icon name="cog" class="violet">
                </sui-icon>
                장비관리 설정
            </sui-modal-header>

            <sui-modal-content>
                <div class="scrolling content">
                    <section class="eq_info">
                        <h5><i class="ui caret square right outline icon"></i>장비 기본정보</h5>
                        <div class="ui form">
                            <div class="field">
                                <label>장비명</label>
                                <sui-input v-model="modal.detail.machine.name">
                                </sui-input>
                            </div>
                            <div class="three fields">
                                <div class="field">
                                    <label>타입</label>
                                    <sui-input v-model="modal.detail.machine.type">
                                    </sui-input>
                                </div>
                                <div class="field">
                                    <label>용량</label>
                                    <div class="ui input">
                                        <input type="text" v-model.number="modal.detail.machine.size">
                                    </div>
                                </div>
                            </div>
                            <div class="three fields">
                                <div class="field">
                                    <label>도입시기</label>
                                    <div class="ui small input">
                                        <input
                                          type="date"
                                          v-model="modal.detail.machine.installAt">
                                    </div>
                                </div>
                                <div class="field">
                                    <label>도입가격</label>
                                    <div class="ui right labeled input">
                                        <input type="number" v-model.number="modal.detail.machine.price">
                                        <div class="ui basic label">원</div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label>감가상각비</label>
                                    <div class="ui right labeled input">
                                        <input type="number" disabled>
                                        <div class="ui basic label">원</div>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <label>MAC ADDRESS</label>
                                <input type="text" v-model="modal.detail.machine.mac">
                            </div>
                            <button
                              class="ui fluid blue button"
                              type="submit"
                              @click="modal.update.show = true">
                              장비정보 수정
                            </button>
                        </div>
                    </section>

                    <section class="pd_signup">
                        <h5><i class="ui caret square right outline icon"></i>상품등록</h5>
                        <div class="ui form">
                            <div class="field">
                                <label>상품명</label>
                                <sui-input placeholder="상품명" v-model="modal.detail.newService.name"></sui-input>
                            </div>
                            <div class="two fields">
                                <div class="field">
                                    <label>서비스 동작시간</label>
                                    <div class="fields">
                                        <div class="eight wide field">
                                            <div class="ui right labeled input">
                                                <input placeholder="초단위 입력" v-model="modal.detail.newService.runTimeSec">
                                                <div class="ui basic label">초</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label>가격</label>
                                    <div class="ui right labeled input">
                                        <input placeholder="희망하시는 가격을 입력해주세요" v-model="modal.detail.newService.price">
                                        <div class="ui basic label">원</div>
                                    </div>
                                </div>
                            </div>
                            <button class="ui fluid violet button" type="submit" @click="addService(modal.detail.newService)">상품등록</button>
                        </div>
                    </section>

                    <section class="product_list">
                        <h5><i class="ui caret square right outline icon"></i>등록된 상품</h5>
                        <table class="ui celled table">
                            <thead>
                                <tr>
                                    <th class="check">
                                        <div class="ui fitted checkbox">
                                            <input type="checkbox">
                                            <label></label>
                                        </div>
                                    </th>
                                    <th>상품명</th>
                                    <th>동작시간</th>
                                    <th>가격</th>
                                    <th>사용상태</th>
                                    <!-- <th>순서</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(s, index) in modal.detail.machine.services" :key="index">
                                    <td class="check">
                                      <sui-checkbox

                                        v-model="modal.detail.selected"></sui-checkbox>
                                        <!-- <div class="ui fitted checkbox">
                                            <input type="checkbox">
                                            <label></label>
                                        </div> -->
                                    </td>
                                    <td>{{ s.name }}</td>
                                    <td>{{ s.runTimeSec }} 초</td>
                                    <td>{{ s.price}} 원</td>
                                    <td>
                                        <sui-checkbox toggle v-model="s.isSales">
                                        </sui-checkbox>
                                    </td>
                                    <!-- <td>
                                        <button class="ui mini black basic icon button">
                                            <i class="chevron up icon"></i>
                                        </button>
                                        <button class="ui mini black basic icon button">
                                            <i class="chevron down icon"></i>
                                        </button>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>

                        <sui-button
                          size="mini"
                          icon="delete"
                          iconPosition="right"
                          class="black floated"
                          @click="deleteService">
                          삭제하기
                        </sui-button>
                        <!-- <div class="list_btns">
                            <button class="ui right floated mini black button">
                                <label><i class="ui box delete icon"></i></label>선택삭제
                            </button>
                        </div> -->
                    </section> <!-- product_list -->

                </div>
            </sui-modal-content>
        </sui-modal>

        <sui-modal :size="'small'" v-model="modal.addMachine.show">
            <sui-modal-header>
                <sui-icon name="edit" class="blue outline">
                </sui-icon>
                장비 등록
            </sui-modal-header>

            <sui-modal-content>
                <div class="ui form">
                    <div class="three fields">
                        <div class="field">
                            <label>장비명</label>
                            <input placeholder="장비명을 입력해주세요" v-model="modal.addMachine.machine.name">
                        </div>
                        <div class="field">
                            <label>표 서비스 가격</label>
                            <input
                              placeholder="가격을 입력해주세요"
                              type="number"
                              v-model.number="modal.addMachine.machine.serviceAmmount">
                        </div>
                        <div class="field">
                            <label>대표 서비스 동작시간(초)</label>
                            <input
                              placeholder="동작시간을 입력해주세요"
                              type="number"
                              v-model.number="modal.addMachine.machine.serviceRuntimeSec">
                        </div>
                    </div>
                    <div class="three fields">
                        <div class="field">
                            <label>타입</label>
                            <sui-dropdown selection v-model="modal.addMachine.machine.type" :options="modal.addMachine.dropdown.types">
                            </sui-dropdown>
                        </div>
                        <div class="field">
                            <label>용량</label>
                            <div class="ui right labeled input">
                                <input type="number" placeholder="용량 입력" v-model.number="modal.addMachine.machine.size">
                                <div class="ui basic label">Kg</div>
                            </div>
                        </div>
                    </div>
                    <div class="three fields">
                        <div class="field">
                            <label>도입시기</label>
                            <sui-input type="date" v-model="modal.addMachine.machine.installAt">
                            </sui-input>
                        </div>
                        <div class="field">
                            <label>도입가격</label>
                            <div class="ui right labeled input">
                                <input type="number" placeholder="장비가격 입력" v-model.number="modal.addMachine.machine.price">
                                <div class="ui basic label">원</div>
                            </div>
                        </div>
                        <div class="field">
                            <label>MAC ADDRESS</label>
                            <input placeholder="맥어드레스 입력" v-model="modal.addMachine.machine.mac">
                        </div>
                    </div>
                </div>
            </sui-modal-content>

            <sui-modal-actions>
                <sui-button positive fluid @click="addMachine">
                    장비등록
                </sui-button>
            </sui-modal-actions>
        </sui-modal>

        <sui-modal :size="'mini'" v-model="modal.claimMachine.show">
            <sui-modal-header>
                <sui-icon name="teal" class="sign-in">
                </sui-icon>
                장비제어
            </sui-modal-header>

            <sui-modal-content>
                <div class="ui form">
                    <div class="field">
                        <label>동전투입</label>
                        <div class="ui right labeled input">
                            <input placeholder="금액입력" v-model="modal.claimMachine.price">
                            <div class="ui basic label">원</div>
                        </div>
                    </div>
                    <div class="field">
                        <label>입력사유</label>
                        <div class="ui right input">
                            <input type="text" name="weight" placeholder="예)고장으로 인한 원격투입">
                        </div>
                    </div>
                </div>

                <button class="ui fluid teal button" style="margin-top:30px" @click="claimMachine()">
                    입력완료
                </button>
            </sui-modal-content>
        </sui-modal>

        <sui-modal size="mini" :closable="false" v-model="modal.claimMachine.loading.show">
            <sui-modal-content>
                <sui-icon loading name="spinner">
                </sui-icon>
                금액을 투입중입니다.
            </sui-modal-content>
        </sui-modal>

        <sui-modal size="mini" v-model="modal.message.show">

            <sui-modal-content>
                {{ modal.message.message }}
            </sui-modal-content>

            <sui-modal-actions>
                <sui-button primary @click="modal.message.show = false">
                    확인
                </sui-button>
            </sui-modal-actions>
        </sui-modal>

        <sui-modal size="mini" v-model="modal.deleteMachine.show">
            <sui-modal-header>
                정보삭제
            </sui-modal-header>

            <sui-modal-content>
                삭제하시겠습니까?
            </sui-modal-content>

            <sui-modal-actions>
                <sui-button negative @click="modal.deleteMachine.show = false">
                    아니오
                </sui-button>
                <sui-button positive @click="deleteMachine(modal.deleteMachine.machine)">
                    예
                </sui-button>
            </sui-modal-actions>
        </sui-modal>

        <sui-modal
          size="mini"
          v-model="modal.update.show">

          <sui-modal-content>
            장비 정보를 변경하시겠습니까?
          </sui-modal-content>

          <sui-modal-actions>
            <sui-button
              negative
              @click="modal.update.show = false">
              취소
            </sui-button>

            <sui-button
              primary
              @click="editMachine(modal.detail.machine)">
              변경하기
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
      modal: {
        detail: {
          machine: {},
          editService: {},
          newService: {},
          selected: [],
          show: false,
        },
        addMachine: {
          machine: {},
          dropdown: {
            types: [
              { text: '세탁기', value: '세탁기' },
              { text: '건조기', value: '건조기' },
              { text: '기타', value: '기타' },
            ],
          },
          show: false,
        },
        claimMachine: {
          machine: {},
          price: 0,
          reason: '',
          loading: {
            show: false,
          },
          finish: {
            show: false,
          },
          show: false,
        },
        deleteMachine: {
          machine: {},
          show: false,
        },
        message: {
          show: false,
          message: '',
        },
        update: {
          show: false,
        },
      },
    };
  },
  watch: {
    'modal.claimMachine.loading.show': function (newValue) {
      if (!newValue) {
        this.modal.claimMachine.machine = {};
        this.modal.claimMachine.price = 0;
        this.modal.claimMachine.reason = '';
      }
    },
    'modal.deleteMachine.show': function (newValue) {
      if (!newValue) {
        this.modal.deleteMachine.machine = {};
      }
    },
  },
  computed: {
    company() {
      return this.$store.state.company;
    },
  },
  methods: {
    isRunningMachine(time) {
      if (!time) return false;

      if (moment(time) < moment(time)) return false;

      return true;
    },

    editMachineModal(machine) {
      this.modal.detail.machine = machine;
      this.modal.detail.show = true;
    },

    addMachineModal() {
      this.modal.addMachine.machine = {};
      this.modal.addMachine.show = true;
    },
    claimModal(machine) {
      this.modal.claimMachine.machine = machine;
      this.modal.claimMachine.show = true;
    },
    deleteMachineModal(machine) {
      this.modal.deleteMachine.machine = machine;
      this.modal.deleteMachine.show = true;
    },

    addMachine() {
      const self = this;
      const machine = this.modal.addMachine.machine;
      machine.size += 'Kg';

      this.$store
        .dispatch('addMachine', machine)
        .then((response) => {
          // 장비등록 성공시
          self.modal.addMachine.show = false;
        })
        .catch((err) => {
          // 장비등록 오류시
          const body = err.response.data;

          self.modal.message.show = true;
        });
    },

    addService(service) {
      const self = this;
      const machineId = this.modal.detail.machine.id;

      this.$store.dispatch('addService', { machineId, service })
        .then((s) => {
          self.modal.detail.machine.services.push(s);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteService() {
      const checked = this.modal.detail.selected.sort((a, b) => b - a);

      console.log(checked);
    },

    editMachine(machine) {
      this.modal.update.show = false;

      this.$store
        .dispatch('updateMachine', machine)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    claimMachine() {
      const self = this;
      const machineId = this.modal.claimMachine.machine.id;
      const price = this.modal.claimMachine.price;
      const reason = this.modal.claimMachine.reason;
      this.modal.claimMachine.machine = {};
      this.modal.claimMachine.price = 0;
      this.modal.claimMachine.reason = '';

      this.modal.claimMachine.show = false;
      this.modal.claimMachine.loading.show = true;

      api
        .claimMachine(machineId, price, reason)
        .then(response => response.data)
        .then((data) => {
          self.modal.message.message = '원격투입이 완료되었습니다';
          self.modal.message.show = true;
          self.modal.claimMachine.loading.show = false;
        })
        .catch((err) => {
          const body = err.response.data;
          self.modal.claimMachine.loading.show = false;

          self.modal.message.message = body.error;
          self.modal.message.show = true;
        });
    },

    deleteMachine(machine) {
      const self = this;
      const removeTarget = machine;
      this.modal.deleteMachine.show = false;

      this.$store
        .dispatch('deleteMachine', removeTarget)
        .then((response) => {
          self.modal.message.message = '장치가 삭제되었습니다';
          self.modal.message.show = true;
        })
        .catch((err) => {
          const body = err.response.data;

          console.log(body);
        });
    },
  },
};
</script>
