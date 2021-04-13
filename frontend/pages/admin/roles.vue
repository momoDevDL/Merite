<template>
    <div>
        <v-app class="role">
            <div class="text">Recherchez un utilisateur</div>
                <v-col cols="15" sm="7">
                    <v-text-field v-model="insertedName" v-on:click="loadUsers" class="searchBar" placeholder="Ex : DUPONT Jean" solo prepend-inner-icon="mdi-magnify">
                    </v-text-field>
                </v-col>
                {{userName}}
            <div class="user-cards">
                <div v-on:click="showSelectionRole" class="cardSelection">Ajouter un rôle </div>
                <div class="cardSelection">Modifier un role</div>
            </div>
            <div class="selectionRole" v-if="selectionRole">
                <div class="text">Sélectionnez un rôle</div>
                <v-select class="userRoleList" v-model="selectedRole"  v-on:click="showSearchClass" :items="roles" label="Rôles" solo></v-select>
            </div>
            <div class="searchClass" v-if="searchClass">
                <div class="text">Cherchez un cours</div>
                <v-text-field v-model="insertedClass" class="searchBarClass" placeholder="Ex : M1_INF_MCO" solo prepend-inner-icon="mdi-magnify"></v-text-field>
            </div>
        </v-app>
    </div>
</template>
<script>
export default {
    auth:false,
    layout : 'dashboardAdmin',  
    data() {
        return {
            userName : null,
            insertedName : "",
            selectionRole : false,
            roles: ["Responsable TD", "Responsable TP", "Responsable Cours", "Resposable Formation"],
            selectedRole : "",
            searchClass : false,
            userToken : null
        };
    },
    async mounted() {
        try {
            const body = {
                "email" : "admin@admin.com",
                "password" : "admin"           
            };

            let { token } = await this.$axios.$post('/user/login', body);
            this.userToken = token;
        }
        catch (e) {
            console.error(e)
        }
    },
    methods: {
        async loadUsers(){
            try {
                console.log(this.userToken)
                let { users } = await this.$axios.$get('/user', {
                    headers : { Authorization : this.$auth.strategy.token.get() }
                });

                this.userName = users
                console.log(users)
            }
            catch (e) {
                console.error(e)
            }
        },

        showSelectionRole : function() {
            this.selectionRole = true
        },

        showSearchClass : function() {
            this.searchClass = true
        }
    }

}
</script>
<style scoped lang="scss">
    .text {
        font-size: 34px;
        text-align: left;
        line-height: 34px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-left: 25px;
    }

    .user-cards {
        display: flex;
        margin-bottom: 100px;
    }

    .searchBar {
        margin-left: 13px;
    }

    .cardSelection {
        background: white;
        color: #2818FC;
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
        width: 300px;
        margin-left: 25px;
        cursor: pointer;

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

    @media screen and (max-width : 610px) {
        .card {
            //margin-top: 10px;
        }

        .user-cards {
            display: flex;
            flex-direction: column;
        }
    }

    .userRoleList {
        margin-left: 25px;
        margin-top: 10px;
        width: 58%;

    }

    .role, #app {
        background: none !important;
    }

    .searchBarClass {
        width: 58%;
        margin-top: 10px;
        margin-left: 25px;
    }


</style>