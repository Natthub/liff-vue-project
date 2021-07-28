<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <span>คะแนนที่ใช้ได้</span>
      </div>
      <div class="col">
        <span>คะแนนที่ใช้ไปแล้ว</span>
      </div>
      <div class="col">
        <span>คะแนนสะสมทั้งหมด</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span>{{ $store.state.userData[0].coupon.unused }}</span>
      </div>
      <div class="col">
        <span>{{ $store.state.userData[0].coupon.used }}</span>
      </div>
      <div class="col">
        <span>{{ $store.state.userData[0].coupon.used +  $store.state.userData[0].coupon.unused}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreShow",
  async mounted() {
    await this.$store.dispatch("addUserData")
  }
}
</script>

<style scoped>

</style>