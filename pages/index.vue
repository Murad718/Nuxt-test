<template>
    <main>
      <template v-if="loginIn">
        <div class="ibox-content">
          <div class="row">
            <div class="col-sm-6 b-r"><h3 class="m-t-none m-b">Message</h3>
              <From :fields="['title', 'body']" />
            </div>
            <div class="col-sm-6 b-r"><h3 class="m-t-none m-b">Find</h3>
              <form role="form">
                <div class="form-group">
                  <label>Find</label> <input v-model="findMessages" type="text" placeholder="Enter text" class="form-control">
                </div>
              </form>
            </div>
          </div>
        </div>
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
import From from '@/components/Form'

export default {
  components:{
    Message,
    Header,
    From,
  },
  data(){
    return{
      findMessages:'',
      lastMessages:[],
      timeoutFind:false,
    }
  },
  methods:{
    ...mapActions({
      fetchMessage:'message/fetchMessages',
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
      setInterval(this.fetchMessage, 500);
    }
  }
}
</script>