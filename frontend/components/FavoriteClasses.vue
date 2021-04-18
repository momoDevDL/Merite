<template v-on:add-favorite-course-clicked="onAddFavoriteCourseClicked">
    <div class = "content-container">   
        <div class="container_favorite_classes">
            <div class="text_favorite_classes"> Mes cours favoris</div>
            <div class="text_no_classes">{{noFavoriteCourse}}</div>
            <i class="fas fa-graduation-cap"></i>
            <perfect-scrollbar class="all_favorite_classes">
                <div v-for="cl in allFavoriteUserCourses" :key="cl.id">
                    <div class="container_classes">
                        <div class="class_name">
                            {{cl.name}}
                        </div>
                    </div>
                </div>
                <div v-if="this.favoriteCourseNewContainer">
                    <div class="container_classes">
                        <div class="class_name">
                            <img src="../img/graduation.png" class="graduation_icon_new">
                            <div class="name">{{favoriteCourseName}}</div>
                            <img src="../img/cancel-512.png" class="graduation_icon_new">
                        </div>
                    </div>
                </div>
            </perfect-scrollbar>
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
            noFavoriteCourse : "Il n'y a pas de cours favoris",
            favoriteCourseNewContainer : false,
            allFavoriteUserCourses : null
        }
    },
    methods: {
        onAddFavoriteCourseClicked(allCoursesNames) {
            console.log(allCoursesNames)
        },
        async addFavoriteClass(data) {
            console.log(data)
            this.favoriteCourseName = data.name;
            this.noFavoriteCourse = null

            try {
                let favoriteCourse = await this.$axios.$put('/course/favorite', {
                    courseID : data.id,
                    headers : { Authorization : this.$auth.strategy.token.get() }
            });
            console.log(favoriteCourse)

            }
            catch (e) {
                console.error(e)
            }

            if(this.favoriteCourseName === this.allFavoriteUserCourses.find(el => el === this.favoriteCourseName)) {
                this.favoriteCourseNewContainer = false
                alert("Ce cours existe déjà parmis vos cours favoris");
            } else {
                this.favoriteCourseNewContainer = true
            }

        }, 
    },
    async mounted() {
        EventBus.$on('add-favorite-course-clicked', this.addFavoriteClass);

        try {
            let allFavoriteCourses = await this.$axios.$get('/course/favorite', {
            headers : { Authorization : this.$auth.strategy.token.get() }
            });
            console.log(allFavoriteCourses)

            this.allFavoriteUserCourses = allFavoriteCourses
            console.log(this.allFavoriteUserCourses)

            if(this.allFavoriteUserCourses != null) {
                this.noFavoriteCourse = null
            }
        }
        catch (e) {
            console.error(e)
        }
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
        /* overflow-x: scroll; */
    }

    .all_favorite_classes {
        display: flex;
        flex-direction: row;   
        margin-left: 25px; 
        padding-bottom: 17px;
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

    .text_no_classes {
        font-size: 16px;
        text-align: left;
        line-height: 0px;
        font-family: "Poppins", sans-serif;
        margin-left: 25px;
        margin-top: 20px;
        color: red;
    }

    .container_classes {
        height: 170px;
        min-width: 220px;
        background: #2160ff10;
        margin-top: 0px;
        margin-right: 20px;
        border-radius: 24px;
        cursor: pointer;

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

    .cancel_icon {
        display: flex;
        justify-content: flex-end;
        margin-right: 5px;
        height: 20px;
        width: 20px;
    }  

    @media only screen and (max-width: 730px){ 
        .container_favorite_classes { display: none;}
    }

</style>				