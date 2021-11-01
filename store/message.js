import { request } from '@/services/index.js'

export const state = () => ({
	messages:[],
})

export const mutations = {
	setMessages(state, messages){
		state.messages = messages;
	},	
}

export const actions = {
	async fetchMessages({commit}){	
		try{
			let messages = await request('message/','get');
			commit('setMessages', messages)
		}catch(err){
			console.log(err)
		}
	}, 
	async addMessage({commit,dispatch}, message){	
		try{
      let response = await request('message/','post', {...message});
      dispatch('fetchMessages');
    }catch (err) {
      console.log(err)
    }
	}, 
	async deleteMessage({commit,dispatch}, id){	
		try{
      let response = await request(`message/${id}`,'delete');
      dispatch('fetchMessages');
    }catch (err) {
      console.log(err)
    }
	},
	async updateMessage({commit,dispatch}, message){	
		try{
      let response = await request(`message/${message.id}`, 'put', {...message});
      dispatch('fetchMessages');
    }catch (err) {
      console.log(err)
    }
	},
}

export const getters = {
	messages(state){
		return state.messages;
	}
}