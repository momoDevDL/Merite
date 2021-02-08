<template>
  <div id="personnal_info">
    <div id="container_personnal_info"></div>
    <div id="text_personnal_info">Vos informations</div>
    <div id="text_first_second_name">Nom prénom</div>
    <div id="text_mail">Couriel</div>
    <div id="text_nb_student">N°étudiant</div>
    <div id="text_ine">INE</div>
	<div id="name">{{$auth.$storage.getUniversal('user').username}}</div>
    <div id="mail">
      <a :href="`mailto:${$cookies.get('email')}`" target="_blank">{{$auth.$storage.getUniversal('user').email}}</a>
    </div>
    <div id="nb_student">22009278<br /><br /><br /><br /></div>
    <div id="ine">1601016122Y<br /><br /></div>
  </div>
</template>

<style scoped>
#personnal_info {
  top: 436px;
  left: 276px;
  width: 338px;
  height: 246px;
}

#container_personnal_info {
  width: 338px;
  height: 246px;
  -ms-border-radius: 24px;
  -o-border-radius: 24px;
  -moz-border-radius: 24px;
  -webkit-border-radius: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 1);
}

#text_personnal_info {
  top: 23px;
  left: 31px;
  width: 219px;
  height: 37px;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  line-height: 18px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}

#text_first_second_name {
  top: 78px;
  left: 31px;
  height: 34px;
  font-size: 14px;
  text-align: left;
  line-height: 14px;
  font-family: "Poppins", sans-serif;
}

#text_mail {
  top: 112px;
  left: 31px;
  width: 104.13px;
  height: 34px;
  font-size: 14px;
  text-align: left;
  line-height: 14px;
  font-family: "Poppins", sans-serif;
}

#text_nb_student {
  top: 146px;
  left: 31px;
  height: 34px;
  font-size: 14px;
  text-align: left;
  line-height: 14px;
  font-family: "Poppins", sans-serif;
}

#text_ine {
  top: 180px;
  left: 31px;
  width: 104.13px;
  height: 34px;
  font-size: 14px;
  text-align: left;
  line-height: 14px;
  font-family: "Poppins", sans-serif;
}

#name {
  top: 78px;
  left: 157px;
  width: 174.06px;
  height: 34px;
  font-size: 14px;
  text-align: left;
  line-height: 14px;
  color: #4d86f4;
  font-family: "Poppins", sans-serif;
}

#mail {
  top: 112px;
  left: 157px;
  width: 174.06px;
  height: 34px;
  font-size: 14px;
  text-align: left;
  line-height: 14px;
  color: #4d86f4;
  font-family: "Poppins", sans-serif;
}

#nb_student {
  top: 146px;
  left: 157px;
  width: 174.06px;
  height: 34px;
  font-size: 14px;
  text-align: left;
  line-height: 14px;
  color: #4d86f4;
  font-family: "Poppins", sans-serif;
}

#ine {
  top: 180px;
  left: 157px;
  width: 174.06px;
  height: 34px;
  font-size: 14px;
  text-align: left;
  line-height: 14px;
  color: #4d86f4;
  font-family: "Poppins", sans-serif;
}
</style>