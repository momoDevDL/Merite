<<<<<<< HEAD
<template v-on:add-favorite-course-clicked="onAddFavoriteCourseClicked">
    <div class = "content-container">   
        <div class="container_favorite_classes">
            <div class="text_favorite_classes"> Mes cours favoris</div>
            <div class="text_no_classes">{{noFavoriteCourse}}</div>
            <i class="fas fa-graduation-cap"></i>
            <div class="all_favorite_classes">
                <div v-if="this.favoriteCourseNewContainer">
                    <div class="container_classes">
                        <div class="class_name">
                            <img src="../img/graduation.png" class="graduation_icon_new">
                            <div class="name">{{favoriteCourseName}}</div>
                        </div>
=======
<template>
    <div class = "content-container">   
        <div class="container_favorite_classes">
            <div class="text_favorite_classes"> Mes cours favoris</div>
            <i class="fas fa-graduation-cap"></i>
            <div class="all_favorite_classes">
                <div v-for="cl in classes" :key="cl.className">
                    <div class="container_classes">
                        <br>
                        <div class="class_name">
                            <img src="../img/graduation.png" class="graduation_icon">
                            {{cl.className}}
                        </div>
                        <img src="../img/link.png" class="link_icon">
                        <br>
                        <img src="../img/download.png" class="link_icon">
>>>>>>> corentin-dev
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
<<<<<<< HEAD
import { EventBus } from '../Bus'

export default {
    props : ["userCourses"],
    data : function() {
        return {
            favoriteCourseName : null,
            noFavoriteCourse : "Il n'y a pas de cours favoris",
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
            this.noFavoriteCourse = null

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





=======
export default {
    data : function() {
        return {
            classes : [
                { className : 'MCO'},
                { className : 'MCS'},
                { className : 'CISI'},
                { className : 'WebX'},
                { className : 'ComFlex'},
                { className : 'UCD-UX'}
            ]   
        }
    }
    
}
>>>>>>> corentin-dev
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

<<<<<<< HEAD
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
        background: #DDE4F8;
        margin-top: 0px;
=======
    .container_classes {
        height: 170px;
        min-width: 199px;
        background: #DDE4F8;
        margin-top: 20px;
>>>>>>> corentin-dev
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

<<<<<<< HEAD
    .graduation_icon_new {
        height: 25px;
        width: 25px;
        margin-right: 10px;
        margin-top: 20px;
    }

    .name {
        margin-top : 20px;
    }

=======
>>>>>>> corentin-dev
    .link_icon {
        height: 25px;
        width: 25px;
        margin-left: 20px;
    }  

</style>