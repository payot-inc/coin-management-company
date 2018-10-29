<template>
    <div class="error_404">
        <img src="@/assets/image/404_error.png">
        <h2>현재 찾을 수 없는 페이지를 요청하셨습니다.</h2>
        <p>존재하지 않는 주소를 입력하셨거나, <br>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다</p>
        <div class="btns">
            <router-link to="/">로그인 화면으로</router-link>
        </div>
    </div>
</template>

<style scoped>
@import url('../assets/css/error.css');
</style>

