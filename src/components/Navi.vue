<template>
    <nav id="side_gnb">
        <div class="login_box">
            <ul class="user_info">
                <li>
                    <strong>{{ company.name }}</strong>
                    <span>{{ company.owner.name }}</span>
                </li>
            </ul>
        </div>

        <sui-accordion class="side_menu" inverted>
            <sui-accordion-title>
                <strong class="name">사업장</strong>
                <sui-icon name="dropdown"></sui-icon>
            </sui-accordion-title>
            <sui-accordion-content active>
                <ul>
                    <li v-bind:class="{ on: path == '/company/sales' }">
                        <router-link to="/company/sales">매출 분석</router-link>
                    </li>
                    <li v-bind:class="{ on: path == '/company/info' }">
                        <router-link to="/company/info">업체정보</router-link>
                    </li>
                    <li v-bind:class="{ on: path == '/company/maintenance' }">
                        <router-link to="/company/maintenance">운용비용 입력</router-link>
                    </li>
                    <li v-bind:class="{ on: path == '/company/company_users' }">
                        <router-link to="/company/company_users">회원관리</router-link>
                    </li>
                </ul>
            </sui-accordion-content>

            <sui-accordion-title>
                <strong class="name">장비</strong>
                <sui-icon name="dropdown"></sui-icon>
            </sui-accordion-title>
            <sui-accordion-content>
                <ul>
                    <li v-bind:class="{ on: path == '/machine/info' }">
                        <router-link to="/machine/info">장비 관리</router-link>
                    </li>
                    <li v-bind:class="{ on: path == '/machine/sales' }">
                        <router-link to="/machine/sales">매출정보</router-link>
                    </li>
                </ul>
            </sui-accordion-content>
        </sui-accordion>
    </nav>
</template>

<script>
export default {
  data() {
      return {
          company: this.$store.state.company
      }
  },
  computed: {
    path() {
      return this.$route.path;
    },
    franchise() {
      return this.$store.state.franchise;
    }
  }
};
</script>
