<template>
    <div class="mail">
        <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 6L12 13L2 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        <div v-if="notification" class="bubble"></div>
    </div>
</template>

<script>
export default {
    props : ['notification']
}
</script>

<style scoped>

.mail {
    position: relative;
}

.bubble {
    position: absolute;
    top: 0;
    right: 0;
    height: 10px;
    width: 10px;
    background: #2818fc;
    border-radius: 50%;
    transform: translate(2px,0);
}
</style>