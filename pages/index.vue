<template> 
  <main>
    <h1>Сообщения</h1>
    <template v-if="loginIn">
      <form>
        <input v-model="message.title" placeholder="Тема..." type="text">
        <textarea v-model="message.body" placeholder="Сообщение..." type="text"></textarea>
        <button @click.prevent="addMessage(message)">Создать</button><br/><br/>
        <input v-model="findMessages" class="filter" placeholder="Поиск по заголовку..." type="text">
      </form>
      <section v-if="messages.length >= 1">
        <Message v-for="message,index of filterMessages" :message="{...message}"  :key="index" />
      </section> 
      <section class="message_conteiner" v-else>
        <div>Сообщений нет</div>
      </section> 
    </template>
    <template v-else>
      <div>
        Для отправки сообщений вам необходимо авторизоваться
      </div>
    </template>
  </main>   
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import Message from '@/components/Message'
import Header from '@/components/Header'

export default {
  components:{
    Message,
    Header,
  },
  data(){
    return{
      findMessages:'',
      lastMessages:[],
      timeoutFind:false,
      message:{
        title:'',
        body:'',
      },
    }
  },
  methods:{
    ...mapActions({
      fetchMessage:'message/fetchMessages',
      addMessage:'message/addMessage'
    }),
  },
  computed:{
    ...mapGetters({
      messages:'message/messages',
      loginIn:'user/loginIn',
    }),
    filterMessages(){
      if(this.timeoutFind) return this.lastMessages;

      if(this.findMessages.trim() == ''){
        this.timeoutFind = true;
        setTimeout(() => this.timeoutFind = false, 500);
        this.lastMessages = this.messages;
        return this.lastMessages;
      }else{
        let arr = this.messages.filter(message => {
          return message.title.toLowerCase().includes(this.findMessages.trim().toLowerCase())
        });
        this.timeoutFind = true;
        setTimeout(() => this.timeoutFind = false, 500);
        this.lastMessages = arr;
        return this.lastMessages;
      }
    }
  },
  mounted(){
    if(localStorage.getItem('token')){
      this.fetchMessage();
    }
  }
}
</script>
