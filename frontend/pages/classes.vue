<template>
    <div class = "content-container">   
        <div class="main_container">
            <div class="favorite_class_container">
                <FavoriteClasses></FavoriteClasses>
            </div>
            <div class="list_class_container">
                <ListClasses></ListClasses>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    auth : false,
    layout : "homeLayout"
}
</script>

<style scoped>
    .dark_theme {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 20px;
	}

    .main_container {
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

</style>