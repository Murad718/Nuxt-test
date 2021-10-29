<template> 
  <main v-if="!loginIn">
    <h1>Вход</h1>
    <form>
    	<input v-model="user.email" placeholder="Email" type="email">  
    	<input v-model="user.password" placeholder="Password" type="password"> 
    	<button @click.prevent="login(user)">Войти</button>
    </form>
  </main>
  <main v-else>
    <h1>Профиль</h1>
    <span>{{email}}</span>
    <button @click.prevent="logout(); loginIn = false">Выйти</button>
  </main>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  data(){
    return{
      email:'',
      user:{
        email:'',
        password:'',
      },
    }
  },
  methods:{
    ...mapActions({
      login:'user/login',
      logout:'user/logout'
    }),
  },
  computed:{
    ...mapGetters({
      loginIn:'user/loginIn',
    }),
  },  
  mounted(){
    if(localStorage.getItem('token')){
      this.email = localStorage.getItem('user');
    }
  }
}
</script>
