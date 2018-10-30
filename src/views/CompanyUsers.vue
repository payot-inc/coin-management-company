<template>
    <div class="member member_list">
        <div class="page_title">
            <h2>회원관리</h2>
            <h3>회원목록</h3>
        </div>

        <section class="point_table">
            <div class="list_btns ui center aligned segment">
                <button @click="modal.addPoint.show = true" class="ui blue button pt_chage_bt">
                    <i class="ui hockey puck icon"></i>포인트충전
                </button>
                <button @click="modal.sms.show = true" class="ui purple button sms_btn">
                    <i class="ui envelope outline icon"></i>문자보내기
                </button>
            </div>

            <div class="ui segment">
                <table class="ui center aligned celled padded table data-table">
                    <thead>
                        <tr>
                            <!-- <th>
                                <div class="ui fitted checkbox">
                                    <input type="checkbox">
                                    <label></label>
                                </div>
                            </th> -->
                            <th class="number">번호</th>
                            <th>전화번호</th>
                            <th>포인트잔액</th>
                            <th>가입일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(u, index) in users" :key="index">
                            <!-- <td>
                                <div class="ui fitted checkbox">
                                    <input type="checkbox">
                                    <label></label>
                                </div>
                            </td> -->
                            <td class="number">{{ u.id }}</td>
                            <td>{{ bindPhoneNumber(u.phone) }}</td>
                            <td>{{ u.point }} Pt</td>
                            <td>{{ convertTime(u.createdAt) }}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </section> <!-- machine_list -->

        <sui-modal size="mini" class="point_change_modal" v-model="modal.addPoint.show">

            <sui-modal-header>
                <i class="ui hockey puck teal icon"></i>포인트 충전하기
            </sui-modal-header>

            <sui-modal-content>
                <label class="ui fluid bottom pointing label" style="text-align:center">총 {{ users.length }}명이 선택되었습니다</label>
                <form class="ui form">
                    <div class="field">
                        <label>포인트입력</label>
                        <div class="ui right labeled input">
                            <input type="number" name="weight" placeholder="포인트입력" v-model.number="modal.addPoint.point">
                            <div class="ui basic label">PT</div>
                        </div>
                    </div>
                    <div class="field">
                        <label>입력사유</label>
                        <div class="ui right input">
                            <input type="text" name="weight" placeholder="예) 9월 행사" v-model="modal.addPoint.message">
                        </div>
                    </div>
                </form>

                <button @click="addPoint" class="ui fluid teal button segment">충전하기</button>
            </sui-modal-content>
        </sui-modal>

        <sui-modal size="mini" class="sms_modal" v-model="modal.sms.show">
            <sui-modal-header>
                <i class="ui envelope outline violet icon"></i>문자보내기
            </sui-modal-header>

            <sui-modal-content>
                <div class="ui form">
                    <div class="ui bottom pointing fluid label" style="text-align:center;">
                        <label>{{ users.length }}명이 선택되었습니다</label>
                    </div>
                    <div class="field">
                        <label>보내는내용</label>
                        <div class="ui textarea">
                            <textarea v-model="modal.sms.message" placeholder="최대 80자까지 가능"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <button @click="sendSMS" class="ui fluid violet button" type="submit">메시지 보내기</button>
                    </div>
                </div> <!-- ui form -->
            </sui-modal-content>
        </sui-modal>

        <sui-modal
            size="mini"
            v-model="modal.message.show">

            <sui-modal-content>
                {{ modal.message.message }}
            </sui-modal-content>

            <sui-modal-actions>
                <sui-button
                    primary
                    @click="modal.message.show = false">
                    확인
                </sui-button>
            </sui-modal-actions>
        </sui-modal>

        <sui-modal
            :closable="false"
            size="mini"
            v-model="modal.progress.show">

            <sui-modal-content>
                <sui-icon name="spinner" loading />

                잠시만 기다려 주십시오
            </sui-modal-content>
        </sui-modal>
    </div> <!-- container-fluid -->
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      modal: {
        addPoint: {
          show: false,
          point: 0,
          message: '',
        },
        sms: {
          show: false,
          message: '',
        },
        progress: {
          show: false,
        },
        message: {
          show: false,
          message: '',
        },
      },
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      const self = this;
      api.getCompanyUsers(this.$store.state.company.id).then((response) => {
        self.users = response.data;
      });
    },

    addPoint() {
      const self = this;
      const companyId = this.$store.state.company.id;
      const point = this.modal.addPoint.point;
      const message = this.modal.addPoint.message;

      this.modal.addPoint.show = false;
      this.modal.addPoint.point = 0;
      this.modal.addPoint.message = '';

      this.modal.progress.show = true;
      api.addPoint(companyId, point)
        .then((result) => {
          self.getUsers();

          this.modal.progress.show = false;
        }).catch((err) => {
          this.modal.progress.show = false;
        });
    },

    sendSMS() {
      const self = this;
      const message = this.modal.sms.message;
      self.modal.sms.message = '';
      self.modal.sms.show = false;

      self.modal.progress.show = true;

      api.sendSMS(this.$store.state.company.id, message)
        .then((response) => {
          self.modal.message.message = '정상적으로 메시지를 전송하였습니다';
          self.modal.message.show = true;
          self.modal.progress.show = false;
        }).catch((err) => {
          if (!err.response) {
            self.modal.message.message = '서버에 접속할 수 없습니다';
          } else if (err.response.data) {
            console.log(err.response.data);
            self.modal.message.message = `[${err.response.data}] 메시지를 전송할 수 없습니다`;
          } else {
            self.modal.message.message = '알 수 없는 오류가 발생하였습니다';
          }

          self.modal.progress.show = false;
          self.modal.message.show = true;
        });
    },

    convertTime(time) {
      return moment(time).format('YYYY-MM-DD');
    },

    bindPhoneNumber(number) {
      const numbers = number.split('-');

      return `${numbers[0]}-****-${numbers[2]}`;
    },
  },
};
</script>
