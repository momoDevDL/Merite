<template>
    <div class="content-container">
        <div class="all_classes_container">
            <div class="text_my_classes"> Mes cours </div>
            <div class="all_my_classes">
                <div v-for="cl in classes" :key="cl.className">
                    <div class="container_classes">
                        <div class="class_name"> 
                            <div :id=cl.className v-on:click="(ev) => onClickClass(ev, cl.className)">{{cl.className}}</div>
                        </div>
                        <div class="role"> {{cl.role}} </div>
                    </div>
                </div>  
            </div>  
        </div>
        <br>
        <div v-if="displayDetails" class="class_container">
            <div class="header">
                <div class="text_name_class">
                    {{classNameSelected}}
                </div>
            </div>
            <ClassContainerTeacher></ClassContainerTeacher>        
        </div>
    </div>
</template>
<script>
export default {
    data : function() {
        return {
            classes : [
                { 
                    className : 'MCO' ,
                    role : 'Chargé de Cours'
                },
                { 
                    className : 'MAPI',
                    role : 'Chargé de TD'
                },
                { 
                    className : 'PROJET',
                    role : 'Chargé de TD'
                },
                { 
                    className : 'ComFlex',
                    role : 'Chargé de TP'
                }
            ],
            displayDetails : false,
            classNameSelected : null  
        }
    },
    methods :  {
        onClickClass: function(event, className) {
            this.displayDetails = true;
            this.classNameSelected = className;
        }
    } 
}
</script>
<style scoped>
    .all_classes_container {
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

    .text_my_classes {
        font-size: 18px;
        text-align: left;
        line-height: 18px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-left: 25px;
        margin-top: 20px;
    }

    .all_my_classes {
        display: flex;
        flex-direction: row;    
    }

    .container_classes {
        height: 170px;
        min-width: 199px;
        background: #DDE4F8;
        margin-top: 20px;
        margin-left: 20px;
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
    }

    .role {
        color: #ADA5A5;
        font-size: 14px;
        text-align: left;
        line-height: 14px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-left: 10%;

    }

    .class_container {
        background: white;
        display: flex;
        height: 80vh;
        width: 100%;
        border-radius: 24px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }

    .text_name_class {
        font-size: 20px;
        text-align: left;
        line-height: 18px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-left: 3%;
        margin-top: 20px;
    }

</style>