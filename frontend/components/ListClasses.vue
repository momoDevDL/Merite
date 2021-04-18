<template>
  <div class="main_container_classes">
    <div class="list_container">
      <div class="text_all_classes">Tous mes cours</div>
      <div
        class="vertical-courses"
        v-for="cl in $store.state.courses"
        :key="cl.course.id"
        :class="{
          active: $store.state.currentCourse.course.id == cl.course.id
        }"
      >
        <div class="class_name_vertical" :id="cl" @click="onClickClass(cl)">
          {{ cl.course.name }}
        </div>
        <img
          @click.stop="addFavorite(cl)"
          class="star"
          src="~/assets/star_filled.svg"
          v-if="cl.favorite"
        />
        <img
          @click.stop="addFavorite(cl)"
          class="star"
          src="~/assets/star.svg"
          v-else
        />
      </div>
    </div>
    <div class="class_container">
      <div class="header">
        <div class="text_name_class">
          {{ $store.state.currentCourse.course.name }}
        </div>
        <img
          v-on:click="onClickIconPlus"
          src="../img/plus.png"
          class="plus_icon"
        />
      </div>
      <ClassContainer></ClassContainer>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../Bus";

export default {
  props: {
    userCourses: {
      type: Array,
      default: [0]
    }
  },
  data: function() {
    return {
      displayDetails: false,
      selectedCourse: null,
      classNameSelected: null,
      currentCourse: {
        course: {
          name: "default",
          id: 0
        },
        favorite: false,
        sections: []
      }
    };
  },
  mounted() {},
  methods: {
    onClickClass: function(cl) {
      this.$store.commit("setCurrentCourse", cl);
    },
    async addFavorite(cl) {
      try {
        let favoriteCourse = await this.$axios.$put("/course/favorite", {
          courseID: cl.course.id,
          headers: { Authorization: this.$auth.strategy.token.get() }
        });

        this.$store.commit("toggleFavoriteCourse", cl);
      } catch (e) {
        console.error(e);
      }
    },
    onClickIconPlus() {
      EventBus.$emit(
        "add-favorite-course-clicked",
        this.userCourses.find(course => course.name === this.classNameSelected)
      );
    }
  }
  // computed : {
  //     allCoursesNames () {
  //         if(this.userCourses) {
  //                 return this.userCourses.map(cours => cours.name);
  //         }
  //     }
  // }
};
</script>

<style lang="scss" scoped>
.list_container {
  background: white;
  border-radius: 24px 24px;
  display: flex;
  width: 250px;
  flex-direction: column;
  padding-bottom: 50px;
  position: sticky;
  position: -webkit-sticky;
  top: 40px;
  align-self: flex-start;
}

.main_container_classes {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.vertical-courses {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
  transition: 0.4s;

  &:active {
    background-color: #f0f8ff;
  }
  &:hover {
    background-color: #f0f8ff;
  }

  .star {
    height: 20px;
    cursor: pointer;
  }
}

.text_all_classes {
  font-size: 18px;
  text-align: left;
  line-height: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.graduation_icon {
  height: 25px;
  width: 25px;
  margin-right: 10px;
}

.class_name_vertical {
  width: 100%;
  color: #215fff;
  font-weight: 600;
  cursor: pointer;
  border-radius: 80px;
  transition: 0.4s;
  border-radius: 0;
  padding: 15px;
  padding-left: 20px;
}

.class_container {
//   background: white;
  border-radius: 24px;
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  padding: 0 10px;
}

.text_name_class {
  font-size: 20px;
  text-align: left;
  line-height: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 20px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.plus_icon {
  height: 25px;
  width: 25px;
  margin-right: 3%;
  margin-top: 20px;
  cursor: pointer;
}

@media only screen and (max-width: 1246px) {
  .class_container {
    display: flex;
    flex-direction: column;
  }
  .resources_chat_container {
    display: flex;
    flex-direction: column;
  }
  .ressources_container {
    width: 95%;
    height: 50vh;
  }
  .chat_container {
    width: 95%;
    height: 50vh;
  }
  .general_information {
    width: 95%;
    height: 50vh;
  }
  // .list_container {width:186px;}
}

@media only screen and (max-width: 1177px) {
  .graduation_icon {
    height: 0px;
    width: 0px;
  }
  .class_container {
    display: flex;
    flex-direction: column;
  }
}

@media only screen and (max-width: 730px) {
  .list_container {
    display: none;
  }
}
</style>
