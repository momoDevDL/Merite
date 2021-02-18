<template>
  <div class="container">


    <div>
      <Logo />
      <h1 class="title">
        test
      </h1>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green">
          Documentation
        </a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" rel="noopener noreferrer" class="button--grey">
          GitHub
        </a>
        <nuxt-link to="/about">About</nuxt-link>
        <nuxt-link to="/token">About</nuxt-link>
      </div>
      <h1 v-if="$auth.loggedIn">Connecté {{$auth.user.username}} {{$auth.user.age}}</h1>
      <h1 v-else>Déconnecté</h1>
      <button @click="disconnect">Log out</button>
    </div>

    <button @click="testAPI">Test</button>
    <input type="text" name="token" v-model="tokenInput" id="">
    <nuxt-link :to="{ name: 'token', params: { token: tokenInput }}">Valid Token (stp)</nuxt-link> 
    <nuxt-link to="/home">Home</nuxt-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        textApi: "",
        tokenInput: ""
      }
    },
    methods: {
      async testAPI() {
        const data = await this.$axios.$get("/api/test")
        console.log(data);
      },
      async disconnect() {
        const data = await this.$auth.logout()
        this.$router.push("/login")
        console.log(data);
      }
    }

  }

</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family:
      'Quicksand',
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

</style>
