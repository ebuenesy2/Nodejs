
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

 ```
  
## Planlanan Uyarılar
 
 ```
* Başarılı Admin Kayıt Yapıldı : admin_add_successful
* Başarılı Admin Güncelleme Yapıldı : admin_update_successful
* Başarılı Admin işlemi Başarılı : admin_delete_successful

* Başarılı Admin Giriş Yapıldı : admin_login_successful
* Hatalı Admin Giriş Yapıldı : admin_login_error
* Başarılı Admin Çıkış Yapıldı : admin_loginout_successful

* Mesaj Yazma Başarılı : message_add_successful
* Mesaj Güncelleme Başarılı : message_update_successful
* Mesaj Silme Başarılı : message_delete_successful
* Mesaj Silme Kutusu Başarılı : message_deleted_update_successful
* Mesaj Görüntüleme Başarılı : message_view_successful

* SSK Ekleme Başarılı : faq_add_successful
* SSK Güncelleme Başarılı : faq_update_successful
* SSK Silme Başarılı : faq_delete_successful

 ```
