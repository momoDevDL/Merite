<template>
  <div class="content-container">
    <div class="container_favorite_classes">
      <div class="text_favorite_classes">Mes cours favoris</div>
      <p class="favorite-phrase" v-if="$store.state.courses.filter(course => course.favorite).length == 0">Pensez à ajouter des cours favoris</p>
      <perfect-scrollbar class="all_favorite_classes">
        <div
          v-for="cl in $store.state.courses.filter(course => course.favorite)"
          :key="cl.id"
        >
          <FavoriteCourse :cl="cl"></FavoriteCourse>
        </div>
        <div
          class="other-courses"
          v-for="cl in $store.state.courses.filter(course => !course.favorite)"
          :key="cl.id"
        >
          <FavoriteCourse :cl="cl"></FavoriteCourse>
        </div>
        <div v-if="this.favoriteCourseNewContainer">
          <div class="container_classes">
            <div class="class_name">
              <img src="../img/graduation.png" class="graduation_icon_new" />
              <div class="name">{{ favoriteCourseName }}</div>
              <img src="../img/cancel-512.png" class="graduation_icon_new" />
            </div>
          </div>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../Bus";

export default {
  props: ["userCourses"],
  data: function() {
    return {
      favoriteCourseName: null,
      favoriteCourseNewContainer: false,
      allFavoriteUserCourses: null
    };
  },
  methods: {
    async addFavoriteClass(data) {
      try {
        let favoriteCourse = await this.$axios.$put("/course/favorite", {
          courseID: data.course.id,
          headers: { Authorization: this.$auth.strategy.token.get() }
        });
        console.log(favoriteCourse);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container_favorite_classes {
  background: white;
  -ms-border-radius: 24px;
  -o-border-radius: 24px;
  -moz-border-radius: 24px;
  -webkit-border-radius: 24px;
  border-radius: 24px;
  display: flex;
  height: 251px;
  width: 100%;
  flex-direction: column;
  /* overflow-x: scroll; */
}

.all_favorite_classes {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 25px;
  padding-bottom: 17px;
}

.text_favorite_classes {
  font-size: 18px;
  text-align: left;
  line-height: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  margin-left: 25px;
  margin-top: 20px;
}

.text_no_classes {
  font-size: 16px;
  text-align: left;
  line-height: 0px;
  font-family: "Poppins", sans-serif;
  margin-left: 25px;
  margin-top: 20px;
  color: red;
}

.container_classes {
  height: 170px;
  min-width: 220px;
  background: #2160ff10;
  margin-top: 0px;
  margin-right: 20px;
  border-radius: 24px;
  cursor: pointer;
}

.class_name {
  color: #215fff;
  font-size: 18px;
  text-align: left;
  line-height: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  margin-left: 10%;
  display: flex;
  flex-direction: row;
}

.graduation_icon {
  height: 25px;
  width: 25px;
  margin-right: 10px;
}

.graduation_icon_new {
  height: 25px;
  width: 25px;
  margin-right: 10px;
  margin-top: 20px;
}

.name {
  margin-top: 20px;
}

.favorite-phrase {
    margin-left: 25px;
    margin-top: 20px;
}

@media only screen and (min-width: 730px) {
  .other-courses {
    display: none;
  }
}
@media only screen and (max-width: 730px) {
.favorite-phrase {
      display: none;
  }
}
</style>
