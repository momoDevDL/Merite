<template>
  <div class="personnal_info">
    <div class="card">
      <div class="text_personnal_info">Vos informations</div>
      <div class="first_second_name_row">
        <div class="text_first_second_name">Nom prénom</div>
        <div class="name"><!--{{$auth.$storage.getUniversal('user').username}}--></div>
      </div>
      <hr class="line1">
      <div class="mail_row">
        <div class="text_mail">Couriel</div>
        <div class="mail">
          <a href="mailto:ana@gmail.com" target="_blank"><!--{{$auth.$storage.getUniversal('user').email}}--></a>
        </div>
      </div>
      <hr class="line1">
      <div class="nb_student_row">
        <div class="text_nb_student">N°étudiant</div>
        <div class="nb_student">22009278</div>
      </div>
      <hr class="line1">
      <div class="ine_row">
        <div class="text_ine">INE</div>
        <div class="ine">1601016122Y<br /><br /></div>
      </div>
      <hr class="line2">
    </div>
  </div>
</template>

<style scoped>
  .personnal_info {
    background: white;
    width:25%;
    height: 240px;
    display: flex;
    flex-direction: column;
    margin-left: 4%;
    -ms-border-radius: 24px;
    -o-border-radius: 24px;
    -moz-border-radius: 24px;
    -webkit-border-radius: 24px;
    border-radius: 24px;
  }

  .card {
    height: 100%;
  }

  .text_personnal_info {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    line-height: 18px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    margin-left: 9%;
    margin-top: 7%;
  }

  hr.line1 {
    border: 0.1px solid ;
    margin-left: 9%;
    margin-right: 9%;
    margin-top: 2%;
    color:#E8E8E8;
  }

  hr.line2 {
    border: 0.1px solid ;
    margin-left: 9%;
    margin-right: 9%;
    color:#E8E8E8;
  }

  .first_second_name_row, .mail_row , .nb_student_row, .ine_row{
    flex-direction: row;
    display: flex;
    width: 85%;
    margin-top: 5%;
    margin-left: 9%;
  }

  .text_first_second_name , .text_mail, .text_nb_student, .text_ine {
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    text-align: left;
  }

  .name{
    margin-left: 4%;
    font-size: 14px;
    text-align: left;
    color: #4d86f4;
    font-family: "Poppins", sans-serif;
  }

  .mail {
    font-size: 14px;
    text-align: left;
    color: #4d86f4;
    margin-left: 21%;
    font-family: "Poppins", sans-serif;
  }

  .nb_student {
    font-size: 14px;
    text-align: left;
    color: #4d86f4;
    font-family: "Poppins", sans-serif;
    margin-left: 11%;
  }

  .ine {
    margin-left: 32%;
    font-size: 14px;
    text-align: left;
    color: #4d86f4;
    font-family: "Poppins", sans-serif;
  }

  @media only screen and (max-width: 5000px){  
    .personnal_info { width : 25%; height: 246px; }
  
  }

  @media only screen and (max-width: 1000px){  
    .personnal_info { width : 35%; height: 246px; }
  
  }

  @media only screen and (max-width: 900px){  
    .personnal_info { width : 50%; height: 246px; }
  
  }

  @media only screen and (max-width: 700px){ 
    .personnal_info { width : 80%; height: 246px;}
    .mail {margin-left: 18%;}
    .nb_student {margin-left: 9%;}
    .ine {margin-left: 27%;}
    .first_second_name_row, .mail_row , .nb_student_row, .ine_row {
      margin-top:5%;
    }
  }


</style>