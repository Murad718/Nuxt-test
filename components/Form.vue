<template> 
  <form role="form">
    <div v-for="field,index of fields" :key="index" class="form-group">
      <label>{{field}}</label> <input v-model="message[field]" type="text" :placeholder="field" class="form-control">
    </div>
    <div>
      <button @click.prevent="addMessage(message)" class="btn btn-sm btn-primary float-right m-t-n-xs" type="submit"><strong>Send</strong></button><br/>
    </div>
  </form>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  props:[
    'fields',
  ],
  data(){
    return{
      message:{},
    }
  },
  methods:{
    ...mapActions({
      addMessage:'message/addMessage'
    }),
  },
  mounted(){
    for(let field of this.fields){
      this.message[field] = ''; 
    }
  }
}
</script>
