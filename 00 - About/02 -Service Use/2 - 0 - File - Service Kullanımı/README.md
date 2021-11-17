
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
 
 ## File - Arama Post
 
 ```
   			   			
      			
  			//! ----------- File ----------------------------------------------------------------- 	
				let find_post = await ctx.call('file.find_post', {					
					id: 1
				})
				
				ctx.params.find_post = find_post  
				console.log('\u001b[' + 32 + 'm' + '---------- File  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(find_post) 
				if(find_post.status==0) { console.log('\u001b[' + 31 + 'm' + 'File Verisi Var' + '\u001b[0m'); }
				if(find_post.status==1) { console.log('\u001b[' + 32 + 'm' + 'File Verisi Yok' + '\u001b[0m'); }

				console.log('\u001b[' + 32 + 'm' + '---------- File Son -------' + '\u001b[0m')  
		   //! ----------- File Son --------------------------------------------------------------
           
 ```
 
  ## File - Arama Token
 
 ```
   			   			
      			
  			//! ----------- File ----------------------------------------------------------------- 	
				let find_token = await ctx.call('file.find_token', {					
					fileToken: "fileToken"
				})
				
				ctx.params.find_token = find_token  
				console.log('\u001b[' + 32 + 'm' + '---------- File  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(find_token) 
				if(find_token.status==0) { console.log('\u001b[' + 31 + 'm' + 'File Verisi Var' + '\u001b[0m'); }
				if(find_token.status==1) { console.log('\u001b[' + 32 + 'm' + 'File Verisi Yok' + '\u001b[0m'); }

				console.log('\u001b[' + 32 + 'm' + '---------- File Son -------' + '\u001b[0m')  
		   //! ----------- File Son --------------------------------------------------------------

           
 ```

  ## File - Dosya Yükleme
 
 ```
   			   			
			//! -----------  File UPLOAD ----------------------------- 	
				let file_upload = await ctx.call('file.upload', {
					file: ctx.params.blogFile,
					role: ctx.params.role,
					userToken: ctx.params.userToken,                  
					usedPage: "blog"
				})
				
				ctx.params.file_upload = file_upload
				console.log('\u001b[' + 32 + 'm' + '---------- File Upload ----------' + '\u001b[0m') 

				console.log(file_upload)      
				console.log('\u001b[' + 32 + 'm' + 'file_upload Image Upload Url : '+ file_upload.DB["uploadDir"] + '\u001b[0m')
				console.log('\u001b[' + 32 + 'm' + 'file_upload status : '+ file_upload.status + '\u001b[0m')
				if(file_upload.status==0) { console.log('\u001b[' + 31 + 'm' + 'Dosya Yüklenemedi' + '\u001b[0m'); }
				if(file_upload.status==1) { console.log('\u001b[' + 32 + 'm' + 'Dosya Yüklendi' + '\u001b[0m'); }

				console.log('\u001b[' + 32 + 'm' + '---------- File Upload son ----------' + '\u001b[0m')       
				//! ----------- End File UPLOAD ----------------------------- 

           
 ``
 
 ```
   			   			

					//! -----------  File UPLOAD ----------------------------- 	
					let file_upload = await ctx.call('file.upload', {
						file: ctx.params.cover_ImageUrl_File,
						role: ctx.params.role,
						userToken: ctx.params.userToken,                  
						usedPage: "user"
					})
					//! ----------- End File UPLOAD ----------------------------- 	
           
 ``
 
   ## File - Dosya Yükleme Url
 
 ```

				//! -----------  File UPLOAD ----------------------------- 	
				let file_upload = await ctx.call('file.uploadUrl', {
					fileUrl: ctx.params.blogFileUrl,
					role: ctx.params.role,
					userToken: ctx.params.userToken,                  
					usedPage: "blog"
				})
				
				ctx.params.file_upload = file_upload
				console.log('\u001b[' + 32 + 'm' + '---------- File Upload ----------' + '\u001b[0m') 

				console.log(file_upload)      
				console.log('\u001b[' + 32 + 'm' + 'file_upload Image Upload Url : '+ file_upload.DB["uploadDir"] + '\u001b[0m')
				console.log('\u001b[' + 32 + 'm' + 'file_upload status : '+ file_upload.status + '\u001b[0m')
				if(file_upload.status==0) { console.log('\u001b[' + 31 + 'm' + 'Dosya Yüklenemedi' + '\u001b[0m'); }
				if(file_upload.status==1) { console.log('\u001b[' + 32 + 'm' + 'Dosya Yüklendi' + '\u001b[0m'); }

				console.log('\u001b[' + 32 + 'm' + '---------- File Upload son ----------' + '\u001b[0m')       
				//! ----------- End File UPLOAD ----------------------------- 


           
 ``
 
 ```
                

				//! -----------  File UPLOAD ----------------------------- 	
				let file_upload = await ctx.call('file.uploadUrl', {
					fileUrl: ctx.params.blogFileUrl,
					role: ctx.params.role,
					userToken: ctx.params.userToken,                  
					usedPage: "blog"
				})	
				//! ----------- End File UPLOAD ----------------------------- 
           
 ``
