<template>
	<div class="content-container">
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