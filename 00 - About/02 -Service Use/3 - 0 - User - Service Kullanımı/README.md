
# 3 - 0 - User - Service Kullanımı

## Açıklama
 
 ```
User service kullanımı ve Kullanıcı işlemleri
 ```

## Kullanıcı - Tüm Veriler
 
 ```  			   			
			//! ----------- User ----------------------------- 	
				let user_all = await ctx.call('user.all');
					
				ctx.params.user_all = user_all  
				console.log('\u001b[' + 32 + 'm' + '---------- User  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(user_all) 
				console.log('\u001b[' + 32 + 'm' + '---------- User Son -------' + '\u001b[0m')  
			//! ----------- User Son ----------------------------- 

 ```

## Kullanıcı - Veri Arama
 
 ```  			   			
			//! ----------- User ----------------------------- 	
				let user_find = await ctx.call('user.find', {					
					id: 1
				})
						
				ctx.params.user_find = user_find  
				console.log('\u001b[' + 32 + 'm' + '---------- User  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(user_find) 
				console.log('\u001b[' + 32 + 'm' + '---------- User Son -------' + '\u001b[0m')  
			//! ----------- User Son ----------------------------- 

 ```
 
 ## Kullanıcı - Veri Token Arama
 
 ```  	 				   			
			//! ----------- User ----------------------------- 	
				let user_find_token = await ctx.call('user.find_token', {					
					userToken: "userToken"
				})
						
				ctx.params.user_find_token = user_find_token  
				console.log('\u001b[' + 32 + 'm' + '---------- User  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(user_find) 
				console.log('\u001b[' + 32 + 'm' + '---------- User Son -------' + '\u001b[0m')  
			//! ----------- User Son ----------------------------- 

 ```
 
  ## Kullanıcı - Veri Ekleme
 
 ```  	 				   			
  			   			
			//! ----------- User ----------------------------- 	
				let user_add = await ctx.call('user.add', {					
					name: "name ad",
					surname: "surname ad",
					username: "username ad",
					email: "email ad",
					tel: "tel ad",
					password: "password ad"
				})
						
				ctx.params.user_add = user_add  
				console.log('\u001b[' + 32 + 'm' + '---------- User  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(user_add) 
				console.log('\u001b[' + 32 + 'm' + '---------- User Son -------' + '\u001b[0m')  
			//! ----------- User Son ----------------------------- 

 ```
 
   ## Kullanıcı - Veri Güncelleme URL
 
 ```			   					   			
			//! ----------- User ----------------------------- 	
				let user_updateUrl = await ctx.call('user.updateUrl', {					
					userToken: "userToken2",
					role: "role user",
					name: "name ad",
					profil_ImageUrl_File: "C:\\Users\\ebuen\\Pictures\\1\\9.jpg",
					profil_ImageUrl_File_Check: 0,
					cover_ImageUrl_File: "C:\\Users\\ebuen\\Pictures\\1\\10.jpg",
					cover_ImageUrl_File_Check: 0,
					OnlineStatus: 0					
				})
						
				ctx.params.user_updateUrl = user_updateUrl  
				console.log('\u001b[' + 32 + 'm' + '---------- User  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(user_updateUrl) 
				console.log('\u001b[' + 32 + 'm' + '---------- User Son -------' + '\u001b[0m')  
			//! ----------- User Son ----------------------------- 
 ```
 
 ## Kullanıcı - Veri Silme
 
 ```	   					   				   			
			//! ----------- User ----------------------------- 	
				let user_delete = await ctx.call('user.delete', {					
					id: 1637176756424,				
					userToken: "userToken2"			
				})
						
				ctx.params.user_delete = user_delete  
				console.log('\u001b[' + 32 + 'm' + '---------- User  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(user_delete) 
				console.log('\u001b[' + 32 + 'm' + '---------- User Son -------' + '\u001b[0m')  
			//! ----------- User Son ----------------------------- 
 ```
 
  ## Kullanıcı - Üye Girişi
 
 ```	  					   				   			   			
			//! ----------- User ----------------------------- 	
				let user_loginOnline = await ctx.call('user.loginOnline', {					
					email: "enes3@gmail.com",				
					password: "123"			
				})
						
				ctx.params.user_loginOnline = user_loginOnline  
				console.log('\u001b[' + 32 + 'm' + '---------- User  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(user_loginOnline) 
				console.log('\u001b[' + 32 + 'm' + '---------- User Son -------' + '\u001b[0m')  
			//! ----------- User Son ----------------------------- 
 ```
 
   ## Kullanıcı - Üye Çıkışı
 
 ```	  					   				   			   					   			
			//! ----------- User ----------------------------- 	
				let user_loginOut = await ctx.call('user.loginOut', {					
					userToken: "userToken2"	
				})
						
				ctx.params.user_loginOut = user_loginOut  
				console.log('\u001b[' + 32 + 'm' + '---------- User  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(user_loginOut) 
				console.log('\u001b[' + 32 + 'm' + '---------- User Son -------' + '\u001b[0m')  
			//! ----------- User Son ----------------------------- 
 ```
