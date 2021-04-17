<template>
  <div>
    <div class="user-cards">
      <nuxt-link to="/admin/utilisateurs/ajouterUtilisateur" class="card">Ajouter un utilisateur</nuxt-link>
      <nuxt-link to="/admin/utilisateurs/modifierUtilisateur" class="card">Modifier un utilisateur</nuxt-link>
    </div>

    <nuxt-child/>
  </div>
</template>

<script>
  export default {
    layout: 'dashboardAdmin'
  }

</script>

<style lang="scss">
  .user-cards {
    display: flex;
    margin-bottom: 100px;
  }

  .card {
    background: #2818FC;
    color: white;
    font-weight: 600;
    padding: 15px 30px;
    margin-right: 30px;
    font-size: 1.3em;
    border-radius: 10px;
    text-transform: none;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    transition: .3s;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      position: absolute;
      content: '';
      height: 200px;
      width: 200px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.103);
      right: -100px;
      top: -15px;
      transition: .5s ease;
    }

    &::after {
      transition: .8s ease;
      position: absolute;
      content: '';
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.103);
      right: -50px;
      top: 20px;
    }

    &:hover {
      &::before {
        height: 500px;
        width: 500px;
        right: -70px;
        top: -75px;
      }

      &::after {
        height: 500px;
        width: 500px;
        right: -270px;
        top: -75px;
      }

      transform: scale(.99);
      box-shadow: 0 3px 15px rgba(39, 24, 251, 0.3);
    }
  }

  @media screen and (max-width : 515px) {
     .card {
       font-size: 1em;
       padding: 10px 20px;
     }
  }


</style>
