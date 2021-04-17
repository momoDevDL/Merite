<template>
  <div>
      <no-ssr>
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
          <h1>Merite administation</h1>
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
            <h2>
              Content de vous <span class="accentuated-word">revoir</span>
            </h2>
            <p v-if="errorIdentifiant" class="warning-message-login">
              L'indentifiant ou le mot de passe que vous avez rentré est
              incorrect. Rééssayez.
            </p>
            <div class="input-container">
              <input
                type="text"
                v-model="form.username"
                class="login-form-input"
                placeholder="Nom d'utilisateur"
              />
            </div>

            <div class="input-container">
              <input
                type="password"
                v-model="form.password"
                class="login-form-input"
                placeholder="Mot de passe"
              />
            </div>
            <div class="mdpoublie">
              <div class="stay-connect">
                <input type="checkbox" name="stay-connect" id="" /><label for="stay-connect">Rester connecté ? </label>
              </div>
              <nuxt-link class="mdpstyle" to="/">mot de passe oublié ?</nuxt-link>
            </div>
            <button id="login-connexion">Connexion</button>
          </form>
        </div>
        <div class="login-content">
          <img
            id="login-content-illustration"
            src="~/assets/login/work.svg"
            alt="illustration"
          />
        </div>
      </div>
      <div class="login-footer">
        <p class="login-copyright">© Copyright Merite.com</p>
      </div>
    </div>
    </no-ssr>
  </div>
</template>

<script>
import Burger from "~/components/Burger.vue";
import Sidebar from "~/components/Sidebar.vue";

export default {
  auth: false,
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
        username: "",
        password: ""
      },
      errorIdentifiant: false
    };
  },
  created() {
    if (process.client) {
      window.addEventListener("resize", this.winResize);
      this.window.width = window.innerWidth;
      console.log();
      if (!this.$cookies.get("acceptedCookie")) {
        this.$toast.show(
          "Ce site web utilise des cookies pour enrichir votre experience.",
          {
            position: "bottom-center",
            action: [
              {
                text: "Informations",
                onClick: (e, toastObject) => {
                  this.$router.push("/cookieInfo");
                  toastObject.goAway(0);
                }
              },
              {
                text: "OK",
                onClick: (e, toastObject) => {
                  this.$cookies.set("acceptedCookie", true, {
                    path: "/",
                    maxAge: 60 * 60
                  });
                  toastObject.goAway(0);
                }
              }
            ]
          }
        );
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
      try {
        let connexion = await this.$auth.loginWith("admin", {
          data: this.form
        });
        this.$toast.success("Vous êtes connecté !", {
          theme: "toasted-primary",
          position: "bottom-center",
          duration: 1000
        });

        let user = await this.$axios.get(`/user/${this.form.username}`);
        this.$auth.setUser(user.data);
        // this.$auth.$storage.setUniversal("user", user.data, true);
        // this.$cookies.set("user", user.data);
        console.log(this.$auth.user);
        this.$store.commit("setLoading", true);
        this.$router.push('/admin');
      } catch (err) {
        this.$toast.error(
          "Le nom d'utilisateur ou le mot de passe est incorrect",
          {
            theme: "toasted-primary",
            position: "bottom-center",
            duration: 1000
          }
        );
      }
    },
    winResize(e) {
      if (process.client) {
        this.window.width = window.innerWidth;
      }
    },
    showUser() {
      console.log(this.$auth.user);
    }
  }
};
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
  font-size: 0.8em;
}

ul.sidebar-panel-nav > li > a {
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
    background-color: #00a8ff;
    opacity: 0.19;
    width: 50vw;
    height: 100vh;
  }

  .right {
    background-color: #fff;
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

@media screen and (max-width: 660px) {
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
  font-family: "Poppins";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 100px;
  transition: 0.3s;

  .login-title {
    font-family: "Montserrat";
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
  transition: 0.3s;

  &:hover {
    color: #00a8ff;
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
  transition: 0.2s;

  &::after {
    content: "";
    position: absolute;
    height: 4px;
    width: 20px;
    right: 0;
    background-color: #000;
    transform: translateY(10px);
  }

  &::before {
    content: "";
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
    font-family: "Poppins";
    font-weight: 600;
    height: 30px;
    width: 100%;
    background: #ffffff;
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
  transition: 0.3s;
  height: 500px;
}

.login-content {
  transition: 0.3s;
}

@media screen and (max-width: 1400px) {
  #login-content-illustration {
    display: none;
  }

  .left {
    display: none;
  }

  .login-body {
    justify-content: center;
  }
}

@media screen and (max-width: 620px) {
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
  font-size: 0.7em;

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
  transition: 0.3s;

  &:hover {
    transform: scale(0.97);
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
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.mdpstyle {
  text-decoration: none;
}

.login-form-input {
  margin: 20px 0px !important;
  margin-right: 10px !important;
}
</style>
