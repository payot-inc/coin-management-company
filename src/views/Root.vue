<template>
    <div class="wrap">
        <header-component></header-component>
        <navi-component></navi-component>

        <div id="contents_wrap">
            <div class="container-fluid">
                <router-view />
                <div class="black_bg"></div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import NaviComponent from "@/components/Navi.vue";

export default {
  components: { HeaderComponent, NaviComponent }
};
</script>