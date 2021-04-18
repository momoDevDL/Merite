<template >
    <div class="main_container_classes">
        <perfect-scrollbar class="list_container">
            <div class="text_all_classes"> Tous mes cours </div>
            <div v-for="cl in allCoursesNames" :key="cl">
                        <div class="class_name_vertical" :id="cl" @click="onClickClass(cl)">{{cl}}</div>
            </div>
        </perfect-scrollbar>
        <div v-if="displayDetails" class="class_container">
            <div class="header">
                <div class="text_name_class">
                    {{classNameSelected}}
                </div>
                <img v-on:click="onClickIconPlus" src="../img/plus.png" class="plus_icon">
            </div>
            <ClassContainer></ClassContainer>        
        </div>
    </div>
</template>

<script>

import { EventBus } from "../Bus"

export default {
    props : {
        userCourses : {
            type : Array,
            default : [0]
        },
    },
    data : function() {
        return {
            displayDetails : false,
            selectedCourse : null,
            classNameSelected : null
        }
    }, 
    mounted() {
    },
    methods :  {
        onClickClass: function(className) {
            this.displayDetails = true
            this.classNameSelected = className
            console.log(this.classNameSelected);
        },

        onClickIconPlus() {
            EventBus.$emit('add-favorite-course-clicked', this.userCourses.find(course => course.name === this.classNameSelected));
        }
    },
    computed : {
        allCoursesNames () {
            if(this.userCourses) {
                    return this.userCourses.map(cours => cours.name);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .list_container {
        background: white;
        border-radius: 24px 24px;
        display: flex;
        height: 80vh;
        width: 250px;
        flex-direction:column;
        /* overflow-y: scroll; */
    }

    .main_container_classes {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .text_all_classes {
        font-size: 18px;
        text-align: left;
        line-height: 18px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .graduation_icon {
        height: 25px;
        width: 25px;
        margin-right: 10px;
    }

    .class_name_vertical {
        width: 100%;
        color: #215FFF;
        font-weight: 600;
        cursor: pointer;
        border-radius: 80px;
        transition: .4s;
        border-radius: 0;
        padding: 15px ;
        padding-left: 20px;

        &:hover {
            background-color: #f0f8ff;
        }
    }

    .class_container {
        background: white;
        border-radius: 24px;
        display: flex;
        height: 80vh;
        width: 78%;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    }

    .text_name_class {
        font-size: 20px;
        text-align: left;
        line-height: 18px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-left: 20px;
        margin-top: 20px;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .plus_icon {
        height: 25px;
        width: 25px;
        margin-right: 3%;
        margin-top: 20px;
        cursor: pointer;
    }
    

    @media only screen and (max-width: 1246px){ 
        .class_container {display: flex; flex-direction: column;}
    	.resources_chat_container {display: flex; flex-direction: column;}
        .ressources_container { width: 95%; height: 50vh; }
        .chat_container { width: 95%; height: 50vh; }
        .general_information {width: 95%; height: 50vh; }
        // .list_container {width:186px;}

    } 

    @media only screen and (max-width: 1177px){ 
        .graduation_icon { height: 0px; width: 0px;}
        .class_container {display: flex; flex-direction: column;}
    }


    @media only screen and (max-width: 730px){ 
        .list_container { display: none;}
    }



</style>