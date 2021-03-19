<template>
    <div class="main_container">
        <div class="list_container">
            <div class="text_all_classes"> Tous mes cours </div>
            <div v-for="cl in classes" :key="cl.className">
                <div class="container_classes">
                    <br>
                    <div class="class_name">
                        <img src="../img/graduation.png" class="graduation_icon">
                        <div :id=cl.className v-on:click="(ev) => onClickClass(ev, cl.className)">{{cl.className}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="displayDetails" class="class_container">
            <div class="header">
                <div class="text_name_class">
                    {{classNameSelected}}
                </div>
                <img src="../img/plus.png" class="plus_icon">
            </div>
            <ClassContainer></ClassContainer>        
        </div>
    </div>
</template>

<script>
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
    .list_container {
        background: white;
        border-radius: 24px 0px 0px 24px;
        display: flex;
        height: 80vh;
        width: 20%;
        flex-direction:column;
        overflow-y: scroll;
    }

    .main_container {
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
        margin-left: 25px;
        margin-top: 20px;
    }

    .graduation_icon {
        height: 25px;
        width: 25px;
        margin-right: 10px;
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
        transition: .4s;
    }

    .class_name:hover div{
        width: 180px;
        height: 30px;
        padding-left: 8px;
        background-color: #f0f8ff;
        cursor: pointer;
        border-radius: 57px;
    }

    .class_container {
        background: white;
        border-radius: 0px 24px 24px 0px;
        display: flex;
        height: 80vh;
        width: 78%;
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
    }
    

    @media only screen and (max-width: 1246px){ 
        .class_container {display: flex; flex-direction: column;}
    	.resources_chat_container {display: flex; flex-direction: column;}
        .ressources_container { width: 95%; height: 50vh; overflow: scroll;}
        .chat_container { width: 95%; height: 50vh; overflow: scroll;}
        .general_information {width: 95%; height: 50vh; overflow: scroll;}
        .list_container {width:186px;}

    } 

    @media only screen and (max-width: 1177px){ 
        .graduation_icon { height: 0px; width: 0px;}
        .class_container {display: flex; flex-direction: column; min-width: }
        .text_all_classes { font-size: 0em;}
        .list_container {width:170px;}
        .ressources_container { width: 100%; margin-right: 0%; margin-left: 0%; height: 50vh; overflow: scroll;}
        .chat_container { width: 100%; height: 50vh; margin-right: 0%; margin-left: 0%; overflow: scroll;}
        .general_information {width: 100%; margin-right: 0%; margin-left: 0%; height: 50vh; overflow: scroll;}
    }

</style>