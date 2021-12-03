<template>
  <div>
    <div id="mainProfileBlock" class="row align-items-center profile-header">
      <!-- alert for upload -->
      <b-alert
        id="fileSuccess"
        :show="dismissCountDown"
        variant="primary"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
        >
        <p>{{ alertContent }}</p>
        <b-progress
            variant="success"
            :max="dismissSecs"
            :value="dismissCountDown"
            height="4px"
        ></b-progress>
      </b-alert>

      <h2 id="username">{{ $auth.user.nickname }}</h2>
      <div>
        <img
          id="profilePic"
          :src="$auth.user.picture"
          alt="User's profile picture"
          class="rounded-circle img-fluid profile-picture"
        />
        <!-- Change Profile Picture -->
        <b-modal id="modal-1" title="Change Profile Picture">
            <b-form-input v-model="pictureUrl" placeholder="Enter Profile Picture URL"></b-form-input>
            <b-button id="submitPicBtn" variant="primary" v-on:click="sendNewPicUrl()">Submit</b-button>
        </b-modal>
        
        <!-- Upload a video -->
        <b-modal id="modal-2" title="Video File Upload">
            <div id="uploadArea">
                <b-form-file
                accept="video/*"
                id="fileDrop"
                v-model="file1"
                :state="Boolean(file1)"
                ></b-form-file>
                <b-button id="submitBtn" variant="primary" v-on:click="submitFile()">Submit</b-button>
            </div>
        </b-modal>
        
        <b-button variant= "primary" v-b-modal.modal-1 id="uploadPicBtn">Change Profile Picture</b-button>
        <b-button variant= "primary" v-b-modal.modal-2 id="uploadVidBtn">Upload a video</b-button>
        <b-form-textarea
            id="textarea"
            v-model="postContent"
            placeholder="Enter your post..."
            rows="6"
            max-rows="12"
        >
        </b-form-textarea>
        <b-button id="submitPostBtn" variant="primary" v-on:click="submitPost()">Submit Post</b-button>
      </div>
      
      
    
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            file1: null,
            dismissSecs: 10,
            dismissCountDown: 0,
            alertContent: null,
            alertVariant: "primary",
            pictureUrl: null,
            postContent: null
        }
    },
    methods: {
        submitFile(){
            if (this.file1 != null){
                let formData = new FormData();
                formData.append('file', this.file1);
                axios.post( '/api/uploadFile',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then(this.showAlert.bind(this))
                .catch(this.showFailure.bind(this));
            }
        },
        submitPost(){
             if (this.postContent != null){
                axios.post( '/api/uploadPost',
                this.postContent
                ).then(this.showPostAlert.bind(this))
                .catch(this.showFailure.bind(this));
            }
        },
        sendNewPicUrl(){
            var requestUrl = "https:dev--9mousft.us.auth0.com/api/v2/users/" + this.$auth.user.nickname
            axios.patch(requestUrl, )
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.alertContent = "File uploaded successfully."
            this.file1 = null
            this.dismissCountDown = this.dismissSecs
        },
        showPostAlert() {
            this.alertContent = "Post uploaded successfully."
            this.postContent = null
            this.dismissCountDown = this.dismissSecs
        },
        showFailure() {
            this.alertContent = "Something went wrong, upload failed."
            this.alertVariant = "danger"
            this.dismissCountDown = this.dismissSecs
        }
    },
    computed: {
    },
}
</script>

<style>
#submitBtn{
    width: 8vw;
    float: right;
    margin-top: -4vh;
}
#submitPostBtn{
    width: 60%;
    margin-left: 10vw;
    margin-top: 1vh;
}

#submitPicBtn{
    width: 8vw;
    margin-top: 2vh;
    float: right;
}

#uploadArea{
    border-radius: 1em;
    padding: 2vh;
    width: 33vw;
}

#fileDrop{
    background-color: #009FDF;
}

#fileSuccess{
    width: 12vw;
    height: 12vh;
    position: absolute;
    right: 2vw;
    top: 1vh;
}

#mainProfileBlock{
    background-color: #009FDF;
    height: 70vh;
    width: 85vw;
    margin-left: 12.5vw;
    border-radius: 1em;
}

#profilePic {
    margin-bottom: 40vh;
    margin-left: 3vw;
    height: 25vh;
    float: left;
}

#username{
    margin-top: 2vh;
}

#uploadPicBtn{
    position: absolute;
    margin-top: 36vh;
    margin-left: -46vw;
}

#uploadVidBtn{
    position: absolute;
    margin-top: 28vh;
    margin-left: -46vw;
}

#modal2{
    width: 50vw;
}

#textarea{
    width: 60%;
    margin-left: 30vw;
    margin-top: 5vh;
}

label{
    display: none;
}
</style>