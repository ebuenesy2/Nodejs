
# 7 - 0 - Blog - Service Kullanımı

## Açıklama
 
 ```
 Blog service kullanımı ve Blog işlemleri
 ```

## Blog - Tüm Veriler
 
 ```		
				//! ----------- Blog ----------------------------- 	
					let blogs_all = await ctx.call('blogs.all');
							
					ctx.params.blogs_all = blogs_all  
					console.log('\u001b[' + 32 + 'm' + '---------- Blog  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(blogs_all) 
					console.log('\u001b[' + 32 + 'm' + '---------- Blog Son -------' + '\u001b[0m')  
				//! ----------- Blog Son ----------------------------- 
                
 ```
 
 ## Blog - Veri Arama
 
 ```		
			
				//! ----------- Blog ----------------------------- 	
					let blogs_find = await ctx.call('blogs.find', {					
						id: 1
					})

					ctx.params.blogs_find = blogs_find  
					console.log('\u001b[' + 32 + 'm' + '---------- Blog  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(blogs_find) 
					console.log('\u001b[' + 32 + 'm' + '---------- Blog Son -------' + '\u001b[0m')  
				//! ----------- Blog Son -----------------------------   
                
 ```
 
  ## Blog - Veri Token Arama
 
 ```						
				//! ----------- Blog ----------------------------- 	
					let blogs_find_token = await ctx.call('blogs.find_token', {					
						blogToken: "blogToken2"
					})

					ctx.params.blogs_find_token = blogs_find_token  
					console.log('\u001b[' + 32 + 'm' + '---------- Blog  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(blogs_find_token) 
					console.log('\u001b[' + 32 + 'm' + '---------- Blog Son -------' + '\u001b[0m')  
				//! ----------- Blog Son ----------------------------- 
              
 ```
 
   ## Blog - Veri Ekleme
 
 ```						
				
				//! ----------- Blog ----------------------------- 	
					let blogs_addUrl = await ctx.call('blogs.addUrl', {					
						userToken: "userToken",
						role: "role admin",
						blogImageControl: 0,
						blogFileUrl: "C:\\Users\\ebuen\\Pictures\\1\\2.jpg",
						blogDescription: "blogDescription",
						blogContext: "blogContext",
						blogCategories: "blogCategories"
					})

					ctx.params.blogs_addUrl = blogs_addUrl  
					console.log('\u001b[' + 32 + 'm' + '---------- Blog  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(blogs_addUrl) 
					console.log('\u001b[' + 32 + 'm' + '---------- Blog Son -------' + '\u001b[0m')  
				//! ----------- Blog Son ----------------------------- 
              
 ```
 
    ## Blog - Veri Güncelleme
 
 ```						
				
				//! ----------- Blog ----------------------------- 	
					let blogs_updateUrl = await ctx.call('blogs.updateUrl', {					
						blogToken: "blogToken2",
						userToken: "userToken",
						role: "role admin",
						blogImageControl: 0,
						blogFileUrl: "C:\\Users\\ebuen\\Pictures\\1\\2.jpg",
						blogDescription: "blogDescription guncelleme",
						blogContext: "blogContext",
						blogCategories: "blogCategories"
					})

					ctx.params.blogs_updateUrl = blogs_updateUrl  
					console.log('\u001b[' + 32 + 'm' + '---------- Blog  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(blogs_updateUrl) 
					console.log('\u001b[' + 32 + 'm' + '---------- Blog Son -------' + '\u001b[0m')  
				//! ----------- Blog Son ----------------------------- 

 ```
 
     ## Blog - Veri Silme
 
 ```							
				//! ----------- Blog ----------------------------- 	
					let blogs_delete = await ctx.call('blogs.delete', {					
						id: 1637191358145,
						userToken: "userToken"						
					})

					ctx.params.blogs_delete = blogs_delete  
					console.log('\u001b[' + 32 + 'm' + '---------- Blog  ----------' + '\u001b[0m')  

					//Console Yazma
					console.log(blogs_delete) 
					console.log('\u001b[' + 32 + 'm' + '---------- Blog Son -------' + '\u001b[0m')  
				//! ----------- Blog Son -----------------------------  

 ```
