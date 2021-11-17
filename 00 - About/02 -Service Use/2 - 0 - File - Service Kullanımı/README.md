
# 2 - 0 - File - Service Kullanımı

## Açıklama
 
 ```
 File service kullanımı ve Dosya işlemleri
 ```
 
## File - Tüm Veriler
 
 ```
   			   			
  			//! ----------- File ----------------------------- 	
			  let file_all = await ctx.call('file.all');
   			
			  ctx.params.file_all = file_all  
			  console.log('\u001b[' + 32 + 'm' + '---------- File  ----------' + '\u001b[0m')  

			  //Console Yazma
			  console.log(file_all) 
			  console.log('\u001b[' + 32 + 'm' + '---------- File Son -------' + '\u001b[0m')  
		    //! ----------- File Son ----------------------------- 
 ```

## File - Arama
 
 ```
   			   			
      			
  			//! ----------- File ----------------------------------------------------------------- 	
				let file_find = await ctx.call('file.find', {					
					id: 1
				})
				
				ctx.params.file_find = file_find  
				console.log('\u001b[' + 32 + 'm' + '---------- File  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(file_find) 
				if(file_find.status==0) { console.log('\u001b[' + 31 + 'm' + 'File Verisi Var' + '\u001b[0m'); }
				if(file_find.status==1) { console.log('\u001b[' + 32 + 'm' + 'File Verisi Yok' + '\u001b[0m'); }

				console.log('\u001b[' + 32 + 'm' + '---------- File Son -------' + '\u001b[0m')  
		   //! ----------- File Son --------------------------------------------------------------
           
 ```
