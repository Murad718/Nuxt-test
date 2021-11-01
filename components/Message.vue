<template> 
  <article class="message">
  	<h2>{{message.title}}</h2>
  	<p>{{message.body}}</p>
    <form v-if="update" role="form">
      <div class="form-group">
          <label>Title</label> <input v-model="messageUpdate.title"  type="text" placeholder="Enter title" class="form-control" />
      </div> 
      <div class="form-group">
          <label>Body</label> <textarea v-model="messageUpdate.body" type="text" placeholder="Enter body" class="form-control"></textarea>
      </div>  
      <div>
        <button @click.prevent="updateMessage(messageUpdate); update = false" class="btn btn-sm btn-primary float-right m-t-n-xs" type="submit"><strong>Update</strong></button><br/>
      </div>
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
      messageUpdate:{
        title:this.message.title,
        body:this.message.body,
        id:this.message.id,
      },
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
