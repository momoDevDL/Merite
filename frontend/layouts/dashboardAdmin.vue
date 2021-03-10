<template>
  <div class="dashboard">

    <div :class="{active : sidebar}" @click="sidebar = false" class="fond-dashboard"></div>

    <div :class="{openned : sidebar }" class="sidebar">
      <div class="sidebar-title">
        <p>Mérite</p>
      </div>

      <div class="sidebar-menu ">
        <nuxt-link :class="{active : this.$route.path == '/admin/'}" @click.native="changeSelectedLink" num="1" to="/admin/"
          class="sidebar-item">
          <home-icone number="1" :active="current" />
          <p num="1" class="sidebar-item-link">Acceuil</p>
        </nuxt-link>
        <nuxt-link :class="{active : this.$route.path.includes('/admin/utilisateurs')}" @click.native="changeSelectedLink" num="2" to="/admin/utilisateurs"
          class="sidebar-item">
          <user-icone number="2" :active="current" />
          <p num="2" class="sidebar-item-link">Utilisateurs</p>
        </nuxt-link>
        <nuxt-link :class="{active : current == 3}" @click.native="changeSelectedLink" num="3" to="/admin/"
          class="sidebar-item">
          <chart-icone number="3" :active="current" />
          <p num="3" class="sidebar-item-link">Statistiques</p>
        </nuxt-link>


      </div>

      <div class="sidebar-bottom">
        <nuxt-link :class="{active : current == 4}" @click.native="changeSelectedLink" num="4" to="/" class="sidebar-item">
          <settings-icone number="4" :active="current" />
          <p num="4" class="sidebar-item-link">Options</p>
        </nuxt-link>
        <nuxt-link :class="{active : current == 5}" @click.native="changeSelectedLink" num="5" to="/" class="sidebar-item">
          <phone-icone number="5" :active="current" />
          <p num="4" class="sidebar-item-link">Contact</p>
        </nuxt-link>

      </div>

    </div>
    <div :class="{openned : sidebar }" class="navbar-dashboard">
      <div class="navbar-dashboard-left">
        <div @click="sidebar = !sidebar" class="hamb-dashboard">
          <hamburger-logo />

        </div>
        <div class="dashboard-nav-icon">
         <search-icone/>
        </div>
        <div class="dashboard-nav-icon mail-icone">
          <mail-icone :notification="notif"/>
        </div>
        <div class="hello-dashboard">
          <h1 v-if="$route.path == '/admin/'" class="dashboard-title">Gérez le <span class="dashboard-title-accent">site</span></h1>
          <h1 v-if="$route.path == '/admin/utilisateurs'" class="dashboard-title">Gérez vos <span class="dashboard-title-accent">utilisateurs</span></h1>
          <h1 v-if="$route.path == '/admin/utilisateurs/ajouterUtilisateur'"  class="dashboard-title">Ajouter un <span class="dashboard-title-accent">utilisateur</span></h1>
          <h1 v-if="$route.path == '/admin/utilisateurs/modifierUtilisateur'"  class="dashboard-title">Modifier un <span class="dashboard-title-accent">utilisateur</span></h1>
        </div>
      </div>
      <div class="navbar-dashboard-right">
        <button class="btn-deco-dashboard">Déconnexion</button>
      </div>
    </div>
    <Nuxt :class="{openned : sidebar }" class="nuxt" />

  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: 1,
        sidebar: false,
        notif : true
      }
    },
    head() {
      return {
        title : 'Admin'
      }
    },
    methods: {
      changeSelectedLink(e) {
        this.current = parseInt(e.target.getAttribute("num"))
        console.log(this.$route.path == '/admin/utilisateurs');
      }
    }
  }

</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins';
  }

  .dashboard {
    background: #F2F5FA;
    min-height: 100vh;
  }

  .dashboard-title {
      font-weight: 600;
    .dashboard-title-accent {
      color: #7268ff;
    }
  }



  .nuxt {
    width: calc(100% - 250px);
    margin-left: 250px;
    padding-left: 50px;
  }

  .fond-dashboard {
    z-index: 1;
    background: #0000002d;
    position: fixed;
    width: 100vw;
    height: 100vh;
    transition: .3s;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;

    &.active {
      display: flex;
      opacity: .8;
      pointer-events: all;
    }
  }

  .navbar-dashboard {
    width: calc(100%-250px) 100%;
    height: 150px;
    margin-left: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;

    .navbar-dashboard-left {
      display: flex;
    }

    .dashboard-nav-icon {
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
      border-radius: 5px;
      width: 50px;
      height: 50px;
      margin-right: 50px;
      cursor: pointer;
      transition: .2s;

      &:hover {
        // box-shadow: none;
        background-color: #f9f9ff;
      }
    }

    .hamb-dashboard {
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
      border-radius: 5px;
      width: 50px;
      height: 50px;
      margin-right: 20px;
      display: none;
      transform: translateX(-100px);
      cursor: pointer;
      transition: .2s;

      &:hover {
        // box-shadow: none;
        background-color: #f9f9ff;
      }
    }

    .btn-deco-dashboard {

      cursor: pointer;
      background-color: #2818fc;
      height: 50px;
      color: #fff;
      font-weight: 600;
      padding: 0 30px;
      border-radius: 8px;
      border: none;
      box-shadow: 0px 4px 15px rgba(39, 24, 252, .3);
      transition: .3s;

      &:hover {
        box-shadow: 0px 4px 4px rgba(39, 24, 252, .3);
        transform: scale(.99);
      }
    }
  }

  .mail-icone {
      margin-left: -25px;
  }

  .sidebar {
    z-index: 100;
    background: #fff;
    transition: .3s;
    position: fixed;
    height: 100vh;
    left: 0;
    width: 250px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 50px;

    .sidebar-title {
        align-self: flex-start;
      margin-top: 50px;
      margin-left: 50px;
      font-weight: 600 !important;
      font-size: 2em;
    }

    &.openned {
      left: 0 !important;
    }


    .circle {
      height: 12px;
      width: 12px;
      border: #AAA solid 1px;
      border-radius: 50%;
    }

    .sidebar-item-link {
      color: #AAA;
      font-weight: 600;
      padding-left: 20px;
    }

  }

  .sidebar-bottom {
    text-decoration: none;
    border-top: 1px solid rgba(0, 0, 0, 0.13);

  }



  .sidebar-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    transition: .3s;


    &.active {
      background-color: #2818FC;

      .sidebar-item-link {
        color: #fff;
      }

      &:hover {
        background: #2818FC;
        transform: scale(.99);
      }

      .circle {
        background-color: #2818FC;
        border: none;
      }
    }

    margin: 15px;
    padding: 10px;
    padding-left: 15px;
    width: 200px;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background: #2718fc10;
      transform: scale(.99);
    }

  }

  @media screen and (max-width : 900px) {
    .sidebar {
      left: -250px;

      &.openned {
        left: 0;
      }
    }

    .nuxt {
      transition: .3s;
      width: 100%;
      margin-left: 0;

      &.openned {
        margin-left: 250px;
        width: 1000px
      }
    }

    .navbar-dashboard {
      transition: .3s;
      width: 100%;
      margin-left: 0;

      &.openned {
        margin-left: 250px;
        width: 1000px
      }
    }

    .hamb-dashboard {
      display: flex !important;
      transform: translate(0) !important;
      z-index: 100;
      background: #fff;
    }

    .hello-dashboard {

      font-size: .8rem;
    }


  }

  .hello-dashboard {
    transition: .3s;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width : 670px) {
    .hello-dashboard {
      display: none;
    }
  }

  @media screen and (max-width : 500px) {
    .navbar-dashboard {
      margin: 0;
    }

    .navbar-dashboard .hamb-dashboard {
      margin-right: 10px;

    }

    .navbar-dashboard .dashboard-nav-icon {
      display: none;
    }

    .navbar-dashboard {
      padding: 0 20px;
      height: 100px;
    }

    .sidebar .sidebar-title {
      margin-top: 20px;
    }

    .nuxt {
      padding: 20px;
    }

  }

</style>
