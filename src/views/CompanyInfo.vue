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
                                    <input type="password" name="password" placeholder="비밀번호">
                                </div>
                                <button class="ui violet button column">비밀번호 변경</button>
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

            </div> <!-- data_box -->
        </div> <!-- section -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            company: this.$store.state.company
        }
    }
}
</script>
