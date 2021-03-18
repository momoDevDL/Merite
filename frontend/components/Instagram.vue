<template>
  <div class="instagram_container">
    <div class="instagram_text">Instagram</div>  
    <div class="img_instagram">
      <div class="name_university_text">UT3 - Paul Sabatier</div>
      <div class="text">
        Nunc at mattis non libero aliquam nunc nisl et sed.
      </div>
    </div>
  </div>
</template>
  
<style scoped>
  .instagram_container{
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
    background: white;
    margin-top:2%;
  }

  .instagram_text {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    line-height: 18px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    margin-left: 9%;
    margin-top: 7%;
  }
  .img_instagram{
    margin-left: 4%;
    margin-top:10%;
    width: 88%;
    height: 186px;
    -ms-border-radius: 24px;
    -o-border-radius: 24px;
    -moz-border-radius: 24px;
    -webkit-border-radius: 24px;
    border-radius: 24px;
    background: rgba(247.56, 248.31, 255, 1);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .text {
    margin-bottom: 20%;
    margin-left: 5%;
    width: 228px;
    height: 34px;
    font-size: 14px;
    text-align: left;
    line-height: 14px;
    font-family: "Poppins", sans-serif;
  }

  .name_university_text {
    margin-left: 5%;
    margin-top: 8%;
    width: 235.06px;
    height: 34px;
    overflow: hidden;
    font-size: 14px;
    text-align: left;
    line-height: 14px;
  }

  @media only screen and (max-width: 5000px){  
    .instagram_container { width : 25%; height: 246px; }
  
  }

  @media only screen and (max-width: 1000px){  
    .instagram_container { width : 35%; height: 246px; }
  
  }

  @media only screen and (max-width: 900px){  
    .instagram_container { width : 50%; height: 246px; }
  
  }

  @media only screen and (max-width: 700px){ 
    .instagram_container { width : 80%; height: 246px;}
  }
</style>