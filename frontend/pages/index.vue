<template>
  <div class="ana">
    <div id="content-container">
      <div id="home">
        <div id="background"></div>
        <img src="../img/merite.png" id="merite" />
        <div id="school_name"> Paul Sabatier </div>
        <Timetable></Timetable>
        <PersonnalInfo></PersonnalInfo>
        <PersonnalNotes></PersonnalNotes>
        <Instagram></Instagram>
        <Classes></Classes>
        <VerticalMenu></VerticalMenu>
        <img src="../img/ellipse_1.png" id="photo" />
        <a href="#"><img src="../img/vector.png" id="notifications" /></a>
        <a href="#"><img src="../img/vector_ek3.png" id="vector"></a>
        <div id="copyright_merite">
          <span class="char"> </span> Copyright <a href="http://Merite.com" target="_blank">Merite.com</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


  .ana {
    img {
      position: absolute;
      display: block;
      margin: 0px;
      border: none;
      padding: 0px;
    }

    div {
      position: absolute;
    }

    #content-container {
      display: table;
      position: relative;
      margin-left: auto;
      margin-right: auto;
    }

    #content-container>div {
      position: relative;
      top: inherit;
    }

    #home {
      width: 1440px;
      height: 1024px;
    }

    #background {
      top: 0px;
      left: 0px;
      width: 1440px;
      height: 1024px;
      background: rgba(245, 248, 253, 1);
    }

    #school_name {
      top: 79px;
      left: 283px;
      width: 242px;
      height: 50px;
      overflow: hidden;
      font-family: "Montserrat", sans-serif;
      font-size: 24px;
      text-transform: uppercase;
      text-align: left;
      line-height: 24px;
      color: #2514FC;
      font-weight: bold;
    }

    #copyright_merite {
      top: 981px;
      left: -51px;
      width: 321px;
      height: 47px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      line-height: 12px;
      font-family: "Poppins", sans-serif;
    }


    #notifications {
      top: 50px;
      left: 1353px;
      width: 37.42px;
      height: 40.64px;
    }

    #vector {
      top: 162px;
      left: 1353px;
      width: 43px;
      height: 35px;
    }

    #merite {
      top: 20px;
      left: 280px;
      height: 50px;
    }

    #photo {
      top: 44px;
      left: 53px;
      width: 111px;
      height: 104px;
    }


  }

</style>
