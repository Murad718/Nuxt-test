import axios from 'axios'

export const request = async (url,method,body = {}) => {
	if(localStorage.getItem('token')){
		const instanceAuth = axios.create({
	  	headers: { 'Authorization' : `Token ${localStorage.getItem('token')}` } // Заголовок запроса
		});

		let response = await instanceAuth[`${method}`](`https://test.praesens.ru/api/v1/${url}`,body);	
		return response.data
	}else{
		let response = await axios[`${method}`](`https://test.praesens.ru/api/v1/${url}`,body);	
		return response.data
	}
}