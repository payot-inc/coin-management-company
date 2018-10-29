<template>
    <header id="header">
        <div class="m_nav_btn ui toggle">
            <a href="#"><i class="bars icon"></i></a>
        </div>
        <div class="logo">
            <a>
                <span><img src="@/assets/image/logo_w.png"></span>
                <h2>무인장비 매출관리시스템</h2>
            </a>
        </div>
        <div class="login_box">
            <div class="name">
                <i class="user icon"></i>
                <strong>{{ company.owner.name }}</strong>
                점주님 안녕하세요!
            </div>
            <button
                class="ui inverted button"
                @click="modal.logout = true">로그아웃</button>
        </div>

        <sui-modal
            size="mini"
            :closable="false"
            v-model="modal.logout">
            <sui-modal-header>
                로그아웃
            </sui-modal-header>
            <sui-modal-content>
                <h4>정말 로그아웃 하시겠습니까??</h4>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button
                    class="postive"
                    @click="modal.logout = false">
                    취소
                </sui-button>

                <sui-button
                    class="negative"
                    @click="logout">
                    로그아웃
                </sui-button>
            </sui-modal-actions>
    </sui-modal>
    </header>
</template>

<script>
export default {
  data() {
    return {
        company: this.$store.state.company,
      modal: {
        logout: false,
      },
    };
  },
  computed: {
    franchise() {
      return this.$store.state.franchise;
    },
  },
  methods: {
    logout() {
      this.modal.logout = false;
      this.$store.commit('logout');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
h4 {
    color: black;
}
</style>

