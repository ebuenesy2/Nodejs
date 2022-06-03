'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/message.json'); //! Json


module.exports = {
	name: "message",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "message.service -> Info"
			ctx.params.table = "message.json"
			ctx.params.time = dayjs().toDate()
			ctx.params.APi_URL = process.env.APi_URL

			return ctx.params
		},
		async post(ctx) {

			//! Return Api
			ctx.params.createdAt = dayjs().toDate();
			delete ctx.params.createdAt;

			return ctx.params
		},
		async html(ctx) {
		
            ctx.meta.$responseType = "text/html";
            return Buffer.from(`
                    <html>
                    <body>
                        <h1>Hello API ebu enes!</h1>
                        <img src="/api/file.image" />
                    </body>
                    </html>
            `);
			
		},
		async all(ctx) {

			try {

				//! Return Api   
				ctx.params.title = "message.service -> Tüm Veriler"
				ctx.params.table = "message.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db?.sort((a, b) => (a.id > b.id ? -1 : 1))
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Message] [All] Tüm Veriler Okundu [ /api/message/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "message.service -> Tüm Veriler"
				ctx.params.table = "message.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Message] [All] SSK Tüm Veriler Okunamadı [ /api/message/all ] ' + '\u001b[0m');
				console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
			
			}

			//! Return
			return ctx.params
		},
		async find(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.table = "message.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Message] [Find] Veri Arama [ /api/message/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.table = "message.json"
				ctx.params.status = 0
				ctx.params.DB = "Message  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Message] [Find] Veri Bulunamadı [ /api/message/find ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_post(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.table = "message.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Message] [Find] Veri Arama [ /api/message/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.table = "message.json"
				ctx.params.status = 0
				ctx.params.DB = "Message  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Message] [Find] Veri Bulunamadı [ /api/message/find_post ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_token(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.token == ctx.params.token);	

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.table = "message.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Message] [Find] Veri Arama [ /api/message/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.table = "message.json"
				ctx.params.status = 0
				ctx.params.DB = "Message  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Message] [Find] Veri Bulunamadı [ /api/message/find_token ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token

			return ctx.params
		}, 
		async find_chat(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.messageTypeId == ctx.params.messageTypeId);	

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.table = "message.json"
				ctx.params.status = 1
				ctx.params.size = dbFind.length
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Message] [Find] Veri Arama [ /api/message/find_chat ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.table = "message.json"
				ctx.params.status = 0
				ctx.params.DB = "Message  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Message] [Find] Veri Bulunamadı [ /api/message/find_chat ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.messageTypeId

			return ctx.params
		}, 
		async add(ctx) {
                    
			try {

				//! Token
				let TokenId=new Date().getTime();

				// ! Arama ve Birleştirme
			    const dbFind_from = db.filter(u => u.messageType == "chat" && u.fromUserToken == ctx.params.fromUserToken && u.toUserToken == ctx.params.toUserToken)	// Gönderilen	
			    const dbFind_to = db.filter(u => u.messageType == "chat" && u.fromUserToken == ctx.params.toUserToken && u.toUserToken == ctx.params.fromUserToken) // Gelen
				
				const dbFind = [...dbFind_from, ...dbFind_to] //! Birleştirme yapıyor

				//! MessageTypeId
				let messageTypeId = dbFind?.length > 0 ? dbFind[0].messageTypeId : TokenId
			
				
                //! Token Bilgileri
				let TokenInfo={				
					id: TokenId,
					messageType:ctx.params.messageType,
					fromUserToken: ctx.params.fromUserToken,
					toUserToken: ctx.params.toUserToken,
					subject: ctx.params.subject
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token				
	
				//! Eklenecek veriler
				const willSaveData = {
					id:TokenId,
					messageType:ctx.params.messageType,
					messageTypeId:messageTypeId,
					fromUserToken: ctx.params.fromUserToken,
					fromUserNameSurname:null,
					toUserToken: ctx.params.toUserToken,
					toUserNameSurname:null,
					subject: ctx.params.subject,
					message: ctx.params.message,
                    messageFileControl: false,
					token:jwt,				
					created_at: dayjs().format(),
					created_byToken: ctx.params.created_byToken,
					isUpdated: false,
					updated_at: null,
					updated_byToken : null,
					isReaded: false,                   
                    readed_at: null,	
                    readed_byToken: null,	
					isActive: true,
					isDeleted: false,
					deleted_at: null,
					deleted_byToken: null
				}

			  
				//Verileri Kaydet
				db.push(willSaveData)
                
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Message] [Json] [Add] Json Veri Kayıt Edilemedi [ message.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Message] [Json] [Add] Json Veri Kayıt Edildi [ message.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "message",
					title: "message_add_successful",
					description: "Message Yazma Başarılı",
					logStatus: "success",
					fromToken: jwt,
					created_byToken: ctx.params.Created_byToken ? ctx.params.Created_byToken : ctx.params.FromUserToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Message] [Logs] [Add] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Message] [Logs] [Add] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------

				//! Delete
				delete ctx.params.message

				//! Return Api   
				ctx.params.title = "message.service -> Veri Ekleme"
				ctx.params.table = "message.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Eklendi"	
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Message] [Add] Veri Eklendi [ /api/message/add ] ' + '\u001b[0m');	


			} catch (error) {

				//! Delete
				delete ctx.params.message

				//! Return Api   
				ctx.params.title = "message.service -> Veri Ekleme"
				ctx.params.table = "message.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Eklenemedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Message] [Add] Veri Eklenemedi [ /api/message/add ] ' + '\u001b[0m');	

			}  

            //! Delete
            delete ctx.params.token 
            delete ctx.params.messageType 
            delete ctx.params.fromRole 
            delete ctx.params.fromUserToken 
            delete ctx.params.fromUserName 
            delete ctx.params.fromNameSurName 
            delete ctx.params.toRole 
            delete ctx.params.toUserToken 
            delete ctx.params.toUserName 
            delete ctx.params.toNameSurName 
            delete ctx.params.subject 
           
			delete ctx.params.created_byToken            

			return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.token == ctx.params.token);

			//! Veri Varsa 
			if (dbFind) {
              
				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {					
					if(key!="userToken"  ) { dbFind[key] = ctx.params[key] }  //! Only Text 				
				})
				dbFind["isUpdated"] = true
				dbFind["updated_at"] = dayjs().format()
				// End  Referans Veriler Güncelleme Yapıyor
	
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Message] [Json] [Update] Json Veri Kayıt Edilemedi [ message.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Message] [Json] [Update] Json Veri Kayıt Edildi [ message.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
	

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "message",
					title: "message_update_successful",
					description: "Message Güncelleme Başarılı",
					logStatus: "success",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Message] [Logs] [Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Message] [Logs] [Update] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
				
				//! Delete
				delete ctx.params.message
              
                //! Return Api	
				ctx.params.title = "message.service -> Veri Güncelleme"
				ctx.params.table = "message.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Message] [Update] Veri Güncelleme [ /api/message/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
				//! Delete
				delete ctx.params.message

               //! Return Api	
			   ctx.params.title = "message.service -> Veri Güncelleme"
			   ctx.params.table = "message.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Message] [Update] Veri Güncellenemedi [ /api/message/update ] ' + '\u001b[0m');

			}
			
            //! Delete
            delete ctx.params.token 
            delete ctx.params.fromRole 
            delete ctx.params.fromUserToken 
            delete ctx.params.fromUserName 
            delete ctx.params.fromNameSurName 
            delete ctx.params.toRole 
            delete ctx.params.toUserToken 
            delete ctx.params.toUserName 
            delete ctx.params.toNameSurName 
            delete ctx.params.subject 
			delete ctx.params.updated_byToken            

			return ctx.params

		},
		async delete(ctx) {
         
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Message] [Json] [Delete] Json Veri Kayıt Edilemedi [ message.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Message] [Json] [Delete] Json Veri Kayıt Edildi [ message.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
				

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "message",
					title: "message_delete_successful",
					description: "Message Silme Başarılı",
					logStatus: "success",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Message] [Logs] [Delete] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Message] [Logs] [Delete] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
				
                //! Return Api   
				ctx.params.title = "message.service -> Veri Silme"
				ctx.params.table = "message.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Silindi"	
				
				//Console Yazma	
			    console.log('\u001b[' + 32 + 'm' + '[Message] [Delete] Veri Silindi [ /api/message/delete/:id ] ' + '\u001b[0m');
               

			} else {

				//! Return Api   
				ctx.params.title = "message.service -> Veri Silme"
				ctx.params.table = "message.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Silinemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + '[Message] [Delete] Veri Silinemedi [ /api/message/delete/:id ] ' + '\u001b[0m');

			}
			
			
			//! Return Delete			
			delete ctx.params.id
			delete ctx.params.deleted_byToken

			return ctx.params	

		},
        async delete_update(ctx) {
		
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);			

			//! Veri Varsa 
			if (dbFind) {     
							
				//! Güncelleme
				dbFind["isDeleted"] = true
				dbFind["isActive"] = false
				dbFind["deleted_at"] = dayjs().format()
				dbFind["deleted_byToken"] = ctx.params.deleted_byToken

			//Json içine Verileri Yazıyor -> db
			fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {

				// Hata varsa
				if (err) {
					console.log('\u001b[' + 31 + 'm' + '[Message] [Json] [Delete_Updated] Json Veri Kayıt Edilemedi [ message.json ] ' + '\u001b[0m');	
					console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
				}							

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Message] [Json] [Delete_Updated] Json Veri Kayıt Edildi [ message.json ] ' + '\u001b[0m');								
				
			});
			// End Json içine Verileri Yazıyor -> db	

			
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "message",
					title: "message_deleted_update_successful",
					description: "Message Geçisi Silme Başarılı",
					logStatus: "success",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Message] [Logs] [Delete_Updated] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Message] [Logs] [Delete_Updated] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------


                //! Return Api	
				ctx.params.title = "message.service -> Veri Geçisi Silme"
				ctx.params.table = "message.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Message] [Delete_Updated] Veri Güncelleme [ /api/message/deleted_update/:id ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "message.service -> Veri Geçisi Silme"
			   ctx.params.table = "message.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 32 + 'm' + '[Message] [Delete_Updated] Veri Güncelleme [ /api/message/deleted_update/:id ] ' + '\u001b[0m');

			}
			
            //! Delete
            delete ctx.params.id
			delete ctx.params.deleted_byToken            

			return ctx.params
      
		},
		async view(ctx) {
		
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);			

			//! Veri Varsa 
			if (dbFind) {     

				//! Aynı Kişi ise
				if (dbFind["toUserToken"] == ctx.params.readed_byToken) {
									
					//! Güncelleme
					dbFind["isReaded"] = true
					dbFind["readed_at"] = dayjs().format()
					dbFind["readed_byToken"] = ctx.params.readed_byToken
				

					//Json içine Verileri Yazıyor -> db
					fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {

						// Hata varsa
						if (err) {
							console.log('\u001b[' + 31 + 'm' + '[Message] [Json] [View] Json Veri Kayıt Edilemedi [ message.json ] ' + '\u001b[0m');
							console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
						}

						//Console Yazma
						console.log('\u001b[' + 32 + 'm' + '[Message] [Json] [View] Json Veri Kayıt Edildi [ message.json ] ' + '\u001b[0m');
						
					});
					// End Json içine Verileri Yazıyor -> db

				
					//! ----------- Log ----------------------------- 	
					let logs_add = await ctx.call('logs.add', {
						table: "message",
						title: "message_view_successful",
						description: "Mesaj Görüntüleme Başarılı",
						logStatus: "success",
						fromToken: dbFind["token"],
						created_byToken: ctx.params.readed_byToken
					})

					if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Message] [Logs] [View] Bildirim Eklendi' + '\u001b[0m'); }
					if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Message] [Logs] [View] Bildirim Eklenemedi' + '\u001b[0m'); }

					//! ----------- Log Son -----------------------------



					//! Return Api	
					ctx.params.title = "message.service -> Veri Görüntüleme"
					ctx.params.table = "message.json"
					ctx.params.status = 1
					ctx.params.DB = dbFind
					ctx.params.message = "Veri Görüntülendi"

					//Console Yazma	
					console.log('\u001b[' + 32 + 'm' + '[Message] [View] Veri Görüntülendi [ /api/message/view/:id ]' + '\u001b[0m');
				}

				//! Aynı Kişi Değilse
				else {

					//! Return Api	
					ctx.params.title = "message.service -> Veri Görüntüleme"
					ctx.params.table = "message.json"        
					ctx.params.status = 0	
					ctx.params.DB = "Veri Görüntülenemedi -> Farklı Kişi"		
					ctx.params.message="Veri Görüntülenemedi -> Farklı Kişi"

					//Console Yazma	
					console.log('\u001b[' + 31 + 'm' + '[Message] [View] Veri Görüntülenemedi [ /api/message/view/:id ] ' + '\u001b[0m');

				}
			
			}

			//! Veri Yoksa
			else {

				//! Return Api	
				ctx.params.title = "message.service -> Veri Görüntüleme"
				ctx.params.table = "message.json"        
				ctx.params.status = 0		
				ctx.params.DB = "Veri  Bulunmadı"	
				ctx.params.message="Veri Görüntülenemedi"

				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + '[Message] [View] Veri Görüntülenemedi [ /api/message/view/:id ] ' + '\u001b[0m');

			}
			
			//! Delete
			delete ctx.params.id          
			delete ctx.params.readed_byToken        
					
			return ctx.params

      
		},
        async inbox(ctx) {

			const message_inbox  = db.filter(u => u.toUserToken == ctx.params.userToken && u.isReaded == false); //! Gelen Mesaj
			const message_unreaded = db.filter(u => u.toUserToken == ctx.params.userToken && u.isReaded == false && u.isDeleted == false); //! Okunmamış Mesajlar
			const message_readed = db.filter(u => u.toUserToken == ctx.params.userToken && u.isReaded == true && u.isDeleted == false ); //! Okunmuş Mesajlar
			const message_deleted_message  = db.filter(u => u.toUserToken == ctx.params.userToken && u.isDeleted == true ); //! Silinen Mesaj

            const message_sent = db.filter(u => u.fromUserToken == ctx.params.userToken); //! Gönderilmiş Mesajlar
            const message_unreaded_sent = db.filter(u => u.fromUserToken == ctx.params.userToken && u.isReaded == false ); //! Okunmamış Gönderilmiş Mesajlar            

            //! Return
            ctx.params.title = "Mesaj Kutusu"
            ctx.params.table = "message.json"
            ctx.params.status = 1
            ctx.params.size_message_inbox=message_inbox.length
            ctx.params.data_message_inbox = message_inbox
            ctx.params.size_message_unreaded=message_unreaded.length
            ctx.params.data_message_unreaded = message_unreaded
            ctx.params.size_message_readed=message_readed.length
            ctx.params.data_message_readed = message_readed
			ctx.params.size_message_deleted_message=message_deleted_message.length
            ctx.params.data_message_deleted_message = message_deleted_message

            ctx.params.size_message_sent=message_sent.length
            ctx.params.data_message_sent = message_sent
            ctx.params.size_message_unreaded_sent=message_unreaded_sent.length
            ctx.params.data_message_unreaded_sent = message_unreaded_sent
                      
		
			console.log('\u001b[' + 32 + 'm' + '[Message] [View] Gelen Kutusu [ /api/message/inbox ] ' + '\u001b[0m');
             
			//! Delete
			delete ctx.params.userToken 

			return ctx.params
		}		
	}
}
