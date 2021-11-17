
# 6 - 0 - Mesaj - Service Kullanımı

## Açıklama
 
 ```
Message service kullanımı ve Mesaj işlemleri
 ```
 
## Mesaj - Tüm Veriler
 
 ```	
 
				//! ----------- Mesaj ----------------------------- 	
					let message_all = await ctx.call('message.all');
							
					ctx.params.message_all = message_all  
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(message_all) 
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj Son -------' + '\u001b[0m')  
				//! ----------- Mesaj Son ----------------------------- 

 ```
 
 ## Mesaj - Veri Arama
 
 ```	
 
				//! ----------- Mesaj ----------------------------- 	
					let message_find = await ctx.call('message.find', {					
						id: 1
					})
							
					ctx.params.message_find = message_find  
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(message_find) 
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj Son -------' + '\u001b[0m')  
				//! ----------- Mesaj Son ----------------------------- 


 ```
 
  ## Mesaj - Veri Token Arama
 
 ```	
				//! ----------- Mesaj ----------------------------- 	
					let message_find_token = await ctx.call('message.find_token', {					
						MessageToken: "MessageToken1"
					})
							
					ctx.params.message_find_token = message_find_token  
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(message_find_token) 
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj Son -------' + '\u001b[0m')  
				//! ----------- Mesaj Son ----------------------------- 


 ```
 
  ## Mesaj - Veri Ekleme
 
 ```	
				//! ----------- Mesaj ----------------------------- 	
					let message_add = await ctx.call('message.add', {					
						FromRole: "Admin",
						FromUserToken: "userToken",
						ToRole: "User",
						ToUserToken: "userTokenTo",
						Subject: "Subject",
						Message: "Message"
					})
							
					ctx.params.message_add = message_add  
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(message_add) 
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj Son -------' + '\u001b[0m')  
				//! ----------- Mesaj Son ----------------------------- 


 ```
 
 ## Mesaj - Veri Güncelleme
 
 ```	
				//! ----------- Mesaj ----------------------------- 	
					let message_update = await ctx.call('message.update', {					
						userToken: "userToken",
						MessageToken: "MessageToken1",					
						Subject: "Subject guncelleme",
						Message: "Message"
					})
							
					ctx.params.message_update = message_update  
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(message_update) 
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj Son -------' + '\u001b[0m')  
				//! ----------- Mesaj Son ----------------------------- 

 ```
 
  ## Mesaj - Veri Silme
 
 ```	
				//! ----------- Mesaj ----------------------------- 	
					let message_delete = await ctx.call('message.delete', {					
						id: 1637188479888,
						userToken: "userToken"					
					})
							
					ctx.params.message_delete = message_delete  
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(message_delete) 
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj Son -------' + '\u001b[0m')  
				//! ----------- Mesaj Son ----------------------------- 
 

 ```
 
   ## Mesaj - Veri Silinen Kutusuna Gönder
 
 ```	

				//! ----------- Mesaj ----------------------------- 	
					let message_deleted_update = await ctx.call('message.deleted_update', {					
						id: 1,
						userToken: "userToken"					
					})
							
					ctx.params.message_deleted_update = message_deleted_update  
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(message_deleted_update) 
					console.log('\u001b[' + 32 + 'm' + '---------- Mesaj Son -------' + '\u001b[0m')  
				//! ----------- Mesaj Son -----------------------------  

 ```
