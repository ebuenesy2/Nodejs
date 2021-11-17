
# 4 - 0 - Admin - Service Kullanımı

## Açıklama
 
 ```
Admin service kullanımı ve Admin işlemleri

 ```

## Admin  - Tüm Veriler
 
 ```						
		//! ----------- Admin ----------------------------- 	
			let admin_all = await ctx.call('admin.all');
					
			ctx.params.admin_all = admin_all  
			console.log('\u001b[' + 32 + 'm' + '---------- Admin  ----------' + '\u001b[0m')  

			//Console Yazma
			console.log(admin_all) 
			console.log('\u001b[' + 32 + 'm' + '---------- Admin Son -------' + '\u001b[0m')  
		//! ----------- Admin Son ----------------------------- 

 ```
 
 ## Admin  - Veri Arama
 
 ```												
		//! ----------- Admin ----------------------------- 	
			let admin_find = await ctx.call('admin.find', {					
				id: 1
			})
					
			ctx.params.admin_find = admin_find  
			console.log('\u001b[' + 32 + 'm' + '---------- Admin  ----------' + '\u001b[0m')  

			//Console Yazma
			console.log(admin_find) 
			console.log('\u001b[' + 32 + 'm' + '---------- Admin Son -------' + '\u001b[0m')  
		//! ----------- Admin Son ----------------------------- 

 ```
 
  ## Admin  - Veri Token Arama
 
 ```																		
		//! ----------- Admin ----------------------------- 	
			let admin_find_token = await ctx.call('admin.find_token', {					
				userToken: "userToken"
			})
					
			ctx.params.admin_find_token = admin_find_token  
			console.log('\u001b[' + 32 + 'm' + '---------- Admin  ----------' + '\u001b[0m')  

			//Console Yazma
			console.log(admin_find_token) 
			console.log('\u001b[' + 32 + 'm' + '---------- Admin Son -------' + '\u001b[0m')  
		//! ----------- Admin Son ----------------------------- 

 ```
 
