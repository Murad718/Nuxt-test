import { request } from '@/services/index.js'

export const state = () => ({
	loginIn:false,
})

export const mutations = {
	setLoginIn(state, boolean){
		state.loginIn = boolean;
	},	
}

export const actions = {
	async login({commit},user){	
		try{
      let response = await request('auth/token/login/','post',user);
     	localStorage.setItem('token', response["auth_token"]);
     	localStorage.setItem('user', user.email);
     	commit('setLoginIn', true);
    }catch (err) {
      console.log(err)
    }
	}, 
	async logout({commit}){	
		try{
     	localStorage.removeItem('token');
     	commit('setLoginIn', false);
    }catch (err) {
      console.log(err)
    }
	},
}

export const getters = {
	loginIn(state){
		return state.loginIn;
	}
}