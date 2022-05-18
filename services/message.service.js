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
				ctx.params.DB = db		

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
		async add(ctx) {
			
            //! ----------- UserInfo ----------------------------- 

			let FromUserToken_Info=ctx.params.FromUserToken;             
            let FromRole_Info=ctx.params.FromRole;   
            let Fromuser_info;
            if(FromRole_Info=="User") { Fromuser_info = await ctx.call('user.find_token', {"token":FromUserToken_Info})}
            if(FromRole_Info=="Admin") { Fromuser_info = await ctx.call('admin.find_token', {"token":FromUserToken_Info})}            
            let FromNameSurName_Info=Fromuser_info['DB']['name']+" "+Fromuser_info['DB']['surname']; 

            let ToUserToken_Info=ctx.params.ToUserToken;             
            let ToRole_Info=ctx.params.ToRole;   
            let Touser_info;
            if(ToRole_Info=="User") { Touser_info = await ctx.call('user.find_token', {"token":ToUserToken_Info})}
            if(ToRole_Info=="Admin") { Touser_info = await ctx.call('admin.find_token', {"token":ToUserToken_Info})}            
            let ToNameSurName_Info=Touser_info['DB']['name']+" "+Touser_info['DB']['surname']; 
                 
            //! ----------- UserInfo Son ----------------------------- 			
                    
			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					FromRole: ctx.params.FromRole,
					ToRole: ctx.params.ToRole,
					Subject: ctx.params.Subject
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token				
	
				//! Eklenecek veriler
				const willSaveData = {
					id:TokenId,		
					FromRole: ctx.params.FromRole,
					FromUserToken: ctx.params.FromUserToken,
                    FromUserName: Fromuser_info['DB']['username'],
					FromNameSurName: FromNameSurName_Info,
					ToRole: ctx.params.ToRole,
					ToUserToken: ctx.params.ToUserToken,
					ToUserName: Touser_info['DB']['username'],
					ToNameSurName: ToNameSurName_Info,
					Subject: ctx.params.Subject,
					Message: ctx.params.Message,
                    MessageFileControl: false,
					token:jwt,				
					created_at: new Date(),
					created_byToken: ctx.params.created_byToken,
					isUpdated: false,
					updated_at: null,
					updated_byToken : null,
					isReaded: false,                   
                    readed_at: null,	
                    readed_byToken: null,	
					isActive: true,
					isDeleted: false,
					Deleted_at: null,
					Deleted_byToken: null
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
					logStatus: "successful",
					fromToken: jwt,
					created_byToken: ctx.params.created_byToken ? ctx.params.created_byToken : ctx.params.FromUserToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Message] [Logs] [Add] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Message] [Logs] [Add] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------

				//! Return Api   
				ctx.params.title = "message.service -> Veri Ekleme"
				ctx.params.table = "message.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Eklendi"	
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Message] [Add] Veri Eklendi [ /api/message/add ] ' + '\u001b[0m');	
				

			} catch (error) {

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
            delete ctx.params.FromRole 
            delete ctx.params.FromUserToken 
            delete ctx.params.FromUserName 
            delete ctx.params.FromNameSurName 
            delete ctx.params.ToRole 
            delete ctx.params.ToUserToken 
            delete ctx.params.ToUserName 
            delete ctx.params.ToNameSurName 
            delete ctx.params.Subject 
            delete ctx.params.Message
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
				dbFind["updated_at"] = new Date()
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
					logStatus: "successful",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Message] [Logs] [Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Message] [Logs] [Update] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
				
              
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
            delete ctx.params.FromRole 
            delete ctx.params.FromUserToken 
            delete ctx.params.FromUserName 
            delete ctx.params.FromNameSurName 
            delete ctx.params.ToRole 
            delete ctx.params.ToUserToken 
            delete ctx.params.ToUserName 
            delete ctx.params.ToNameSurName 
            delete ctx.params.Subject 
            delete ctx.params.Message
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
					logStatus: "successful",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.Deleted_byToken
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
			delete ctx.params.Deleted_byToken

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
			dbFind["Deleted_at"] = new Date()
			dbFind["Deleted_byToken"] = ctx.params.Deleted_byToken

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
					logStatus: "successful",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.Deleted_byToken
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
            delete ctx.params.token 
            delete ctx.params.FromRole 
            delete ctx.params.FromUserToken 
            delete ctx.params.FromUserName 
            delete ctx.params.FromNameSurName 
            delete ctx.params.ToRole 
            delete ctx.params.ToUserToken 
            delete ctx.params.ToUserName 
            delete ctx.params.ToNameSurName 
            delete ctx.params.Subject 
            delete ctx.params.Message
			delete ctx.params.Deleted_byToken            

			return ctx.params
      
		},
		async view(ctx) {
		
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);			

			//! Veri Varsa 
			if (dbFind) {     

				//! Aynı Kişi ise
				if (dbFind["ToUserToken"] == ctx.params.readed_byToken) {
									
					//! Güncelleme
					dbFind["isReaded"] = true
					dbFind["readed_at"] = new Date()
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
						logStatus: "successful",
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

			const message_inbox  = db.filter(u => u.ToUserToken == ctx.params.userToken && u.isReaded == false); //! Gelen Mesaj
			const message_unreaded = db.filter(u => u.ToUserToken == ctx.params.userToken && u.isReaded == false && u.isDeleted == false); //! Okunmamış Mesajlar
			const message_readed = db.filter(u => u.ToUserToken == ctx.params.userToken && u.isReaded == true && u.isDeleted == false ); //! Okunmuş Mesajlar
			const message_deleted_message  = db.filter(u => u.ToUserToken == ctx.params.userToken && u.isDeleted == true ); //! Silinen Mesaj

            const message_sent = db.filter(u => u.FromUserToken == ctx.params.userToken); //! Gönderilmiş Mesajlar
            const message_unreaded_sent = db.filter(u => u.FromUserToken == ctx.params.userToken && u.isReaded == false ); //! Okunmamış Gönderilmiş Mesajlar            

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
