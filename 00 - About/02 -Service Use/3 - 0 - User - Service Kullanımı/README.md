
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
