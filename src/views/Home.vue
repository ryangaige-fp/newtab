<template>
  <div class="home">

    <dashboard></dashboard>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Dashboard from '@/components/Dashboard.vue'
  import Register from '@/components/Register.vue'
  import Login from '@/components/Login.vue'

  export default {
    name: 'home',
    components: {
      Dashboard
    }
  }
</script>