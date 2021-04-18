<template>
  <div class="section">
    <h4 class="section-name">{{ section.name }}</h4>
    <p class="section-about">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
      laborum sapiente hic vero corrupti architecto quis beatae officiis.
      Pariatur corporis quod aut quaerat alias dignissimos repudiandae aliquid
      voluptates explicabo recusandae.
    </p>
    <div class="section-sections">
      <h5>Documents</h5>
      <a
        :href="`http://localhost:3001/uploads/${document.filepath}`"
        target="_blank"
        class="document"
        v-for="document in section.documents"
        :key="document.id"
      >
        <img src="~/assets/paperclip.svg" alt="" />
        <div class="document-infos">
          <div>{{ document.name }}</div>
          <div class="document-message">{{ document.message }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["section"]
};
</script>

<style lang="scss" scoped>
.document {
  display: flex;
  align-items: center;
  background: #2160ff10;
  color: #2160ff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: 0.4s;

  &:hover {
    background: #2160ff2f;
  }

  .document-message {
    color: #000;
    font-size: 14px;
    font-weight: 400;
  }

  img {
    margin-right: 20px;
  }
}

.section-name {
  font-size: 20px;
  margin-top: 50px;
}

.section-about {
  margin-top: 10px;
}

.section-sections {
    margin-top: 30px;

    h5 {
        font-size: 18px;
        color: rgb(46, 46, 46);
        margin-bottom: 20px;
    }
}

.section:not(:last-child) {
    border-bottom: 1px solid #2160ff26;
    padding-bottom: 50px;
}
</style>
