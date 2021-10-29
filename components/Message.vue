<template> 
  <article class="message">
  	<h2>{{message.title}}</h2>
  	<p>{{message.body}}</p>
    <form v-if="update">
      <input v-model="message.title"  placeholder="Тема..." type="text">
      <textarea v-model="message.body"  placeholder="Сообщение..." type="text"></textarea>
      <button @click.prevent="updateMessage(message, message.id); update = false">Сохранить</button>
    </form>
  	<div class="message_delete message_button" @click="deleteMessage(message.id)"><i class="far fa-trash-alt"></i></div>
    <div class="message_update message_button" @click="update = true"><i class="fas fa-pencil-alt"></i></div>
  </article>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'	

export default {
	props:[
		'message',
	],
  data(){
    return{
      update:false,
    }
  },
	methods:{
    ...mapActions({
      deleteMessage:'message/deleteMessage',
      updateMessage:'message/updateMessage',
    }),
  },
}
</script>
