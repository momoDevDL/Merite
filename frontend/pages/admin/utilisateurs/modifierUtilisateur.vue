<template>
  <v-app class="admin-pages">
    <div class="header-dashboard-page">
      <p class="dashboard-page-title">Veuillez remplir les champs</p>
      <!-- <nuxt-link class="dashboard-page-title-link" to="/admin/utilisateurs">Retour <span class="arrow">></span> 
      </nuxt-link>-->
    </div>

    <v-divider class="divider"></v-divider>
    <div class="add-user-body">
      <form class="form-add-user">
        <p class="title-form">Rôle</p>
        <v-divider class="divider-form"></v-divider>
        <v-select @change="verifyForm" outlined v-model="user.role" :items="roles" label="Rôle"></v-select>
        <p class="title-form">Etat civil</p>
        <v-divider class="divider-form"></v-divider>
        <div class="genreName">
          <v-select @change="verifyForm" id="genre" outlined v-model="user.genre" :items="genres" label="Genre">
          </v-select>
          <v-text-field @keydown="verifyForm" counter="30" :rules="ruleNom" required class="form-name-addUser"
            v-model="user.nom" outlined label="Nom" placeholder="Durand" />
        </div>
        <v-text-field @keydown="verifyForm" :rules="ruleNom" counter="30" v-model="user.prenom" outlined label="Prénom"
          placeholder="Philippe" />
        <v-text-field @keydown="verifyForm" :rules="ruleEmail" type='email' v-model="user.email" outlined label="Email"
          placeholder="xxx@xxx.com" />

        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field required v-model="user.birthday" label="Date de naissance" readonly v-bind="attrs" v-on="on"
              outlined>
            </v-text-field>
          </template>
          <v-date-picker @change="verifyForm" v-model="user.birthday" @input="menu2 = false"></v-date-picker>
        </v-menu>

        <div v-if="user.role == 'Etudiant'" class="student-form">
          <p class="title-form">Informations étudiant</p>
          <v-divider class="divider-form"></v-divider>
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="N° Etudiant"
            placeholder="20212596Y" />
          <v-select @change="verifyForm" outlined v-model="user.formation" :items="mergeWithNewData" label="Formation">
          </v-select>
        </div>

        <div v-if="user.role == 'Administrateur'" class="student-form">
          <p class="title-form">Informations administrateurs</p>
          <v-divider class="divider-form"></v-divider>
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-text-field @keydown="verifyForm" v-model="user.numEtudiant" outlined label="Admin test" placeholder="20212596Y" />
          <v-select @change="verifyForm" outlined v-model="user.formation" :items="mergeWithNewData" label="Formation">
          </v-select>
        </div>

        <v-btn :disabled="!formValidate" @click.prevent="createUser" elevation="2" class="validate-add-user">Créer l'utilisateur
        </v-btn>
      </form>

      <div class="add-user-card-box">
        <div class="add-user-card">
          <div :class="{active : formValidate}" class="check-add-user-card">
            <check-icone></check-icone>
          </div>
          <avatar-homme v-if="user.genre == 'Mr'" class="avatar-add-user" />
          <avatar-femme v-else-if="user.genre == 'Mme'" class="avatar-add-user" />
          <avatar-femme v-else-if="!user.genre" class="avatar-add-user prefill" />
          <p class="name-card-addUser"><span v-if="user.genre && user.genre != 'Autre'">{{user.genre}}</span> <span
              v-else-if="user.genre == 'Autre'">Mx</span> <span class="prefill" v-else-if="!user.genre">Mme</span> <span
              v-if="user.nom">{{ user.nom}}</span><span class="prefill" v-else>Durand</span> <span
              v-if="user.prenom">{{ user.prenom}}</span><span class="prefill" v-else>Coralie</span></p>
          <p :class="{prefill : !user.role}" class="role-card"><span v-if="user.role">{{user.role}}<span
                v-if="user.role == 'Etudiant' && user.genre == 'Mme'">e</span></span><span v-else>Professeur</span></p>
          <p>E-mail : <span class="card-user-filled" v-if="user.email">{{user.email}}</span><span v-else
              class="prefill">coralie.durand@etud.fr</span></p>
          <p>Née le <span class="card-user-filled" v-if="user.birthday"> {{user.birthday}} </span><span class="prefill"
              v-else>1970-01-01</span></p>
          <div v-if="user.role == 'Etudiant'" class="bloc-etudiant">
            <p>Numéro étudiant : <span class="card-user-filled" v-if="user.numEtudiant">{{user.numEtudiant}}</span><span
                v-else class="prefill">20212596Y</span></p>
            <p>Formation : <span class="card-user-filled" v-if="user.formation">{{user.formation}}</span><span v-else
                class="prefill">IHM</span></p>
          </div>

        </div>
      </div>
    </div>

  </v-app>
</template>

<script>
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    maxLength,
    email
  } from 'vuelidate/lib/validators'

  export default {
    auth: false,
    layout: 'dashboardAdmin',
    data() {
      return {
        roles: [
          'Professeur',
          'Etudiant',
          'Administrateur',
          'Secrétaire'
        ],
        formations: [
          'DL',
          'IHM',
          'SIAM',
          'MIAGE',
          'Génie des procédés',
          'DC',
          'Psychologie',
          'Socio',
          'Histoire',
          'Géopolitique',
          'Géographie',
          "Histoire de l'art"
        ],
        user: {
          nom: '',
          prenom: '',
          numEtudiant: '',
          birthday: '',
          genre: '',
          formation: '',
          role: '',
          email: ''
        },
        genres: [
          'Mr',
          'Mme',
          'Autre'
        ],

        role: '',
        menu: false,
        modal: false,
        menu2: false,
        showCard: false,
        ruleNom: [v => v.length <= 30 || 'Nombre de caractères max : 30'],
        ruleEmail: [v => this.validateEmail(v) || "L'adresse e-mail doit être valide"],
        formValidate: false
      }
    },
    computed: {
      mergeWithNewData() {
        return [...new Set(this.formations)].sort()
      },
    },
    methods: {
      submit() {
        this.$v.$touch()
      },
      verifyForm() {

        setTimeout(() => {
          let ok = []
          ok.push(this.user.nom != '' && this.user.nom.length <= 30)
          ok.push(this.user.prenom != '' && this.user.prenom.length <= 30)
          ok.push(this.validateEmail(this.user.email))
          ok.push(this.user.birthday != '')
          ok.push(this.user.genre != '')
          ok.push(this.user.role != '')

          if (this.user.role == 'Etudiant') {
            ok.push(this.user.formation != '')
            ok.push(this.user.numEtudiant != '')
          }

          this.formValidate = ok.every((v) => v == true)
        }, 100)
      },
      validateEmail(email) {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      createUser() {
        if (this.formValidate) {
          console.log(this.user); 
        }
        
      }
    }
  }

</script>

<style lang="scss">
  .admin-pages,
  #app {
    background: none !important;
  }

  .add-user-body {
    width: auto;
    margin-right: 50px;
    display: flex;

  }

  .divider {
    margin-top: 20px;
    margin-bottom: 30px;
    margin-right: 50px !important;
  }

  .divider-form {
    margin-top: 0px;
    margin-bottom: 20px;
  }

  .title-form {
    color: rgba(17, 0, 31, 0.486);
    margin-bottom: 5px !important;
    margin-top: 10px;
  }


  .form-add-user {
    width: 50%;
    padding-right: 50px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    transition: .3s;

    &.background {
      background: #fff;
      padding-right: 0;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 4px 10px #2718fc10;
    }
    
    margin-bottom: 100px;
    
    
  }

  @media screen and (max-width : 1200px) {
      .form-add-user {
        padding-right: 10px;
      }
  }

  .add-user-card-box {
    width: 50%;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    align-self: flex-start;
    /* <-- this is the fix */
  }

  .add-user-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #fff;
    margin: 100px 0px 0 20px;
    position: relative;
    padding-top: 80px;
    padding-bottom: 50px;
    border-radius: 10px;
    box-shadow: 0 4px 10px #2718fc10;
    position: relative;
  }

  .check-add-user-card {
    position: absolute;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: #2718fc;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;

    transform: scale(0);
    opacity: 0;
    transition: .3s ease-in-out;

    &.active {
      opacity: 1;
      transform: scale(1) rotate(360deg) translate(30%, -30%);
    }
  }

  .avatar-add-user {
    height: 125px;
    width: 125px;
    background: #0000002d;
    position: absolute;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    box-shadow: 0 4px 26px rgba(39, 24, 252, 0.3);
  }

  .genreName {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }

  #genre {
    width: 50px;
    margin-right: 20px !important;
    display: block;
    position: relative;
    margin-right: 10px;
  }

  @media screen and (max-width : 500px) {
    .form-add-user {
      margin-right: 0 !important;
      padding-right: 0;
    }
  }

  @media screen and (max-width : 720px) {


    .add-user-card-box {
      display: none !important;
    }

    .add-user-card {
      display: none;
    }

    .form-add-user {
      width: 100%;
      margin-right: 50px;
    }

    .add-user-body {
      padding: 0;
      margin: 0;
    }

  }

  @media screen and (max-width : 380px) {
    .genreName {
      display: flex;
      justify-content: space-around;
      flex-direction: column !important;

      #genre {
        align-self: flex-start;
      }

      .form-name-addUser {
        margin-left: 0 !important;
      }
    }

    .form-add-user {
      margin-right: 0px;
    }

  }

  .form-name-addUser {
    margin-left: 10px !important;
  }

  .header-dashboard-page {
    display: flex;
    justify-content: space-between;
    margin-right: 50px;
    align-items: center;

    .dashboard-page-title {
      font-size: 1.6em;
      margin-bottom: 0 !important;
    }

    .dashboard-page-title-link {
      text-decoration: none;
      text-transform: none;
      transition: .3s;

      span.arrow {
        transition: .3s;
        display: inline-block;
      }

      &:hover {
        color: #2718fc;

        span.arrow {
          transform: translateX(5px);
        }
      }
    }

  }

  @media screen and (max-width : 570px) {
    .dashboard-page-title {
      display: none;
    }

    .header-dashboard-page {
      justify-content: flex-end;
    }
  }

  .role-card {
    border: 1px solid #2718fc;
    color: #2718fc;
    padding: 5px 10px;
    border-radius: 20px;
  }

  .prefill {
    opacity: .2;

    &.role-card {
      border: 1px solid #2718fc69 !important;
    }
  }

  .add-user-card-box {
    display: flex;
    flex-direction: column;
  }

  .validate-add-user {
    margin-top: 20px;
    background: #2718fc !important;
    color: #fff !important;
    padding: 25px 20px !important;
    margin-bottom: 50px;
    align-self: flex-end;

    &:hover {
      transform: scale(.99);
    }
  }

  .name-card-addUser {
    font-size: 22px;
    font-weight: 600;
  }

  .bloc-etudiant {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-user-filled {
    color: #2718fc;
  }

</style>
