<template>
	<div class="content-container">
		<div class="dark_theme">
			<a href="#"><img src="../img/vector_ek3.png" class="vector"></a>
		</div>
		<div class="personnal_info_instagram">
			<PersonnalInfo></PersonnalInfo>
			<Instagram></Instagram> 
		</div>
		<!--<button>Cours
			<nuxt-link to="/classes"></nuxt-link>
		</button> -->
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

	.dark_theme {
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