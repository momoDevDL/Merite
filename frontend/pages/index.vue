<template>
  <div class="content-container">
    <!--<Timetable></Timetable>
		<PersonnalNotes></PersonnalNotes>
		<Classes></Classes>
		<Instagram></Instagram> -->
    <div @click="logout" class="notifications">
      <a href="#"><img src="../img/vector_ek3.png" class="vector" /></a>
    </div>
    <div class="personnal_info_instagram">
      <PersonnalInfo></PersonnalInfo>
      <Instagram></Instagram>
    </div>
  </div>
</template>

<script>
import Classes from "~/components/Classes.vue";
export default {
  components: {
    Classes,
  },
  layout: "homeLayout",
  methods : {
	  async logout() {
		  await this.$auth.logout()
		  console.log("logout");
		  this.$route.push('/login')
	  }
  }
};
</script>

<style lang ="scss">
.notifications {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}

.personnal_info_instagram {
  display: flex;
  flex-direction: column;
}
</style>