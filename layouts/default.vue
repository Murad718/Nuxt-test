<template> 
	<div>
		<Header />
		<Nuxt />
	</div>
</template>

<script>

	import {mapGetters, mapMutations} from 'vuex'	
	import Header from '@/components/Header'

	export default {
		components:{
			Header
		},
		methods:{
			...mapMutations({
	      setLoginIn:'user/setLoginIn',
	    }),
		},
		mounted(){
	    if(localStorage.getItem('token')){
	   		this.setLoginIn(true);
	   		setTimeout(this.fetchMessage, 500);
	    }
	  }
  }
</script>
