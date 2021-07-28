<template>
  <div id="Register">
   <v-avatar size="300"><img :src="$store.state.profile.pictureUrl"></v-avatar>
    <div class="row" style="padding-top: 5%">
      <input type="text" class="form-control" readonly :value="$store.state.profile.userId">
    </div>
    &nbsp;
    <div class="row">
      <input type="text" class="form-control" readonly :value="$store.state.profile.displayName">
    </div>
    &nbsp;
    <div class="row">
      <button type="button" class="btn btn-primary" @click="register">ลงทะเบียน</button>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: "Register",
  data(){
    return{

    }
  },
  async created() {
    console.log(this.$store.state.isRegister)
    if (this.$store.state.isRegister) {
      await router.push("/")
    }

  },
  methods:{
    register(){
      let formData = new FormData()
      formData.append("userID",this.$store.state.profile.userId)
      formData.append("name",this.$store.state.profile.displayName)
      formData.append("image",this.$store.state.profile.pictureUrl)
      axios.post(this.$store.state.apiUrl+"/user/register", formData)
          .then(async response => {
            if (response.data.status === 1) {
              await this.$store.dispatch("addUserData")
              router.push("/")
            } else {
              console.log(response)
              alert("คุณลงทะเบียนแล้ว")
              this.$store.state.isRegister = true
              router.push("/")
            }
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });

    }
  }
}
</script>

<style scoped>
</style>