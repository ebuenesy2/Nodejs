
# 5 - 0 - SSK - Service Kullanımı

## Açıklama
 
 ```
SSK service kullanımı ve Kullanıcı işlemleri
 ```
 
## SSK - Tüm Veriler
 
 ```  			   													
					//! ----------- SSK ----------------------------- 	
						let ssk_all = await ctx.call('ssk.all');
								
						ctx.params.ssk_all = ssk_all
						console.log('\u001b[' + 32 + 'm' + '---------- SSK  ----------' + '\u001b[0m')  

						//Console Yazma
						console.log(ssk_all) 
						console.log('\u001b[' + 32 + 'm' + '---------- SSK Son -------' + '\u001b[0m')  
					//! ----------- SSK	 Son ----------------------------- 

 ```
 
 ## SSK - Veri Arama
 
 ```  			   													
										
					//! ----------- SSK ----------------------------- 	
						let ssk_find = await ctx.call('ssk.find', {					
							id: 1
						})
									
						ctx.params.ssk_find = ssk_find
						console.log('\u001b[' + 32 + 'm' + '---------- SSK  ----------' + '\u001b[0m')  

						//Console Yazma
						console.log(ssk_find) 
						console.log('\u001b[' + 32 + 'm' + '---------- SSK Son -------' + '\u001b[0m')  
					//! ----------- SSK	 Son ----------------------------- 

 ```
 
  ## SSK - Veri Token Arama
 
 ```  			   													
										
					//! ----------- SSK ----------------------------- 	
						let ssk_find_token = await ctx.call('ssk.find_token', {					
							sskToken: "sskToken1"
						})
									
						ctx.params.ssk_find_token = ssk_find_token
						console.log('\u001b[' + 32 + 'm' + '---------- SSK  ----------' + '\u001b[0m')  

						//Console Yazma
						console.log(ssk_find_token) 
						console.log('\u001b[' + 32 + 'm' + '---------- SSK Son -------' + '\u001b[0m')  
					//! ----------- SSK	 Son ----------------------------- 

 ```
 
   ## SSK - Veri Ekleme
 
 ```  			   													
										
					//! ----------- SSK ----------------------------- 	
						let ssk_add = await ctx.call('ssk.add', {					
							userToken: "userToken",
							soru: "soru add",
							cevap: "cevap add"
						})
									
						ctx.params.ssk_add = ssk_add
						console.log('\u001b[' + 32 + 'm' + '---------- SSK  ----------' + '\u001b[0m')  

						//Console Yazma
						console.log(ssk_add) 
						console.log('\u001b[' + 32 + 'm' + '---------- SSK Son -------' + '\u001b[0m')  
					//! ----------- SSK	 Son ----------------------------- 


 ```
 
 ## SSK - Veri Güncelleme
 
 ```  			   													
																				
					//! ----------- SSK ----------------------------- 	
						let ssk_update = await ctx.call('ssk.update', {					
							userToken: "userToken",
							sskToken: "sskToken1",
							soru: "soru guncelleme",
							cevap: "cevap guncelleme"
						})
									
						ctx.params.ssk_update = ssk_update
						console.log('\u001b[' + 32 + 'm' + '---------- SSK  ----------' + '\u001b[0m')  

						//Console Yazma
						console.log(ssk_update) 
						console.log('\u001b[' + 32 + 'm' + '---------- SSK Son -------' + '\u001b[0m')  
					//! ----------- SSK	 Son ----------------------------- 


 ```
 
 ## SSK - Veri Silme
 
 ```  			   																																					
					//! ----------- SSK ----------------------------- 	
						let ssk_delete = await ctx.call('ssk.delete', {					
							id: 1637186237801,
							userToken: "userToken"							
						})
									
						ctx.params.ssk_delete = ssk_delete
						console.log('\u001b[' + 32 + 'm' + '---------- SSK  ----------' + '\u001b[0m')  

						//Console Yazma
						console.log(ssk_delete) 
						console.log('\u001b[' + 32 + 'm' + '---------- SSK Son -------' + '\u001b[0m')  
					//! ----------- SSK	 Son ----------------------------- 

 ```

