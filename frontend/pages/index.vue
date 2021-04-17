<template>
  <div class="content-container">
    <!--<Timetable></Timetable>
		<PersonnalNotes></PersonnalNotes>
		<Classes></Classes>
		<Instagram></Instagram> -->
    <div class="notifications">
      <a href="#"
        ><img src="~/assets/home/component-parameter.svg" class="vector"
      /></a>
    </div>

    <div class="home-components">
      <!-- <PersonnalInfo></PersonnalInfo>
      <Instagram></Instagram> -->
      <div class="component courses">
        <div class="title-bar">
          <div class="title">Mes cours favoris</div>
          <nuxt-link to="/classes" class="options">Tous les cours</nuxt-link>
        </div>
        <perfect-scrollbar class="cours">
          <span class="cours-item">MCO</span>
          <span class="cours-item">MCPR</span>
          <span class="cours-item">CISI</span>
          <span class="cours-item">Algo</span>
          <span class="cours-item">MAPI</span>
          <span class="cours-item">Projet</span>
          <span class="cours-item">WebX</span>
          <span class="cours-item">MCO</span>
          <span class="cours-item">MCPR</span>
          <span class="cours-item">CISI</span>
          <span class="cours-item">Algo</span>
          <span class="cours-item">MAPI</span>
          <span class="cours-item">Projet</span>
          <span class="cours-item">WebX</span>
          <span class="cours-item">MCO</span>
          <span class="cours-item">MCPR</span>
          <span class="cours-item">CISI</span>
          <span class="cours-item">Algo</span>
          <span class="cours-item">MAPI</span>
          <span class="cours-item">Projet</span>
          <span class="cours-item">WebX</span>
        </perfect-scrollbar>
      </div>
      <div class="component personnal-infos">
        <div class="title-bar">
          <div class="title">Infos personnelles</div>
          <nuxt-link to="/classes" class="options">...</nuxt-link>
        </div>
        <div class="infos-container">
          <div class="info">
            <div class="title">Pseudo</div>
            <div class="content">coco</div>
          </div>
          <div class="info">
            <div class="title">Email</div>
            <div class="content">email</div>
          </div>
          <div class="info">
            <div class="title">Role</div>
            <div class="content">Etudiant</div>
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
    height: 30px;
  }
}

.home-components {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  // grid-auto-rows: minmax(120px, auto);
}

.component {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  height: 100%;
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

      &:hover {
        overflow-x: scroll;
      }

      .cours-item {
        padding: 10px 20px;
        font-weight: 600;
        margin-right: 20px;
        color: #215fff;
        background: #2160ff10;
        border-radius: 80px;
        cursor: pointer;
      }
    }
  }

  &.personnal-infos {
    grid-row: 2/ 4;
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
</style>
