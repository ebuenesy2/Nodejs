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
			ctx.params.title = "message.service"
			ctx.params.time = dayjs().toDate()
			ctx.params.APi_URL=process.env.APi_URL

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
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Mesaj Tüm Veriler Okundu [ /api/message/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "message.service -> Tüm Veriler"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Mesaj Tüm Veriler Okunamadı [ /api/message/all ] ' + '\u001b[0m');
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
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Mesaj Veri Arama [ /api/message/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.DB = "Mesaj  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Mesaj Veri Bulunamadı [ /api/message/find ] ' + '\u001b[0m');	

			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},	
		async find_post(ctx) {

			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {

				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Mesaj Veri Arama [ /api/message/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.DB = "Mesaj Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Mesaj Veri Bulunamadı [ /api/message/find_post ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_token(ctx) {

			//! Arama
			const dbFind = db.find(u => u.MessageToken == ctx.params.MessageToken);	

			//! Veri Varsa
			if (dbFind) {

				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Mesaj Veri Arama [ /api/message/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "message.service -> Veri Arama"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.DB = "Mesaj Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Mesaj Veri Bulunamadı [ /api/message/find_token ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.userToken

			return ctx.params
		},   
		async add(ctx) {
			
            //! ----------- UserInfo ----------------------------- 

			let FromUserToken_Info=ctx.params.FromUserToken;             
            let FromRole_Info=ctx.params.FromRole;   
            let Fromuser_info;
            if(FromRole_Info=="User") { Fromuser_info = await ctx.call('user.find_token', {"userToken":FromUserToken_Info})}
            if(FromRole_Info=="Admin") { Fromuser_info = await ctx.call('admin.find_token', {"userToken":FromUserToken_Info})}            
            let FromNameSurName_Info=Fromuser_info['DB']['name']+" "+Fromuser_info['DB']['surname']; 

            let ToUserToken_Info=ctx.params.ToUserToken;             
            let ToRole_Info=ctx.params.ToRole;   
            let Touser_info;
            if(ToRole_Info=="User") { Touser_info = await ctx.call('user.find_token', {"userToken":ToUserToken_Info})}
            if(ToRole_Info=="Admin") { Touser_info = await ctx.call('admin.find_token', {"userToken":ToUserToken_Info})}            
            let ToNameSurName_Info=Touser_info['DB']['name']+" "+Touser_info['DB']['surname']; 
                 
            //! ----------- UserInfo Son ----------------------------- 			
                    
			try {

				//! Ortak
				let TokenId=new Date().getTime();
				let DateNow=new Date();

				let TokenInfo={				
					id: TokenId,	
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
					MessageReaded: ctx.params.MessageReaded,		
					MessageReaded_at: DateNow,		
					MessageFileControl: ctx.params.MessageFileControl,	
					MessageDeleted: ctx.params.MessageDeleted,	
					MessageDeleted_at: DateNow		
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
					MessageReaded: ctx.params.MessageReaded,                   
                    MessageReaded_at: null,			
                    MessageFileControl: ctx.params.MessageFileControl,
                    MessageDeleted: ctx.params.MessageDeleted,	
					MessageDeleted_at: null,
					MessageToken:jwt,				
					created_at: new Date(),
					updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)

                
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}							

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Mesaj "); // Success
				});	
				//End Json içine Verileri Yazıyor -> db			


				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.FromUserToken,
					from: "mesaj",
					fromToken: jwt,
					name: "message_add_successful",
					description: "Mesaj Yazma Başarılı"
				})			
				//! ----------- Log Son ----------------------------- 


				//! Return Api   
				ctx.params.title = "message.service -> Veri Ekleme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Mesaj Eklendi"	
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Mesaj Veri Eklendi [ /api/message/add ] ' + '\u001b[0m');	
				

			} catch (error) {

				//! Return Api   
				ctx.params.title = "message.service -> Veri Ekleme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Mesaj Eklenemedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Mesaj Veri Eklenemedi [ /api/message/add ] ' + '\u001b[0m');	

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
            delete ctx.params.MessageReaded
            delete ctx.params.MessageFileControl
            delete ctx.params.MessageDeleted

			return ctx.params


		},
		async update(ctx) {
			
			// ! Arama
			const dbFind = db.find(u => u.MessageToken == ctx.params.MessageToken); 

			//! Veri Varsa 
			if (dbFind) {

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "mesaj",
					fromToken: ctx.params.MessageToken,
					name: "message_update_successful",
                    description: "Mesaj Güncelleme Başarılı"
				})	
				delete ctx.params.userToken 		
				//! ----------- Log Son -----------------------------  
            
				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {
					dbFind[key] = ctx.params[key]
				})				
				dbFind["updated_at"] = new Date()
				// End  Referans Veriler Güncelleme Yapıyor

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {					
				
					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Mesaj"); // Success
				});	
				// End Json içine Verileri Yazıyor -> db		
						

                //! Return Api   
				ctx.params.title = "message.service -> Veri Güncelleme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Mesaj Güncellendi"	
				
				//Console Yazma	
			    console.log('\u001b[' + 32 + 'm' + 'Mesaj Veri Güncellendi [ /api/message/update ] ' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {

				//! Return Api   
				ctx.params.title = "message.service -> Veri Güncelleme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Mesaj Güncellenemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + 'Mesaj Veri Güncellenemedi [ /api/message/update ] ' + '\u001b[0m');

			}
			
            //! Delete
            delete ctx.params.token          
            delete ctx.params.MessageToken
            delete ctx.params.FromRole 
            delete ctx.params.FromUserToken 
            delete ctx.params.FromUserName 
            delete ctx.params.ToRole 
            delete ctx.params.ToUserToken 
            delete ctx.params.ToUserName 
            delete ctx.params.Subject 
            delete ctx.params.Message 
            delete ctx.params.MessageReaded         

			return ctx.params	  

		},
		async delete(ctx) {
         
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

			   // Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {					
				
					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Mesaj"); // Success
				});	
				// End Json içine Verileri Yazıyor -> db	
				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "mesaj",
					fromToken: dbFind.MessageToken,
					name: "message_delete_successful",
                    description: "Mesaj Silme Başarılı"
				})	
				delete ctx.params.userToken 		
				//! ----------- Log Son -----------------------------  
				
                //! Return Api   
				ctx.params.title = "message.service -> Veri Silme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Mesaj Silindi"	
				
				//Console Yazma	
			    console.log('\u001b[' + 32 + 'm' + 'Mesaj Veri Silindi [ /api/message/update ] ' + '\u001b[0m');
               

			} else {

				//! Return Api   
				ctx.params.title = "message.service -> Veri Silme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Mesaj Silinemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + 'Mesaj Veri Silinemedi [ /api/message/update ] ' + '\u001b[0m');

			}
			
			
			//! Return Delete			
			delete ctx.params.id
			delete ctx.params.userToken

			return ctx.params	

		},
        async deleted_update(ctx) {
		
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);			

			//! Veri Varsa 
			if (dbFind) {     
							
			//! Güncelleme
			dbFind["MessageDeleted"] = "1"
			dbFind["MessageDeleted_at"] = new Date()
			dbFind["updated_at"] = new Date()

			// Json içine Verileri Yazıyor -> db
			fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {

				// Hata varsa
				if (err) {
					console.log(err)
				}

				//Console Yazma
				console.log("Json Veri Kayıt Edildi -> Mesaj"); // Success
			});
			// End Json içine Verileri Yazıyor -> db


			//! ----------- Log ----------------------------- 	
			let logs_add = await ctx.call('logs.add', {					
				userToken: ctx.params.userToken,
				from: "mesaj",
				fromToken: dbFind.MessageToken,
				name: "message_deleted_update_successful",
				description: "Mesaj Silme Kutusu Başarılı"
			})			
			//! ----------- Log Son -----------------------------  


			//! Return Api	
			ctx.params.title = "message.service -> Silinen Mesajlar"
			ctx.params.tablo = "message.json"        
			ctx.params.status = 1			
			ctx.params.mesaj="Mesaj Silinen Kutusuna Gönderildi"

			//Console Yazma	
			console.log('\u001b[' + 32 + 'm' + 'Mesaj Silinen Kutusuna Gönderildi [ /api/message/deleted_update ] ' + '\u001b[0m');

		}

	    //! Veri Yoksa
		else {

			//! Return Api	
			ctx.params.title = "message.service -> Silinen Mesajlar"
			ctx.params.tablo = "message.json"        
			ctx.params.status = 0					
			ctx.params.mesaj="Mesaj Silinen Kutusuna Gönderilmedi"

			//Console Yazma	
			console.log('\u001b[' + 31 + 'm' + 'Mesaj Silinen Kutusuna Gönderilmedi [ /api/message/deleted_update ] ' + '\u001b[0m');

		}
		
		//! Delete
		delete ctx.params.id          
		delete ctx.params.userToken        
				
		return ctx.params

      
		},
		async view(ctx) {
		
		//! Arama
		const dbFind = db.find(u => u.id == ctx.params.id);			

		//! Veri Varsa 
		if (dbFind) {     

			// Gelen Kutusuna Düşmüş ise
			if(dbFind["ToUserToken"]==ctx.params.userToken) 
			{			
								
				//! Güncelleme
				dbFind["MessageReaded"] = "1"
				dbFind["MessageReaded_at"] = new Date()
				dbFind["updated_at"] = new Date()

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Mesaj"); // Success
				});
				// End Json içine Verileri Yazıyor -> db


				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "mesaj",
					fromToken: dbFind.MessageToken,
					name: "message_read_successful",
					description: "Mesaj Görüntüleme Başarılı"
				})			
				//! ----------- Log Son -----------------------------  


				//! Return Api	
				ctx.params.title = "message.service -> Mesaj Görüntüleme"
				ctx.params.tablo = "message.json"        
				ctx.params.status = 1			
				ctx.params.mesaj="Mesaj Görüntülendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + 'Mesaj Görüntülendi [ /api/message/view ] ' + '\u001b[0m');
			}
			else
			{
				//! Return Api	
				ctx.params.title = "message.service -> Mesaj Görüntüleme"
				ctx.params.tablo = "message.json"        
				ctx.params.status = 0			
				ctx.params.mesaj="Mesaj Görüntülenmedi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + 'Mesaj Görüntülenmedi [ /api/message/view ] ' + '\u001b[0m');

			}

		}

	    //! Veri Yoksa
		else {

			//! Return Api	
			ctx.params.title = "message.service -> Mesaj Görüntüleme"
			ctx.params.tablo = "message.json"        
			ctx.params.status = 0			
			ctx.params.mesaj="Mesaj Görüntülenmedi"

			//Console Yazma	
			console.log('\u001b[' + 32 + 'm' + 'Mesaj Görüntülenmedi [ /api/message/view ] ' + '\u001b[0m');

		}
		
		//! Delete
		delete ctx.params.id          
		delete ctx.params.userToken        
				
		return ctx.params

      
		},
        async inbox(ctx) {

			const message_inbox  = db.filter(u => u.ToUserToken == ctx.params.userToken && u.MessageDeleted == "0"); //! Gelen Mesaj
			const message_unreaded = db.filter(u => u.ToUserToken == ctx.params.userToken && u.MessageReaded == "0" && u.MessageDeleted == "0"); //! Okunmamış Mesajlar
			const message_readed = db.filter(u => u.ToUserToken == ctx.params.userToken && u.MessageReaded == "1" && u.MessageDeleted == "0"); //! Okunmuş Mesajlar
			const message_deleted_message  = db.filter(u => u.ToUserToken == ctx.params.userToken && u.MessageDeleted == "1"); //! Silinen Mesaj

            const message_sent = db.filter(u => u.FromUserToken == ctx.params.userToken); //! Gönderilmiş Mesajlar
            const message_unreaded_sent = db.filter(u => u.FromUserToken == ctx.params.userToken && u.MessageReaded == "0"); //! Okunmamış Gönderilmiş Mesajlar            

            //! Return
            ctx.params.title = "Mesaj Kutusu"
            ctx.params.tablo = "message.json"
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
                      
            console.log('\u001b[' + 32 + 'm' + 'Gelen Kutusu [ message/:userId ]' + '\u001b[0m'); //! Console
             
			//! Delete
			delete ctx.params.userToken 

			return ctx.params
		}       
	}
}
