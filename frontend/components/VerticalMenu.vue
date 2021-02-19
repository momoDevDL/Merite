<template>
  <div class="vertical_menu_container">
    <div class="photo_name_container">
      <img src="../img/ellipse_1.png" class="photo"/>
      <div class="name">Cédric</div>
    </div>
      <div class="menu_top_container">
        <ul>
          <li><div class="personnal_space"><a href="#">Espace personnel</a></div></li>
          <li><div class="my_classes"><a href="#">Mes cours</a></div></li>
          <li><div class="my_grades"><a href="#">Mes notes</a></div></li>
          <li><div class="my_drive"><a href="#">Mon drive</a></div></li>
          <li><div class="my_mails"><a href="#">Mes e-mails</a></div></li>
          <li><div class="services"><a href="#"> Services </a></div></li>
          <li><div class="support"><a href="#">Support</a></div></li>
        </ul>
      </div>
      <div class="menu_buttom_container">
        <ul>
          <li><div class="help"><a href="#">Aide</a></div></li>
          <li><div class="params"><a href="#">Paramètres</a></div></li>
          <li><div class="sing_out"><a href="#">Déconnextion</a></div></li>
        </ul>
      </div>
      <!--<div class="copyright_merite" >
				Copyright <a href="http://Merite.com" target="_blank">Merite.com</a>
			</div> -->
      
      
  </div>
</template>

<style scoped>
  .name {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    justify-content: space-between;
  }

  .vertical_menu_container {
    width: 217px;
    position: relative;
    background:white;
  }

  .name {
	  font-size: 18px;
	  text-align: center;
	  line-height: 18px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    margin-top: 5%;
  }

  .photo_name_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top:20%;
    position: relative;
  }

  .menu_top_container {
    margin-top: 20%;
    left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative ;
  }

  .menu_buttom_container {
    margin-top:30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative ;
  }

  .copyright_merite {
    align-items: center;
    margin-left:30px;
		font-size: 12px;
		font-weight: bold;
		font-family: "Poppins", sans-serif;
    color: gray;
	} 

  ul li:hover a{
    padding-left: 10px;
    background-color: #f0f8ff;
  }

  ul li a {
    color: #215fff;
    display: block;
    padding: 12px;
    -webkit-border-radius: 57px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    transition: .4s;
  }
  .personnal_space {
    width: 200px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 18px;
    text-align: left;
    line-height: 18px;
    color: #215fff;
  }

  .support , .services, .my_mails, .my_drive, .my_grades, .my_classes, .help, .params, .sing_out{
	  width: 181px;
	  font-size: 18px;
	  text-align: left;
	  line-height: 18px;
    color:#215FFF;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
  }

  .photo {
    width: 111px;
    height: 104px;
  }

</style>
    