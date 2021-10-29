<template> 
  <header>
  	<nav class="wrapper">
      <nuxt-link to="/">Home</nuxt-link>
      <template v-if="loginIn">
        <nuxt-link to="/login">User</nuxt-link>
      </template>
      <template v-else>
        <nuxt-link to="/login">Sign In</nuxt-link>
      </template> 
    </nav>
  </header> 
</template>

<script>
	export default {
    data(){
      return{
        loginIn:false,
      }
    },
    mounted(){
      if(localStorage.getItem('token')){
        this.loginIn = true;
      }
    },
  }
</script>
