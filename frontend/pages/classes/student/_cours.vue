<template>
  <h1>Un cours en {{test}}</h1>
</template>

<script>
export default {
    data() {
        return {
            test : this.$route.params.cours
        }
    }
}
</script>

<style>

</style>