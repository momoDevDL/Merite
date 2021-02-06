<template>
  <div>
    <Sidebar v-if="window.width < 660">
      <ul class="sidebar-panel-nav">
        <li>
          <nuxt-link class="item" to="/about">à propos</nuxt-link>
        </li>
        <li>
          <nuxt-link class="item" to="/">besoin d'aide ?</nuxt-link>
        </li>
      </ul>
    </Sidebar>

    <div class="login-background">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="login-container">
      <div class="nav-login">
        <div class="login-title">
          <h1>Merite</h1>
        </div>

        <div v-if="window.width > 660" class="items">
          <nuxt-link class="item" to="/about">à propos</nuxt-link>
          <nuxt-link class="item" to="/">besoin d'aide ?</nuxt-link>
        </div>
        <Burger v-else></Burger>

      </div>

      <div class="login-body">
        <div class="login-form-container">
          <form ref="connect_form" @submit.prevent="connect" class="login-form">
            <h2>Content de vous <span class="accentuated-word">revoir</span></h2>
            <p v-if="errorIdentifiant" class="warning-message-login">L'indentifiant ou le mot de passe que vous avez rentré est incorrect. Rééssayez.</p>
            <div class="input-container"><input type="text" v-model="form.username" class="login-form-input" placeholder="Nom d'utilisateur"><svg id="info-login" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C15.523 0 20 4.478 20 10C20 15.522 15.523 20 10 20C4.477 20 0 15.522 0 10C0 4.478 4.477 0 10 0ZM10 1.667C5.405 1.667 1.667 5.405 1.667 10C1.667 14.595 5.405 18.333 10 18.333C14.595 18.333 18.333 14.595 18.333 10C18.333 5.405 14.595 1.667 10 1.667ZM10 13.5C10.5523 13.5 11 13.9477 11 14.5C11 15.0523 10.5523 15.5 10 15.5C9.4477 15.5 9 15.0523 9 14.5C9 13.9477 9.4477 13.5 10 13.5ZM10 4.75C11.5188 4.75 12.75 5.98122 12.75 7.5C12.75 8.5108 12.4525 9.074 11.6989 9.8586L11.5303 10.0303C10.9084 10.6522 10.75 10.9163 10.75 11.5C10.75 11.9142 10.4142 12.25 10 12.25C9.5858 12.25 9.25 11.9142 9.25 11.5C9.25 10.4892 9.5475 9.926 10.3011 9.1414L10.4697 8.9697C11.0916 8.3478 11.25 8.0837 11.25 7.5C11.25 6.80964 10.6904 6.25 10 6.25C9.3528 6.25 8.8205 6.74187 8.7565 7.37219L8.75 7.5C8.75 7.91421 8.4142 8.25 8 8.25C7.58579 8.25 7.25 7.91421 7.25 7.5C7.25 5.98122 8.4812 4.75 10 4.75Z" fill="#212121" fill-opacity="0.09"/>
</svg></div>

            <div class="input-container"><input type="password" v-model="form.password" class="login-form-input" placeholder="Mot de passe"></div>
            <div class="mdpoublie">
              <div class="stay-connect">
                <input type="checkbox" name="stay-connect" id=""><label for="stay-connect">Rester connecté ?</label>
              </div>
              <nuxt-link class="mdpstyle" to="/">mot de passe oublié ?</nuxt-link>
            </div>
            <button id="login-connexion">Connexion</button>
          </form>
        </div>
        <div class="login-content">
          <img id="login-content-illustration" src="~/assets/login/login-illustration.png" alt="illustration">
        </div>
      </div>
      <div class="login-footer">
        <p class="login-copyright">© Copyright Merite.com</p>
      </div>
    </div>

  </div>
</template>

<script>
  import Burger from '~/components/Burger.vue';
  import Sidebar from '~/components/Sidebar.vue';

  export default {
    components: {
      Burger,
      Sidebar
    },
    data() {
      return {
        window: {
          height: 0,
          width: 0
        },
        form: {
          username: 'jeremie',
          password: 'bonjour'
        },
        errorIdentifiant : false
      }
    },
    created() {
      if (process.client) {
        window.addEventListener("resize", this.winResize);
        this.window.width = window.innerWidth
        console.log();
        if (!this.$cookies.get("acceptedCookie")) {
          this.$toast.show("Ce site web utilise des cookies pour enrichir votre experience.", {
            position: "bottom-center",
            action: [{
              text: 'Cookies?',
              onClick: (e, toastObject) => {
                this.$router.push("/cookieInfo")
                toastObject.goAway(0);
              }
            },{
              text: 'OK',
              onClick: (e, toastObject) => {
                this.$cookies.set("acceptedCookie", true, {
                  path: '/',
                  maxAge: 60 * 60
                })
                toastObject.goAway(0);
              }
            } ]
          })
        }

      }
    },
    destroyed() {
      if (process.client) {
        window.removeEventListener("resize", this.winResize);

      }
    },
    methods: {
      async connect() {
        this.$auth.loginWith('local', {
          data: this.form
        }).then(() => {
          this.$toast.success('Vous êtes connecté !', {
            theme: "toasted-primary",
            position: "bottom-center",
            duration: 1000
          })
          this.$router.push('/')
        }).catch((err)=>{
          this.errorIdentifiant = true
        })
      },
      winResize(e) {
        if (process.client) {

          this.window.width = window.innerWidth
        }
      },
      showUser() {
        console.log(this.$auth.user);
      }
    }
  }

</script>

<style lang="scss">
  ul.sidebar-panel-nav {
    list-style-type: none;
  }

  .input-container {
    width: 100%;
    position: relative;
  }

  #info-login {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

  }

  .warning-message-login {
    max-width: 400px;
    color: #fb3a3a;
    font-size: .8em;
  }

  ul.sidebar-panel-nav>li>a {
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    padding-bottom: 0.5em;
  }

  .login-background {
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .left {
      background-color: #fff;
      width: 50vw;
      height: 100vh;
    }

    .right {
      background-color: #00A8FF;
      opacity: 0.19;
      width: 50vw;
      height: 100vh;
    }
  }

  .login-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media screen and (max-width : 660px) {
    .nav-login {
      padding: 0 20px !important;
    }

    .mdpoublie {
      flex-direction: column;

      .stay-connect {
        margin: 0 10px;
      }
    }
  }

  .nav-login {
    font-family: 'Poppins';
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 100px;
    transition: .3s;



    .login-title {
      font-family: 'Montserrat';
      text-transform: uppercase;
      font-weight: bold;
    }

    .items {
      font-weight: 600;
    }
  }

  .item {
    margin: 0 20px;
    text-decoration: none;
    color: #000;
    transition: .3s;

    &:hover {
      color: #00A8FF;
    }
  }

  .hamburger-menu {
    cursor: pointer;
  }

  .middle.close {
    &::after {
      display: block;
      transform: rotateZ(45deg);
      width: 40px;
      opacity: 1;
    }

    &::before {
      display: block;
      transform: rotateZ(-45deg);
      width: 40px;
      opacity: 1;
    }

    height: 0;
    width: 0;
  }


  .dropdown-hamb {
    position: absolute;
    top: 0;
    background: #f9f7ff;
    width: 100vw;
    height: 100px;
    left: 0;
    top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .item {
      text-decoration: none;
      margin: 5px;
    }
  }

  .middle {
    height: 4px;
    width: 30px;
    background-color: #000;
    position: relative;
    display: block;
    transition: .2s;

    &::after {
      content: '';
      position: absolute;
      height: 4px;
      width: 20px;
      right: 0;
      background-color: #000;
      transform: translateY(10px);
    }

    &::before {
      content: '';
      position: absolute;
      height: 4px;
      width: 40px;
      right: 0;
      background-color: #000;
      transform: translateY(-10px);
    }
  }

  .login-body {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .login-form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
    }

  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;

    h2 {
      padding-bottom: 50px;
    }


    .login-form-input {
      border: none;
      font-family: 'Poppins';
      font-weight: 600;
      height: 30px;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0px 4px 7px -1px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      margin: 20px 10px;
      padding: 25px 20px;

      &:focus,
      &:active {
        border: none;
        outline: none;
      }
    }
  }

  #login-content-illustration {
    transform: translateX(-100px);
    transition: .3s;
  }

  .login-content {
    transition: .3s;
  }

  @media screen and (max-width : 1400px) {
    #login-content-illustration {
      display: none;
    }

    .right {
      display: none;
    }

    .login-body {
      justify-content: center;
    }
  }

  @media screen and (max-width : 620px) {

    .login-body .login-form-container {
      width: 65%;
    }
  }

  .mdpoublie {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: 20px;
    font-size: .7em;

    .stay-connect {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      label {
        padding-left: 10px;
      }
    }
  }

  .accentuated-word {
    color: #130f40;
  }

  #login-connexion {
    color: #fff;
    width: 100%;
    border: none;
    background: #130f40;
    box-shadow: 0px 4px 7px -1px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    font-weight: 600;
    font-size: 1.3em;
    margin-top: 40px;
    height: 56px;
    cursor: pointer;
    transition: .3s;

    &:hover {
      transform: scale(.97);
      background: #130f40de;

    }
  }

  .login-footer {
    height: 50px;
    margin-top: 50px;
  }

  .login-copyright {
    text-align: center;
    font-weight: 600;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }

  .mdpstyle {
    text-decoration: none;
  }

</style>
