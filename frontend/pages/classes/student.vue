<template>
    <div class = "content-container">   
        <div class="dark_theme">
		    <a href="#"><img src="../../img/vector_ek3.png" class="vector"></a>	
        </div>
        <div class="main_container">
            <div class="favorite_class_container">
                <FavoriteClasses v-bind:allCoursesNames="allCoursesNames"></FavoriteClasses>
            </div>
            <div class="list_class_container">
                <br>
                <ListClasses v-bind:userCourses="userCourses"></ListClasses>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout : "homeLayout",
    data() {
        return {
            userCourses : null,
            allCoursesNames : null
        }

    },
    async mounted() {
        try {
            let courses = await this.$axios.$get('/course/userCourses', {
                headers : { Authorization : this.$auth.strategy.token.get() }
            });

            this.userCourses = courses
            console.log(this.userCourses);
            this.allCoursesNames = this.userCourses.map(cours => cours.name);
        }
        catch (e) {
            console.error(e)
        }
    },
    methods : {
        onAddFavoriteCourseClicked(allCoursesNames) {
            console.log(allCoursesNames)
        }
    }
   
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

</style>