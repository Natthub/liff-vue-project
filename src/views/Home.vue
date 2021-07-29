<template>
  <div class="home" v-if="$store.state.isRegister">
    <div class="row">
      <div class="col">
        <v-avatar size="150">
          <img :src="$store.state.profile.pictureUrl">
        </v-avatar>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col">
        <h2>{{ $store.state.profile.displayName }}</h2>
      </div>
    </div>
    <hr>
    <com-score></com-score>
    <hr>
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-success form-control" @click="goToReceipt">ส่งใบเสร็จ</button>
      </div>
      <div class="col">
        <button type="button" class="btn btn-danger form-control" @click="goToExchange">แลกสินค้า</button>
      </div>
    </div>
    <hr>
    <div class="row">
      <h5>สินค้าที่แลกแล้ว</h5>
    </div>
    <div class="row">
      <v-data-table
          :headers="headers"
          :items="$store.state.userData[0].product"
          :items-per-page="10"
          class="elevation-1">
        <template v-slot:item.image="{ item }">
          <div class="p-2">
            <v-img :src="$store.state.apiUrl+'/image/product/'+item.image" :alt="item.name" height="100px" width="100px" @click="openPic(item.image)"/>
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>

import router from "@/router";
import liff from "@line/liff";
import ScoreShow from "@/components/ScoreShow";

export default {
  name: 'Home',
  components: {
    'com-score':ScoreShow,
  },
  data(){
    return{
      headers: [
        { text: '', value: 'image' },
        { text: 'ชื่อสินค้า', value: 'name' },
        { text: 'คะแนนที่ใช้แลก', value: 'score' },
      ]

    }
  },
  async mounted() {
    await liff.init({liffId: "1656248565-0xznbqW1"})
    if(liff.isLoggedIn()){
      const profile = await liff.getProfile()
      console.log(profile)
      await this.$store.dispatch("addDataToProfile", profile)
      //this.$store.state.isLogin = true
      console.log(this.$store.state.profile)

      if (!this.$store.state.isRegister) {
        await this.$store.dispatch("addUserData")
        await router.push("/register")
      }
    }
    else {
      liff.login()
    }

  }
  ,methods:{
    goToReceipt(){
      router.push("/receipt")
    },
    goToExchange(){
      router.push("/Exchange")
    }
  }
}
</script>

<style>

</style>
