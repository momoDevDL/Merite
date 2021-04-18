<template>
  <div class="content-container">
    <div class="notifications">
      <a href="#"
        ><img src="~/assets/home/component-parameter.svg" class="vector"
      /></a>
    </div>

    <div class="home-components">
      <div class="component courses">
        <div class="title-bar">
          <div class="title">Mes cours favoris</div>
          <nuxt-link to="/classes/student" class="options">Tous les cours</nuxt-link>
        </div>
        <perfect-scrollbar class="cours">
          <span v-for="favoriteCourse in allFavoriteCourses" :key="favoriteCourse.id" class="cours-item">{{favoriteCourse.name}}</span>
        </perfect-scrollbar>
      </div>
      <div class="component personnal-infos">
        <div class="title-bar">
          <div class="title">Infos personnelles</div>
          <nuxt-link to="/" class="options">...</nuxt-link>
        </div>
        <div class="infos-container">
          <div class="info">
            <div class="title">Pseudo</div>
            <div class="content">{{$auth.$storage.getUniversal("user").username}}</div>
          </div>
          <div class="info">
            <div class="title">Email</div>
            <div class="content">{{$auth.$storage.getUniversal("user").email}}</div>
          </div>
          <div class="info">
            <div class="title">Role</div>
            <div class="content">{{roleTable[$auth.$storage.getUniversal("user").idGlobalRole]}}</div>
          </div>
        </div>
      </div>
      <div class="component component3"></div>
      <div class="component component4"></div>
      <div class="component component5"></div>
      <div class="component component6"></div>
    </div>
  </div>
</template>

<script>
import Classes from "~/components/Classes.vue";
export default {
  async asyncData({ $axios, $auth }) {
    let allFavoriteCourses = await $axios.$get("/course/favorite", {
      headers: { Authorization: $auth.strategy.token.get() }
    });

    return {allFavoriteCourses};
  },
  data() {
    return {
      roleTable : {
        1 : 'Admin',
        2 : 'Etudiant',
        3 : 'Professeur'
      }
    }
  },
  components: {
    Classes
  },
  layout: "homeLayout"
};
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: column;
}
.notifications {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
  width: 100%;

  .vector {
    height: 40px;
  }
}

.home-components {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(120px, auto);
}

.component {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.courses {
    grid-column: 1 / 4;
    grid-row: 1 / 2;

    .cours {
      display: flex;
      flex-wrap: nowrap;
      margin-left: 30px;
      margin-top: 10px;
      overflow: hidden;
      height: 70px;

      &:hover {
        overflow-x: scroll;
      }

      .cours-item {
        padding: 10px 20px;
        font-weight: 600;
        margin-right: 20px;
        height: 45px;
        color: #215fff;
        background: #2160ff10;
        border-radius: 80px;
        cursor: pointer;
      }
    }
  }

  &.personnal-infos {
    grid-column: 1/2;
    grid-row: 2/ 4;
    min-width: 200px;;
  }

  .title-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    font-weight: 600;

    .options {
      color: #a3a3a3;
      text-decoration: none;
    }
  }
}

.infos-container {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 20px;

  .info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px 0;

    &:not(:last-child) {
      border-bottom: 1px solid rgb(240, 240, 240);
    }

    .content {
      color: #8aa7f1;
    }
  }
}

.ps {
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.ps__rail-x .ps__thumb-x {
  background-color: #215fff !important;
  color: #215fff !important;
}

.ps-scrollbar-y-rail {
  background: #215fff !important;
  color: #215fff !important;
}

@media screen and (max-width: 1500px) {
.personnal-infos {
    grid-column: 1/3 !important;
  }
}
@media screen and (max-width: 600px) {
  .home-components {
  display: flex;
  flex-direction: column;
}

.component {
  min-width: 200px;
}
}
</style>
