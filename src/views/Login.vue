<template>
    <div class="login">
        <div class="login_head">
            <div class="logo">
                <img src="@/assets/image/logo_b.png">
                <span>무인장비 매출관리시스템</span>
            </div>
        </div>
        <div class="container">
            <div class="login_title">
                <h3>로그인</h3>
                <p>로그인을 하셔야 서비스를 이용하실 수 있습니다</p>
            </div>
            <div class="login_box">
                <div class="ui form">
                    <div class="field">
                        <sui-input 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="이메일" 
                            v-validate="{ required: true, email: true }" 
                            name="email" 
                            data-vv-as="email"
                            :error="errors.has('email')" 
                            v-model="email">
                        </sui-input>
                    </div>
                    <div class="field">
                        <sui-input
                            class="fluid"
                            icon="lock"
                            type="password"
                            iconPosition="left"
                            placeholder="비밀번호"
                            v-validate="{ required: true, min: 4 }"
                            name="password"
                            data-vv-as="password"
                            :error="errors.has('password')"
                            v-model="password">
                        </sui-input>
                    </div>
                    <div class="field">
                        <sui-button
                            fluid
                            size="large"
                            class="violet"
                            @click="login">
                            로그인
                        </sui-button>
                    </div>
                    
                    <div class="ui error message" style="margin-bottom:15px;"></div>
                </div>

                <sui-button
                    fluid
                    class="violet inverted"
                    @click="wrapPayot">
                    PAYOT 홈페이지 돌아가기
                </sui-button>
                <p>주식회사 페이오티</p>
            </div>
        </div>

        <sui-modal
            size="mini"
            v-model="modal.show">
            <sui-modal-header>
                로그인 오류
            </sui-modal-header>

            <sui-modal-content>
                {{ modal.message }}
            </sui-modal-content>

            <sui-modal-actions>
                <sui-button
                    negative
                    @click="modal.show = false">
                    확인
                </sui-button>
            </sui-modal-actions>    
        </sui-modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
        modal: {
            show: false,
            message: ''
        },
      email: "",
      password: ""
    };
  },
  methods: {
      login () {
          this.$validator.validateAll();
          if (this.errors.any()) {
              this.modal.show = true;
              this.modal.message = '정확히 입력하였는지 확인해 주세요';
              return;
          };

          const self = this;
          this.$store.dispatch('login', { email: this.email, password: this.password })
            .then(company => {
                self.$router.push('/company');
            }).catch(err => {
                console.log(err)
                self.message = err;
                self.modal.show = true;
            });
      },
      wrapPayot () {
          window.open('http://www.payot-inc.com', '_blank')
      }
  }
};
</script>
