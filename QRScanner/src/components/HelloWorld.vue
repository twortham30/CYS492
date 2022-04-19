

<template>

<div class="container-fluid mt-4">
 
    <div class="row justify-content-center">
        <div class="col-auto mb-3">
            <div class="card" style="width: 18rem; height:20rem;">
                <div class="card-body">
                    <h5 class="card-title">QR Code</h5>
                   
                   <qrcode-vue :value="qrVal" :size="size" level="H" /> 
   
              <label>QR input: <input class="text-indigo-600" v-model="value"></label>
  <el-button class="m-8" type="primary" @click="create">Create</el-button>
     
                </div>
            </div>
        </div>
        <div class="col-auto mb-3">
            <div class="card " style="width: 18rem; height:20rem;">
                <div class="card-body overflow-scroll">
                    <h5 class="card-title">Public Key:</h5>
                 
                    <p class="card-text"> {{this.publickey}}</p>
                    
                </div>
            </div>
        </div>
         <div class="col-auto mb-3">
            <div class="card " style="width: 18rem; height:20rem;">
                <div class="card-body overflow-scroll">
                    <h5 class="card-title">Encrypted Text:</h5>
                 
                      {{this.plainenc}}
                    
                </div>
            </div>
        </div>
           <div class="col-auto mb-3">
            <div class="card " style="width: 18rem; height:20rem;">
                <div class="card-body overflow-scroll">
                   <p class="decode-result">Decrypt: <b>{{ result }}</b></p>

    <p v-if="error !== null" class="drop-error">
      {{ error }}
    </p>

    <qrcode-drop-zone @detect="onDetect" @dragover="onDragOver" @init="logErrors">
      <div class="drop-area" :class="{ 'dragover': dragover }">
        DROP YOUR QR CODE HERE
      </div>
    </qrcode-drop-zone>
                    
                </div>
            </div>
        </div>
        <div class="col-auto mb-3">
            <div class="card " style="width: 18rem; height:20rem;">
                <div class="card-body overflow-scroll">
                  <h5 class="card-title">Private Key:</h5>   {{privatekey}}
                    
                </div>
            </div>
        </div>
         <div class="col-auto mb-3">
            <div class="card " style="width: 18rem; height:20rem;">
                <div class="card-body overflow-scroll">
                     <p class="decode-result">Decrypted Text: <b>{{ result }}</b></p>

    <p v-if="error !== null" class="drop-error">
      {{ error }}
    </p>
                    
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.color {
  background-color: #ffff;
}

</style>
<script>
let datatest;
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue3-qrcode-reader'
import axios from 'axios';
 import QrcodeVue from 'qrcode.vue'
export default {

  components: { QrcodeDropZone,QrcodeVue, },
 data() {
      return {
        plainenc:'',
        publickey:'',
        value: '',
        datatest:'',
        qrVal:'',
        buffer: {},
        size: 180,
         result: null,
         privatekey: null,
      error: null,
      dragover: false,
         form: {
                name: '',
              
            }
      }
    },
   
  created() {
  },
  methods: {
    
    create() {
     console.log(this.value)
      axios.post(`http://localhost:8000/QRcode`,   this.value
    
      )
    .then(response => {
      // JSON responses are automatically parsed.
      console.log(response.data);
      this.publickey = response.data[0]
      this.plainenc = response.data[1]
      this.qrVal = response.data[1]
     this.datatest = response.data[2]
    })
    },

    async onDetect (promise) {
      console.log(this.datatest)
      try {
        const { content } = await promise
 const testing = await this.datatest
 console.log(testing)

        
        axios.post(`http://localhost:8000/decrypt`, testing
  

    
      )
    .then(response => {
    
      // JSON responses are automatically parsed.
      console.log(response.data)
      console.log("tester")
      this.result = response.data[0]
     
      this. privatekey = response.data[1]
     
    })
        this.error = null
      } catch (error) {
        if (error.name === 'DropImageFetchError') {
          this.error = 'Sorry, you can\'t load cross-origin images :/'
        } else if (error.name === 'DropImageDecodeError') {
          this.error = 'Ok, that\'s not an image. That can\'t be decoded.'
        } else {
          this.error = 'Ups, what kind of error is this?! ' + error.message
        }
      }
    },

    logErrors (promise) {
      promise.catch(console.error)
    },

    onDragOver (isDraggingOver) {
      this.dragover = isDraggingOver
    }
  }
  


}
</script>
