<template>
  <div class="home_layout_container">
    <VerticalMenu class="vertical_menu" :class="{open:sidebar}"></VerticalMenu>
    <div class="right_container">
      <div class="nav_bar">  
        <div class="logo">
          <img src="../img/merite.png" class="merite"/> 
          <div class="school_name" > Paul Sabatier </div>
        </div>
        <div class="nav_burger_container">
          <a href="#"><img src="../assets/home/notif.svg" id="notifications"/></a>
          <button class="menu" > 
            <label for="check">
              <input type="checkbox" id="check" @click="sidebar = !sidebar"/> 
              <span></span>
              <span></span>
              <span></span>
            </label>
          </button>
        </div>
      </div>
      <Nuxt class="nuxt_home" />
    </div>
    <div class="background_layout" :class="{active:sidebar}" @click="sidebar=false"></div>
  </div>
</template>

<script>

import VerticalMenu from '~/components/VerticalMenu.vue';

export default {
  middleware : ["forbidAdmin"],
  components : {
    VerticalMenu
  },
  data() {
    return {
      sidebar : false
		}
  }
}
</script>

<style lang="scss" scoped>

  .home_layout_container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background:rgba(245,248,253,1);
    overflow-x:hidden;
  }

  button {
  outline: none;
}

  .right_container {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 217px);
    margin-left: 217px;
    padding: 0 50px;
  }

  .nav_bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 100%;
    padding-top: 30px;
  }

  .merite {
    width: 200px;
  }
  
  .school_name {
    font-family: "Montserrat" , sans-serif;
		font-size: 24px;
		text-transform: uppercase;
		line-height: 24px;
    color:#2514FC;
    font-weight: bold;
	}

  .logo {
    display: flex;
    flex-direction: column;
  }
  

  .vertical_menu {
    position: absolute;
    top : 0px;
    left: 0px;
    transition: .3s;
    &.open{ left:0px};
    background: white;
    z-index: 1000;
    height: 100vh;
  }

  .nuxt_home {
    position: relative;

  }

  .nav_burger_container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .menu {
    display: none;
    z-index: 1000;
  }

  @media only screen and (max-width: 700px){ 
    	.right_container {margin-left: 0px; width: 100vw;padding: 0 10px;}
      .vertical_menu {left:-217px; &.open{ left:0px};}
      .menu {display: inline-block;}
  } 

  .background_layout {
    z-index: 5;
    background: black;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
    transition: .3s;
    pointer-events: none;
    &.active { opacity: 0.2; cursor: pointer; pointer-events: all;}

  }

  label{
    display:flex;
    flex-direction:column;
    width:50px;
    cursor:pointer;
    margin-left: 20px;
  }

  label span{
    background: black;
    border-radius:10px;
    height:4px;
    margin: 5px 0;
    transition: .4s  cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }


  span:nth-of-type(1){
    width:50%;
  }

  span:nth-of-type(2){
    width:80%;
  }


  span:nth-of-type(3){
    width:75%;
  }

  input[type="checkbox"]{
    display:none;
  }


  input[type="checkbox"]:checked ~ span:nth-of-type(1){
    transform-origin:bottom;
    transform:rotatez(45deg) translate(6px,0px);
    background: white;
  }

  input[type="checkbox"]:checked ~ span:nth-of-type(2){
    width:100%;
    transform-origin:top;
    transform:rotatez(-45deg);
    background: white;
    
  }

  input[type="checkbox"]:checked ~ span:nth-of-type(3){
    transform-origin:bottom;
    width:50%;
    transform: translate(22px,-5px) rotatez(45deg);
    background: white;
  }

  #notifications {
    height: 40px;
  }

</style>