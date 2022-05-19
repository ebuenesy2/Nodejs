
#  Log - Bildirim Protokolu

## Açıklama
 
 ```
Bildirim verilerini tutuyor
 ```
 
## Zorunlu Alanlar
 
 ```
* Tablo
* Title
* Description
* LogStatus -> successful / error
* FromToken -> Kayıt Edilecek Veri
* Created_byToken
 ```

## Serviceden Çağırma
 
 ```
				//! ----------- Log ----------------------------- 	
				 let logs_add = await ctx.call('logs.add', {
				 	table: "file",
				 	title: "file_add_successful",
					description: "Dosya Ekleme Başarılı",
					logStatus:"successful",
					fromToken: jwt,
					created_byToken: ctx.params.created_byToken
				 })				

				if(logs_add.status=="1") { 	console.log('\u001b[' + 32 + 'm' + '[File] [Logs] [Add] Bildirim Eklendi' + '\u001b[0m'); }
				if(logs_add.status=="0") { 	console.log('\u001b[' + 31 + 'm' + '[File] [Logs] [Add] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
 ```
 ## Bulunan Bildirim Uyarıları
 
 ```
* Dosya Ekleme Başarılı : file_add_successful
* Dosya Güncelleme Başarılı : file_update_successful
* Dosya Silme Başarılı : file_delete_successful
* Dosya Geçisi Silme Başarılı : file_delete_update_successful
* Dosya Yükleme Başarılı : file_upload_successful

* Kullanıcı Ekleme Başarılı : user_add_successful
* Kullanıcı Güncelleme Başarılı : user_update_successful
* Kullanıcı Silme Başarılı : user_delete_successful
* Kullanıcı Geçisi Silme Başarılı : user_delete_update_successful

* Kullanıcı Login Başarılı  : user_login_successful
* Kullanıcı Login Başarısız : user_login_error
* Kullanıcı Çıkış Başarılı: user_loginout_successful
* Kullanıcı Görüntüleme Başarılı : user_view_successful


* Admin Ekleme Başarılı : admin_add_successful
* Admin Güncelleme Başarılı : admin_update_successful
* Admin Silme Başarılı : admin_delete_successful
* Admin Geçisi Silme Başarılı : admin_delete_update_successful

* Admin Login Başarılı  : admin_login_successful
* Admin Login Başarısız : admin_login_error
* Admin Çıkış Başarılı: admin_loginout_successful
* Admin Görüntüleme Başarılı : admin_view_successful

* Mesaj Yazma Başarılı : message_add_successful
* Mesaj Güncelleme Başarılı : message_update_successful
* Mesaj Silme Başarılı : message_delete_successful
* Mesaj Geçisi Silme Başarılı : message_deleted_update_successful
* Mesaj Görüntüleme Başarılı : message_view_successful

* Time Ekleme Başarılı : time_add_successful
* Time Güncelleme Başarılı : time_update_successful
* Time Silme Başarılı : time_delete_successful
* Time Geçisi Silme Başarılı : time_deleted_update_successful
* Time Görüntüleme Başarılı : time_view_successful

* SSK Ekleme Başarılı : faq_add_successful
* SSK Güncelleme Başarılı : faq_update_successful
* SSK Silme Başarılı : faq_delete_successful
* SSK Geçisi Silme Başarılı : faq_deleted_update_successful
* SSK Görüntüleme Başarılı : faq_view_successful

* Not Ekleme Başarılı : note_add_successful
* Not Güncelleme Başarılı : note_update_successful
* Not Silme Başarılı : note_delete_successful
* Not Geçisi Silme Başarılı : note_deleted_update_successful
* Not Görüntüleme Başarılı : note_view_successful

 ```
  
## Planlanan Uyarılar
 
 ```

 ```
