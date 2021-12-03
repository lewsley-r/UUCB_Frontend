<template>
  <div class="home">
    <img id="uuLogo" alt="UU logo" src="../assets/UU_logo.png">
    <h1 id="mainTitle">Computing Blogs</h1>
    <p id="mainBio">A central archive of Ulster University Computing Projects, related posts and more!</p>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
  }
}
</script>


<style>
#mainTitle{
  color: black;
  margin-top: 5vh;
  font-weight: 900;
}

#uuLogo{
  box-shadow: 0 0 40px 8px red inset;
}

</style>


