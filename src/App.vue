<template>
  <div id="app">
    <div id="nav">
      <div v-if="!$auth.loading">
        <b-button-group id="btnGroup">
          <b-button id="buttons" to="/home">
            Home
          </b-button>
          <b-button id="buttons" to="/about" v-if="$auth.isAuthenticated">
            About
          </b-button>
          <b-button id="buttons"  to="/profile" v-if="$auth.user">
            {{ $auth.user.nickname }}
          </b-button>
          <b-button id="buttons"  to="/selectedProfile" v-if="$auth.user">
            User
          </b-button>
          <b-button id="buttons" @click="loginPopup" v-if="!$auth.isAuthenticated">
            Login
          </b-button>
          <b-button id="buttons" @click="logout" v-if="$auth.isAuthenticated">
            Logout
          </b-button>
          <b-form-input  id="searchField" v-model="searchContent" placeholder="Search users ..."></b-form-input>
          <b-button id="searchBtn">
            <b-icon icon="search" scale ="1" variant="primary"></b-icon>
          </b-button>
        </b-button-group>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return{
      searchContent: null
    }
  },
  methods: { 
    loginPopup() { 
      this.$auth.loginWithPopup(); 
    }, 
    logout() { 
      this.$auth.logout(); 
      this.$router.push({ path: '/home' }); 
    }
  }

}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Ubuntu:wght@500&display=swap');

#app {
  font-family: 'Comfortaa', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(white,#009FDF);
  background-color: #009FDF;
  height: 100vh;
}

#nav {
  display: flex; 
  justify-content: center; 
  padding: 30px;


}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: white;
  background-color: black;
}

#buttons{
  border: white solid 5px;
  border-radius: 2em;
  background-color: #009FDF;
  color: black;
}

#btnGroup{
  width: 100vw;

}

#searchField{
  margin-left: 2vw;
  width: 20vw;
  border-radius: 2em;

}

#searchBtn{
  background-color: white;
  width: 1vw;
  margin-left: 0.5vw;
  border-radius: 2em;

}

 ::-moz-selection { /* Code for Firefox */
  color: red;
  background: yellow;
}

::selection {
  color: red;
  background: yellow;
}
</style>
