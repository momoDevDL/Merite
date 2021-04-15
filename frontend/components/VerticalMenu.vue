<template>
  <div class="vertical_menu_container">
    <div class="photo_name_container">
      <img src="../img/ellipse_1.png" class="photo" />
      <div class="name">{{ $auth.$storage.getUniversal("user").username }}</div>
    </div>
    <div class="menu_top_container">
      <ul>
        <li>
            <nuxt-link class="vertical-menu-link" to="/">Espace personnel</nuxt-link>
        </li>
        <li>
            <nuxt-link class="vertical-menu-link" to="/classes">Mes cours</nuxt-link>
        </li>
        <li>
            <nuxt-link class="vertical-menu-link" to="/">Mes notes</nuxt-link>
        </li>
        <li>
            <nuxt-link class="vertical-menu-link" to="/">Mon drive</nuxt-link>
        </li>
        <li>
            <nuxt-link class="vertical-menu-link" to="/">Mes e-mails</nuxt-link>
        </li>
        <li>
            <nuxt-link class="vertical-menu-link" to="/"> Services </nuxt-link>
        </li>
        <li>
            <nuxt-link class="vertical-menu-link" to="/">Support</nuxt-link>
        </li>
        <li>
            <nuxt-link class="vertical-menu-link bottom-bloc" to="/">Aide</nuxt-link>
        </li>
        <li>
            <nuxt-link class="vertical-menu-link" to="/">Paramètres</nuxt-link>
        </li>
        <li @click.stop.prevent="logout">
            <nuxt-link class="vertical-menu-link"  to="/">Deconnexion</nuxt-link>
        </li>
      </ul>
    </div>
   
    <!--<div class="copyright_merite" >
				Copyright <a href="http://Merite.com" target="_blank">Merite.com</a>
			</div> -->
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth
        .logout()
        .then(() => {
          this.$auth.$storage.removeUniversal("user");
          this.$cookies.remove("user");
          this.$cookies.remove("auth.user");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
      t;
    }
  }
};
</script>

<style lang="scss" scoped>
.name {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  justify-content: space-between;
}

.vertical_menu_container {
  width: 220px;
  position: relative;
  background: white;
  overflow: hidden;
}

.name {
  font-size: 18px;
  text-align: center;
  line-height: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  margin-top: 5%;
}

.photo_name_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 20%;
  position: relative;
}

.menu_top_container {
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.menu_buttom_container {
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.copyright_merite {
  align-items: center;
  margin-left: 30px;
  font-size: 12px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: gray;
}

ul {
  list-style: none;
}
a {
  text-decoration: none;
}

.vertical-menu-link {
  display: flex;
  font-weight: 600;
  color: #215fff;
  padding: 12px;
  padding-left: 30px;
  width: 200% !important;
  border-top-left-radius: 80px;
  border-bottom-left-radius: 80px;
  transition: .4s;

  &:hover {
    background-color: #f0f8ff;
  }

  &.bottom-bloc {
    margin-top: 100px;
  }
}
/* ul li:hover a{
    
    background-color: #f0f8ff;
  }

  ul li a {
    color: #215fff;
    display: block;
    padding: 12px;
    padding-left: 20;
    border-radius: 57px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    transition: .4s;
  }
<<<<<<< HEAD
  
  .personnal_space {
    width: 200px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 18px;
    text-align: left;
    line-height: 18px;
    color: #215fff;
  }

  .support , .services, .my_mails, .my_drive, .my_grades, .my_classes, .help, .params, .sing_out{
	  width: 181px;
	  font-size: 18px;
	  text-align: left;
	  line-height: 18px;
    color:#215FFF;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
  }
=======
   */
.personnal_space {
  width: 200px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  text-align: left;
  line-height: 18px;
  color: #215fff;
}
>>>>>>> corentin-dev

.support,
.services,
.my_mails,
.my_drive,
.my_grades,
.my_classes,
.help,
.params,
.sing_out {
  width: 181px;
  font-size: 18px;
  text-align: left;
  line-height: 18px;
  color: #215fff;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}

.photo {
  width: 111px;
  height: 104px;
}
</style>
