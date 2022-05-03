
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
  ## Admin  - Veri Ekleme
 
 ```																		
							
		//! ----------- Admin ----------------------------- 	
			let admin_add = await ctx.call('admin.add', {					
				name: "name ad",
				surname: "surname ad",
				username: "username ad",
				email: "email ad",
				tel: "tel ad",
				password: "password ad"
			})
					
			ctx.params.admin_add = admin_add  
			console.log('\u001b[' + 32 + 'm' + '---------- Admin  ----------' + '\u001b[0m')  

			//Console Yazma
			console.log(admin_add) 
			console.log('\u001b[' + 32 + 'm' + '---------- Admin Son -------' + '\u001b[0m')  
		//! ----------- Admin Son ----------------------------- 

 ```
 
  ## Admin  - Veri Güncelleme URL
 
 ```																				                        							
		//! ----------- Admin ----------------------------- 	
			let admin_updateUrl = await ctx.call('admin.updateUrl', {					
				userToken: "userToken2",
   				role: "role admin",
   				name: "name ad",
   				profil_ImageUrl_File: "C:\\Users\\ebuen\\Pictures\\1\\9.jpg",
   				profil_ImageUrl_File_Check: 0,
   				cover_ImageUrl_File: "C:\\Users\\ebuen\\Pictures\\1\\10.jpg",
   				cover_ImageUrl_File_Check: 0,
   				OnlineStatus: 0			
			})
					
			ctx.params.admin_updateUrl = admin_updateUrl  
			console.log('\u001b[' + 32 + 'm' + '---------- Admin  ----------' + '\u001b[0m')  

			//Console Yazma
			console.log(admin_updateUrl) 
			console.log('\u001b[' + 32 + 'm' + '---------- Admin Son -------' + '\u001b[0m')  
		//! ----------- Admin Son ----------------------------- 
                            
 ```
 
  ## Admin  - Üye Girişi
 
 ```																				                        							
														
		//! ----------- Admin ----------------------------- 	
			let admin_loginOnline = await ctx.call('admin.loginOnline', {					
				email: "enes3@gmail.com",				
   				password: "123"	
			})
					
			ctx.params.admin_loginOnline = admin_loginOnline  
			console.log('\u001b[' + 32 + 'm' + '---------- Admin  ----------' + '\u001b[0m')  

			//Console Yazma
			console.log(admin_loginOnline) 
			console.log('\u001b[' + 32 + 'm' + '---------- Admin Son -------' + '\u001b[0m')  
		//! ----------- Admin Son ----------------------------- 

 ```
 
   ## Admin  - Üye Çıkışı
 
 ```																				                        													
		//! ----------- Admin ----------------------------- 	
			let admin_loginOut = await ctx.call('admin.loginOut', {					
				userToken: "userToken2"	
			})
					
			ctx.params.admin_loginOut = admin_loginOut  
			console.log('\u001b[' + 32 + 'm' + '---------- Admin  ----------' + '\u001b[0m')  

			//Console Yazma
			console.log(admin_loginOut) 
			console.log('\u001b[' + 32 + 'm' + '---------- Admin Son -------' + '\u001b[0m')  
		//! ----------- Admin Son ----------------------------- 

 ```
