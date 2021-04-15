<template v-on:add-favorite-course-clicked="onAddFavoriteCourseClicked">
    <div class = "content-container">   
        <div class="container_favorite_classes">
            <div class="text_favorite_classes"> Mes cours favoris</div>
            <i class="fas fa-graduation-cap"></i>
            <div class="all_favorite_classes">
                <div v-if="this.favoriteCourseNewContainer">
                    <div class="container_classes">
                        <div class="class_name">
                            <img src="../img/graduation.png" class="graduation_icon_new">
                            <div class="name">{{favoriteCourseName}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../Bus'

export default {
    props : ["userCourses"],
    data : function() {
        return {
            favoriteCourseName : null,
            favoriteCourseNewContainer : false
        }
    },
    methods: {
        onAddFavoriteCourseClicked(allCoursesNames) {
            console.log(allCoursesNames)
        },
        async addFavoriteClass(data) {
            console.log(data)
            this.favoriteCourseNewContainer = true;
            this.favoriteCourseName = data.name;

            try {
                let favoriteCourse = await this.$axios.$put('/course/favorite', {
                    userID : this.$auth.$storage.getUniversal('user').username,
                    courseID : data.id,
                    headers : { Authorization : this.$auth.strategy.token.get() }
            });
            console.log(favoriteCourse)

            }
            catch (e) {
                console.error(e)
            }
        }
    },
    mounted() {
        EventBus.$on('add-favorite-course-clicked', this.addFavoriteClass);
    } 

}





</script>

<style scoped>

    .container_favorite_classes {
        background: white;
        -ms-border-radius: 24px;
        -o-border-radius: 24px;
        -moz-border-radius: 24px;
        -webkit-border-radius: 24px;
        border-radius: 24px;
        display: flex;
        height: 251px;
        width: 100%;
        flex-direction: column;
        overflow-x: scroll;
    }

    .all_favorite_classes {
        display: flex;
        flex-direction: row;    
    }

    .text_favorite_classes {
        font-size: 18px;
        text-align: left;
        line-height: 18px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-left: 25px;
        margin-top: 20px;
    }

    .container_classes {
        height: 170px;
        min-width: 220px;
        background: #DDE4F8;
        margin-top: 20px;
        margin-left: 20px;
        -ms-border-radius: 24px;
        -o-border-radius: 24px;
        -moz-border-radius: 24px;
        -webkit-border-radius: 24px;
        cursor: pointer;
        /*overflow: scroll;*/

    }

    .class_name {
        color: #215FFF;
        font-size: 18px;
        text-align: left;
        line-height: 18px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-left: 10%;
        display: flex;
        flex-direction: row;
    }

    .graduation_icon {
        height: 25px;
        width: 25px;
        margin-right: 10px;
    }

    .graduation_icon_new {
        height: 25px;
        width: 25px;
        margin-right: 10px;
        margin-top: 20px;
    }

    .name {
        margin-top : 20px;
    }

    .link_icon {
        height: 25px;
        width: 25px;
        margin-left: 20px;
    }  

</style>