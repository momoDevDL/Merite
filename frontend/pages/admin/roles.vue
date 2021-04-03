<template>
    <div>
        <v-col cols="17" sm="9">
            <v-text-field v-model="insertedName" placeholder="Ex : DUPONT Jean" solo prepend-inner-icon="mdi-magnify">
            </v-text-field>
        </v-col>
    </div>
</template>
<script>
export default {
    auth:false,
    layout : 'dashboardAdmin',
    data() {
        return {
            userName : null,
            insertedName : ""
        };
    },
    async getName() {
        this.userName = (await axios.get("http://localhost:8080/user"))
    },
    methods: {

    }

}
</script>
<style scoped>

</style>