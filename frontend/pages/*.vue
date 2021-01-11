<template>
  <h1> {{ url }} n'est pas connu sur ce domaine tokentoken</h1>
</template>

<script>
export default {
    data() {
        return {
            url : ""
        }
    },
    created() {
        this.url = this.$route.path
    }
}
</script>

<style>

</style>