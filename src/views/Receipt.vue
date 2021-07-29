<template>
  <div id="Receipt">
    <h2>ส่งใบเสร็จ</h2>
    <hr>
    <div class="row">
      <div class="col-2" align="center">
        <h3>เลขที่ใบเสร็จ :</h3>
      </div>
      <div class="col">
        <input type="text" class="form-control" v-model="receiptID">
      </div>
    </div>
    &nbsp;
    <input type="file" class="form-control" @change="onFileChange">
    <hr>
    <img :src="image" class="img-fluid">
    <hr>

    <button type="submit" class="btn btn-primary form-control" @click="submit">ส่ง</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Receipt",
  data(){
    return{
      receiptID:"",
      image:"",
      file:""
    }
  },methods: {
    onFileChange: function (e) {
      var files = e.target.files
      this.file = files[0]
      if (!files.length)
        return
      this.createImage(files[0]);
    },
    createImage(files) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      }
      reader.readAsDataURL(files)
    },
    submit() {
      if (this.receiptID != ""){
        let formData = new FormData()
        formData.append("userID",this.$store.state.profile.userId)
        formData.append("receiptID",this.receiptID)
        formData.append("image",this.file)
        axios
            // eslint-disable-next-line no-undef
            .post(this.$store.state.apiUrl+"/user/receipt",formData)
            .then(response => {
              console.log(response.data)
              if(response.data.status == 1){
                alert("ส่งใบเสร็จสำเร็จ กรุณารอแอดมินให้คะแนน")
              }else{
                alert("เลขที่ใบเสร็จนี้ถูกอัปโหลดแล้ว")
              }
            })
            .catch(error => console.log(error))
      }else{
        alert("กรุณากรอกเลขที่ใบเสร็จ")
      }

    }
  }
}
</script>

<style scoped>

</style>