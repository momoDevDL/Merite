<template>
  <div @click="setCurrentCourse(cl)" class="container_classes">
    <div class="class-header">
      <div class="class-header-name">{{ cl.course.name }}</div>
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
    <div class="class-sections">
      <div v-if="cl.sections[cl.sections.length - 1]">
        {{ cl.sections[cl.sections.length - 1].name }}
      </div>
      <div class="file">
        <img
          src="~/assets/image.svg"
          alt="image"
          v-if="
            getExtension(
              cl.sections[cl.sections.length - 1].documents[0].filepath
            ) == 'jpg' ||
              getExtension(
                cl.sections[cl.sections.length - 1].documents[0].filepath
              ) == 'png'
          "
        />
        <img
          src="~/assets/book.svg"
          alt="image"
          v-else-if="
            getExtension(
              cl.sections[cl.sections.length - 1].documents[0].filepath
            ) == 'pdf'
          "
        />
        <a
          :href="
            `http://localhost:3001/uploads/${
              cl.sections[cl.sections.length - 1].documents[0].filepath
            }`
          "
          @click.stop=""
          target="_blank"
          v-if="cl.sections[cl.sections.length - 1].documents[0]"
          >{{ cl.sections[cl.sections.length - 1].documents[0].name }}</a
        >
      </div>
      <div class="file">
        <img
          src="~/assets/image.svg"
          alt="image"
          v-if="
            getExtension(
              cl.sections[cl.sections.length - 1].documents[0].filepath
            ) == 'jpg' ||
              getExtension(
                cl.sections[cl.sections.length - 1].documents[0].filepath
              ) == 'png'
          "
        />
        <img
          src="~/assets/book.svg"
          alt="image"
          v-else-if="
            getExtension(
              cl.sections[cl.sections.length - 1].documents[0].filepath
            ) == 'pdf'
          "
        />
        <a
          :href="
            `http://localhost:3001/uploads/${
              cl.sections[cl.sections.length - 1].documents[1].filepath
            }`
          "
          @click.stop=""
          target="_blank"
          v-if="cl.sections[cl.sections.length - 1].documents[1]"
          >{{ cl.sections[cl.sections.length - 1].documents[1].name }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cl"],
  methods: {
    getExtension(path) {
      let tab = path.split(".");
      return tab[tab.length - 1];
    },
    setCurrentCourse(cl) {
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
  }
};
</script>

<style lang="scss" scoped>
.class-header-name {
  color: #215fff;
}

.container_classes {
    transition: .4s;
    &:hover {
        background: #2160ff2f;
    }
}

.class-header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  padding: 10px 20px;
}

.class-sections {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  font-weight: 600;

  a {
    text-decoration: none;
    padding-right: 20px;
  }

  .file {
    display: flex;
    align-items: center;
    padding-top: 10px;
    img {
      margin-right: 10px;
    }
  }
}
</style>
