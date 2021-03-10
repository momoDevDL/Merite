<template>
	<div class="content-container">
		<!--<Timetable></Timetable>
		<PersonnalNotes></PersonnalNotes>
		<Classes></Classes>
		<Instagram></Instagram> -->
		<div class="notifications">
			<a href="#"><img src="../img/vector_ek3.png" class="vector"></a>
		</div>
		<div class="personnal_info_instagram">
			<PersonnalInfo></PersonnalInfo>
			<Instagram></Instagram> 
		</div>
	</div>
</template>

<script>
	import Classes from '~/components/Classes.vue';
	export default {
		components : {
			Classes
		},
		auth:false,
		layout : "homeLayout"
}
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