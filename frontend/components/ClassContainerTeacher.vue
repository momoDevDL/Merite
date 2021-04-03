<template>
    <div class="class_container">
        <div class="general_information">
            <div class="text_general_information">Généralités</div>
                <div class="class_ressource_container">
                <div class="icon_container">
                    <img src="../img/pencil.png" class="pencil_icon">
                    <img src="../img/trash.png" class="trash_icon">
                </div>
            </div>
        </div>
        <div class="resources_chat_container">
            <div class="ressources_container">
                <div class="header_reassources">
                    <div class="text_general_information">Ressources & Dépot</div>
                    <img src="../img/plus.png" class="plus_icon">
                </div>
                <div class="class_ressource_container">
                    <div class="icon_container_ressource">
                        <img src="../img/plus.png" class="plus_icon">
                        <img src="../img/pencil.png" class="pencil_icon_ress">
                        <img src="../img/trash.png" class="trash_icon_ress">
                    </div>
                </div>
                <div class="class_ressource_container_2"></div>
            </div>
            <div class="chat_container">
                <div class="text_general_information">Chat & Notifications</div>
                <div class="class_ressource_container"></div>
                <div class="class_ressource_container"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .class_container {
        width: 100%;
    }
    .general_information {
        background: #DDE4F8;
        height: 30%;
        width: 95%;
        margin-top: 3%;
        margin-left: 3%;
        border-radius: 24px;
    }

    .text_general_information {
        font-size: 20px;
        text-align: left;
        line-height: 18px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        margin-left: 25px;
        margin-top: 20px;
        
    }

    .resources_chat_container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 70%;
    }

    .ressources_container {
        background: #DDE4F8;
        width: 60%;
        margin-top: 3%;
        margin-left: 3%;
        border-radius: 24px;
    }

    .chat_container {
        background: #DDE4F8;
        width: 40%;
        margin-top: 3%;
        margin-left: 3%;
        border-radius: 24px;
        margin-right: 3%;
    }

    .class_ressource_container {
        background: #E3E3E3;
        border-radius: 24px;
        height: 40%;
        margin-top: 3%;
        margin-left: 3%;
        margin-right: 5%;
    }

    .plus_icon {
        height: 25px;
        width: 25px;
        margin-right: 3%;
        margin-top: 20px;
    }

    .header_reassources {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .pencil_icon {
        height: 30px;
        width: 30px;
        margin-right: 3%;
    }

    .trash_icon{
        height: 25px;
        width: 25px;
        margin-right: 3%;
    }

    .icon_container {
        display: flex;
        flex-direction: column;
        margin-left: 100%;
    }

    .icon_container_ressource {
        display: flex;
        flex-direction: row;
        margin-left: 85%;
    }

    .trash_icon_ress {
        height: 25px;
        width: 25px;
        margin-right: 3%;
        margin-top: 20px;
    }

    .pencil_icon_ress {
        height: 30px;
        width: 30px;
        margin-right: 3%;
        margin-top: 20px;
    }

    .class_ressource_container_2 {
        background: #E3E3E3;
        border-radius: 24px;
        height: 30%;
        margin-top: 3%;
        margin-left: 3%;
        margin-right: 5%;
    }

    @media only screen and (max-width: 1246px){ 
    	.resources_chat_container {display: flex; flex-direction: column;}
        .ressources_container { width: 95%; height: 50vh; overflow: scroll;}
        .chat_container { width: 95%; height: 50vh; overflow: scroll;}
        .general_information {width: 95%; height: 30vh; overflow: scroll;}
    } 

    @media only screen and (max-width: 1177px){ 
        .class_container {display: flex; flex-direction: column; min-width: }
        .ressources_container { width: 100%; margin-right: 0%; margin-left: 0%; height: 50vh; overflow: scroll;}
        .chat_container { width: 100%; height: 50vh; margin-right: 0%; margin-left: 0%; overflow: scroll;}
        .general_information {width: 100%; margin-right: 0%; margin-left: 0%; height: 30vh; overflow: scroll;}
    }

</style>