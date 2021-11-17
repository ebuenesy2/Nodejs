
# 1 - 0 - Logs - Service Kullanımı

## Açıklama
 
 ```
 Proje içinde durumları alıyor
 ```

## Logs - Veri Ekleme
 
 ```
				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: "userToken",
					from: "file",
					fromToken: "fromToken",
					name: "file_update_successful",
					description: "Dosya Güncelleme Başarılı"
				})
				
				ctx.params.logs_add = logs_add  
				console.log('\u001b[' + 32 + 'm' + '---------- Log  ----------' + '\u001b[0m')  

				//Console Yazma
				console.log(logs_add) 
				if(logs_add.status==0) { console.log('\u001b[' + 31 + 'm' + 'Log Verisi Kayıt Edilmedi' + '\u001b[0m'); }
				if(logs_add.status==1) { console.log('\u001b[' + 32 + 'm' + 'Log Verisi Kayıt Edildi' + '\u001b[0m'); }

				console.log('\u001b[' + 32 + 'm' + '---------- Log Son -------' + '\u001b[0m')  
				//! ----------- Log Son ----------------------------- 
 

 ```
