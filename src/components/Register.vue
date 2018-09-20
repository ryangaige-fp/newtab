<template>
    <div class="register container">
        <div class="row justify-content-around">
            <div class="col-6 p-5">
                <form @submit.prevent="register(user);user = {};">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input class="form-control" type="text" id="name" v-model="user.displayName" required>
                        <label for="email">Email</label>
                        <input class="form-control" type="email" id="email" v-model="user.email" required>
                        <label for="password">Password</label>
                        <input class="form-control" type="password" id="password" v-model="user.password" required>
                    </div>
                    <button class="btn btn-outline-dark" type="submit">Register</button>
                </form>
                <p>Already a user?
                    <em class="btn btn-link" @click="toggle">Login</em>
                </p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data() {
            return {
                user: {}
            }
        },
        computed: {},
        methods: {
            register(user) {
                this.$store.dispatch('register', user)
            },
            toggle() {
                this.$router.push("login")
            }
        },
        components: {}
    }
</script>

<style>

</style>