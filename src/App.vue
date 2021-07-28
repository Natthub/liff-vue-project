<template>

  <div class="container" align="center">
    <v-toolbar>
      <v-btn
          class="ma-2"
          dark
          @click="backHome"
      >Home
      </v-btn>
      &nbsp;
      <v-btn
          class="ma-2"
          @click="logout"
      >Logout
      </v-btn>

    </v-toolbar>
<!--    <ul>

      <li><router-link to="/register">Register</router-link></li>
    </ul>-->
    <router-view style="padding-top: 2%"></router-view>

  </div>
</template>

<script>


  import router from "@/router";
  import liff from "@line/liff";

  export default {
    name:"app",
    data(){
      return{
        title:"Line Shop Exchange"
      }
    },
    methods:{
      backHome(){
        router.push("/")
      },
      async logout() {
        sessionStorage.clear()
        await liff.init({liffId: "1656248565-0xznbqW1"})
        await liff.logout()
        await router.push("/")
        location.reload()
      }
    },
  };
</script>

<style>

</style>

