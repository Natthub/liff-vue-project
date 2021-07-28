<template>
  <div id="Exchange">
    <div data-app>
      <v-dialog v-model="dialog" max-width="60%" @keydown.esc="cancel">
        <v-card>
          <v-img :src="picture" alt="" contain/>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="dialogForm"
          max-width="25%"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="close"
            >
              ยกเลิก
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="save"
            >
              ตกลง
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
      </div>
    <hr>
    <com-score></com-score>
    <hr>
      <h4>สินค้าทั้งหมด</h4>

    <v-data-table
        :headers="headers"
        :items="this.$store.state.products"
        class="elevation-1">
      <template v-slot:item.image="{ item }">
        <div class="p-2">
          <v-img :src="$store.state.apiUrl+'/image/product/'+item.image" :alt="item.name" height="100px" width="100px" @click="openPic(item.image)"/>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-shopping
        </v-icon>

      </template>
    </v-data-table>
  </div>
</template>

<script>

import axios from "axios";
import ScoreShow from "@/components/ScoreShow";

export default {
  name: "Exchange",
  components: {
    "com-score":ScoreShow
  },
  data(){
    return{
      dialog: false,
      dialogForm: false,
      picture:"",
      headers: [
        { text: '', value: 'image' },
        // { text: 'รหัสสินค้า', value: '_id' , },
        { text: 'ชื่อสินค้า', value: 'name' },
        { text: 'คะแนนที่ใช้แลก', value: 'score' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        userID: '',
        productID: '',
        score:''
      },
      defaultItem: {
        userID: '',
        productID: '',
        score:''
      },
    }
  },
  async mounted() {
    await axios
        .get(this.$store.state.apiUrl + "/product/all")
        .then(response => {
          this.$store.state.products = response.data
        })
        .catch(error => console.log(error))
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'ยืนยันการแลกสินค้า' : 'Edit Item'
    },
  },
  methods:{

    openPic(image) {
      this.dialog = true
      this.picture = this.$store.state.apiUrl+'/image/product/'+image
    },
    cancel() {
      this.dialog = false
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if(this.editedItem.score <= this.$store.state.userData[0].coupon.unused){
        this.dialogForm = true
      }else{
        alert("คะแนนของไม่เพียงพอ")
      }

    },

    close () {
      this.dialogForm = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        console.log(this.editedItem)
        let formData = new FormData()
        formData.append("userID",this.$store.state.profile.userId)
        formData.append("productID",this.editedItem._id)
        axios
            // eslint-disable-next-line no-undef
            .post(this.$store.state.apiUrl+"/user/exchange",formData)
            .then(response => {
              if (response.data.status == 1) {
                this.dialogForm = false
                alert("แลกสินค้าสำเร็จ")
                location.reload()
              } else {
                console.log(response.data)
                alert("แลกสินค้าไม่สำเร็จ!!!")
                this.dialogForm = false
              }
            })
            .catch(error => console.log(error))
      }
      this.close()
    },
  }

}
</script>

<style scoped>

</style>