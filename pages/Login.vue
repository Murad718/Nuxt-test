<template> 
  <main v-if="!loginIn">
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <p>Login in. To see it in action.</p>
            <form class="m-t" role="form" action="index.html">
                <div class="form-group">
                    <input v-model="user.email" type="email" class="form-control" placeholder="Username" required="">
                </div>
                <div class="form-group">
                    <input v-model="user.password" type="password" class="form-control" placeholder="Password" required="">
                </div>
                <button type="submit" @click.prevent="login(user)" class="btn btn-primary block full-width m-b">Login</button>
            </form>
        </div>
    </div>
  </main>
  <main v-else>
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <p>{{email}}</p>
            <form class="m-t" role="form" action="index.html">
                <button type="submit" @click.prevent="logout(); loginIn = false" class="btn btn-primary block full-width m-b">Logout</button>
            </form>
        </div>
    </div>
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
