<template>
  <div class="sub_class_container">
    <div class="general_information">
      <h3 class="title-class-section">Généralités</h3>
      <p>
        Bienvenu dans ce cours de {{ $store.state.currentCourse.course.name }},
        au programme nous allons voir les differents aspects de Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Eum obcaecati repellendus
        maiores possimus quis aut iusto, error distinctio esse exercitationem
        nihil doloremque corrupti officiis placeat inventore molestias omnis.
        Soluta, eligendi.
      </p>
      <h4 class="contact">Contacts</h4>
      <ul>
        <li>
          Frédéric Migeon :
          <span class="adresse-mail">frederic.migeon@irit.fr</span>
        </li>
        <li>
          Jean Paul Arcangeli :
          <span class="adresse-mail">jeanpaul.arcangeli@irit.fr</span>
        </li>
      </ul>
    </div>
    <div class="resources_chat_container">
      <div class="ressources_container">
        <h3 class="title-class-section">Ressources & Dépot</h3>
        <SectionCourse v-for="(section,i) in $store.state.currentCourse.sections" :key="i" :section="section"></SectionCourse>
      </div>
      <div class="chat_container">
        <h3 class="title-class-section">Chat & Notifications</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sub_class_container {
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}

.general_information {
  border-radius: 24px;
  background: #2160ff10;
  padding: 25px 20px;
  margin-top: 50px;

  .contact {
    margin-top: 20px;
  }

  li {
    list-style: none;
  }

  .adresse-mail {
    color: #2160ff;
  }
}

  .title-class-section {
    color: #2160ff;
  }

.resources_chat_container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
}

.ressources_container {
  border-radius: 24px;
  background: #2160ff10;
  padding: 25px 20px;
  width: 65%;
  margin-right: 40px;
}

.chat_container {
  border-radius: 24px;
  background: #2160ff10;
  padding: 25px 20px;
  width: 35%;
  align-self: flex-start;
  position: sticky;
  top: 40px;
  align-self: flex-start;
}

@media screen and (max-width: 1200px) {
    .resources_chat_container {
        flex-direction: column-reverse;

    }

    .ressources_container, .chat_container {
        width: 100%;
    }

    .chat_container {
        position: inherit;
        top: 0;
        margin-bottom: 40px;
    }

}

@media screen and (max-width: 730px) {
    .sub_class_container {

  padding: 0px;

}


}
</style>
