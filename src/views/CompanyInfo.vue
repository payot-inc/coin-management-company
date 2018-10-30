<template>
    <div class="sales14">
        <div class="page_title">
            <h2>업체정보</h2>
            <h3>업체정보</h3>
        </div>

        <div class="section">

            <h4><i class="chevron plus icon"></i> 업체 기본정보</h4>
            <div class="data_box data_box5">

                <table class="ui celled table">
                    <tbody>
                        <tr>
                            <td class="two wide column">이메일</td>
                            <td>{{ company.email }}</td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <div class="ui left icon input column">
                                    <i class="lock icon"></i>
                                    <input
                                      type="password"
                                      name="password"
                                      placeholder="비밀번호"
                                      v-model="password">
                                </div>
                                <button
                                  class="ui violet button column"
                                  @click="modal.password.show = true">
                                  비밀번호 변경
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>개업일</td>
                            <td>{{ company.openDate }}</td>
                        </tr>
                        <tr>
                            <td>사업자번호</td>
                            <td>{{ company.number }}</td>
                        </tr>
                        <tr>
                            <td>업체명</td>
                            <td>{{ company.name }}</td>
                        </tr>
                        <tr>
                            <td>대표자</td>
                            <td>{{ company.owner.name }}</td>
                        </tr>
                        <tr>
                            <td>성별 / 생년월일</td>
                            <td>{{ company.owner.gender }} / {{ company.owner.birthDate }}</td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td>{{ company.address }}</td>
                        </tr>
                        <tr>
                            <td>핸드폰번호</td>
                            <td>{{ company.owner.phone }}</td>
                        </tr>
                        <tr>
                            <td>면적</td>
                            <td>25 평</td>
                        </tr>
                        <tr>
                            <td>층수</td>
                            <td>{{ company.floor }} 층</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>

        <sui-modal
          size="mini"
          v-model="modal.password.show">

          <sui-modal-header>
            비밀번호 변경
          </sui-modal-header>

          <sui-modal-content>
            비밀번호를 변경하시겠습니까?

            <sui-input
              class="fulid"
              type="password"
              placeholder="비밀번호 확인"
              :error="password !== modal.password.requirePassword"
              v-model="modal.password.requirePassword">
            </sui-input>
          </sui-modal-content>

          <sui-modal-actions>
            <sui-button
              negative
              @click="modal.password.show = false">
              변경 취소
            </sui-button>
            <sui-button
              primary
              :disabled="password !== modal.password.requirePassword"
              @click="updatePassword">
              변경하기
            </sui-button>
          </sui-modal-actions>
        </sui-modal>

        <sui-modal
          size="mini"
          v-model="modal.confirm.show">

          <sui-modal-content>
            {{ modal.confirm.message }}
          </sui-modal-content>

          <sui-modal-actions>
            <sui-button
              @click="modal.confirm.show = false">
              확인
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
      company: this.$store.state.company,
      password: '',
      modal: {
        password: {
          show: false,
          requirePassword: '',
        },
        confirm: {
          show: false,
          message: '',
        },
      },
    };
  },
  methods: {
    updatePassword() {
      const self = this;
      const password = this.password;

      if (this.password !== this.modal.password.requirePassword) {
        self.modal.confirm.message = '입력하신 비밀번호와 다릅니다';
        self.modal.confirm.show = true;
        return;
      }

      this.modal.password.show = false;
      this.password = '';
      this.modal.password.requirePassword = '';

      api.updateCompany(this.$store.state.company.id, { password })
        .then(({ data }) => {
          self.modal.confirm.message = '비밀번호가 변경되었습니다';
          self.modal.confirm.show = true;
        }).catch(({ response }) => {
          let message;

          if (response) message = '서버에 접속할 수 없습니다';
          else if (response.status === 422) message = '폼 오류';
          else message = '알 수 없는 오류가 발생하였습니다';

          self.modal.confirm.message = message;
          self.modal.confirm.show = true;
        });
    },
  },
};
</script>
