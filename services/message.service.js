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
			ctx.params.title = "message.service"
			ctx.params.time = dayjs().toDate()
			ctx.params.APi_URL = process.env.APi_URL

			return ctx.params
		},
		async post(ctx) {

			ctx.params.createdAt = dayjs().toDate();
			delete ctx.params.createdAt;

			return ctx.params
		},
		async all(ctx) {

			//JSON        

			ctx.params.title = "Mesaj -> Tüm Veriler"
            ctx.params.tablo = "message.json"
            ctx.params.status = 1
			ctx.params.size=db.length
			ctx.params.DB = db
            

			return ctx.params
		},
		async find(ctx) {

			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);

			// Kullanıcı Varsa
			if (user) {	               
                
				//api
				ctx.params.title = "Mesaj Arama"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.data_message = user
			

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ message  /:userId ]' + '\u001b[0m');
			}

			//! Kullanıcı Yoksa
			else {
				
				//api
				ctx.params.title = "Mesaj  Araama"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.data_message = "Mesaj  Bulunmadı"
			
				
				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Mesaj   Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async view(ctx) {
		
			const user = db.find(u => u.id == ctx.params.id);  // ! Arama

            //? Kullanıcı Varsa
			if (user) {

				//Static
				let status_read=0;
				let logs_add=[];

				// Gelen Kutusuna Düşmüş ise
				if(user["ToUserToken"]==ctx.params.userToken) 
				{
					status_read=1; // Okundu
	
					//! ----------- Log -----------------------------              
					logs_add = await ctx.call('logs.add', {
						token: ctx.params.token,
						userToken: ctx.params.userToken,
						name: "message_read_successful",
						description: "Mesaj Okuma Başarılı"
					})
	
					delete ctx.params.userToken 
					//! ----------- Log -----------------------------               
					
					//! Update - Güncelleme
					user["MessageReaded"] = "1"
					user["MessageReaded_at"] = new Date()
					user["updated_at"] = new Date()
	
	
					// STEP 3: Json içine Verileri Yazıyor -> db
					fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {					
						if (err) { console.log(err) } //! Error
						console.log("Json Eklendi"); // Success
					});					
								
								
				}
				else {  status_read=0; }

					//! Return 
					ctx.params.title = "Mesaj Okuma"
					ctx.params.tablo = "message.json"
					ctx.params.status = 1
					ctx.params.status_read = status_read
					ctx.params.data_message = user,
					ctx.params.data_logs = logs_add			
			}

			//! Kullanıcı Yoksa
			else {

			    //! Return 		
                ctx.params.title = "Mesaj Okuma"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.status_read = 0
                ctx.params.data_message =  "Mesaj Bulunmadı"
				ctx.params.data_logs = "Mesaj Bulunmadı"

				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Mesaj Bulunamadı' + '\u001b[0m'); //! console

			}
			
            //! Delete
            delete ctx.params.id          
            delete ctx.params.token          
            delete ctx.params.userToken        
                   
			return ctx.params
		},    
		async add(ctx) {

			ctx.params.title = "Mesaj Ekleme"
			ctx.params.tablo = "message.json"
            ctx.params.status = 1            
             
			
            //! ----------- UserInfo ----------------------------- 

			let FromUserToken_Info=ctx.params.FromUserToken;             
            let FromRole_Info=ctx.params.FromRole;   
            let Fromuser_info;
            if(FromRole_Info=="User") { Fromuser_info = await ctx.call('user.find_token', {"userToken":FromUserToken_Info})}
            if(FromRole_Info=="Admin") { Fromuser_info = await ctx.call('admin.find_token', {"userToken":FromUserToken_Info})}            
            let FromNameSurName_Info=Fromuser_info['data_user']['name']+" "+Fromuser_info['data_user']['surname'];    

            let ToUserToken_Info=ctx.params.ToUserToken;             
            let ToRole_Info=ctx.params.ToRole;   
            let Touser_info;
            if(ToRole_Info=="User") { Touser_info = await ctx.call('user.find_token', {"userToken":ToUserToken_Info})}
            if(ToRole_Info=="Admin") { Touser_info = await ctx.call('admin.find_token', {"userToken":ToUserToken_Info})}            
            let ToNameSurName_Info=Touser_info['data_user']['name']+" "+Touser_info['data_user']['surname']; 
                 
            //! ----------- UserInfo Son ----------------------------- 			
                    
			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					FromRole: ctx.params.FromRole,
					FromUserToken: ctx.params.FromUserToken,				
                    FromUserName: Fromuser_info['data_user']['username'],
					FromNameSurName: FromNameSurName_Info,
					ToRole: ctx.params.ToRole,
					ToUserToken: ctx.params.ToUserToken,
					ToUserName: Touser_info['data_user']['username'],
					ToNameSurName: ToNameSurName_Info,
					Subject: ctx.params.Subject,
					Message: ctx.params.Message,				
					MessageReaded: ctx.params.MessageReaded,		
					MessageReaded_at: new Date(),		
					MessageFileControl: ctx.params.MessageFileControl,	
					MessageDeleted: ctx.params.MessageDeleted,	
					MessageDeleted_at: new Date()		
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token				
	
				//! Eklenecek veriler
				const willSaveData = {
					id:TokenId,				
					token: ctx.params.token,
					FromRole: ctx.params.FromRole,
					FromUserToken: ctx.params.FromUserToken,
                    FromUserName: Fromuser_info['data_user']['username'],
					FromNameSurName: FromNameSurName_Info,
					ToRole: ctx.params.ToRole,
					ToUserToken: ctx.params.ToUserToken,
					ToUserName: Touser_info['data_user']['username'],
					ToNameSurName: ToNameSurName_Info,
					Subject: ctx.params.Subject,
					Message: ctx.params.Message,				
					MessageReaded: ctx.params.MessageReaded,                   
                    MessageReaded_at: new Date(),			
                    MessageFileControl: ctx.params.MessageFileControl,
                    MessageDeleted: ctx.params.MessageDeleted,	
					MessageDeleted_at: new Date(),
					MessageToken:jwt,				
					created_at: new Date(),
					updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)

                
				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi -> message"); // Success
				});

				//! Status
				ctx.params.status = 1				

				//! ----------- Log ----------------------------- 
				const user_email = db.filter(u => u.id == ctx.params.id);
					
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "message_add_successful",
					description: "Mesaj Yazma Başarılı"
				})

				ctx.params.data_logs = logs_add
				//! ----------- Log Son ----------------------------- 
				

			} catch (error) {

				//! Status
				ctx.params.status = 0
				ctx.params.data_logs = "error"

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

			return ctx.params


		},
		async update(ctx) {
			
			const user = db.find(u => u.MessageToken == ctx.params.MessageToken); // ! Arama

			//? Kullanıcı Varsa
			if (user) {

                //! ----------- Log -----------------------------              
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "message_update_successful",
                    description: "Mesaj Güncelleme Başarılı"
                })
                delete ctx.params.userToken 
				//! ----------- Log ----------------------------- 

              
				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})				
				user["updated_at"] = new Date()

				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {					
					if (err) { console.log(err) } //! Error
					console.log("Json Eklendi"); // Success
				});


                //! Return 
                ctx.params.title = "Mesaj Guncelleme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
                ctx.params.data_message = user,
				ctx.params.data_logs = logs_add

			}

			//! Kullanıcı Yoksa
			else {
				//api		
				ctx.params.title = "Mesaj Guncelleme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
                ctx.params.data_message =  "Mesaj Bulunmadı"
				ctx.params.data_logs = "Mesaj Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Mesaj Bulunamadı' + '\u001b[0m');

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
         
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {				
					if (err) { console.log(err) } //! Error
					console.log("Json Eklendi"); // Success
				});


				//api
				ctx.params.title = "Mesaj Silme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Mesaj Silindi"		
	            		
				//console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')

                 //! ----------- Log -----------------------------         
                       
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "message_delete_successful",
                    description: "Mesaj Silme Başarılı"
                })

                delete ctx.params.userToken 

                //! ----------- Log Son-------------------------

			} else {

				//api
				ctx.params.title = "Mesaj Silme"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Mesaj Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ message/:userId ]  Mesaj  Bulunamadı' + '\u001b[0m');
			}

			//console.log(sampleArray);

			//! ------------------

			//console
			console.log('\u001b[' + 32 + 'm' + 'Json Silme' + '\u001b[0m')

             delete ctx.params.id
             delete ctx.params.token
             delete ctx.params.userToken


			return ctx.params


		},
        async deleted_update(ctx) {
		
			const user = db.find(u => u.id == ctx.params.id);  // ! Arama

            //? Kullanıcı Varsa
			if (user) {

                //! ----------- Log -----------------------------              
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "message_update_successful",
                    description: "Mesaj Güncelleme Başarılı"
                })

                delete ctx.params.userToken 
				//! ----------- Log -----------------------------               
				
				//! Update - Güncelleme
				user["MessageDeleted"] = "1"
				user["MessageDeleted_at"] = new Date()
				user["updated_at"] = new Date()


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {					
					if (err) { console.log(err) } //! Error
					console.log("Json Eklendi"); // Success
				});

                //! Return 
                ctx.params.title = "Mesaj Silinen Kutusuna Gönder"
				ctx.params.tablo = "message.json"
				ctx.params.status = 1
                ctx.params.data_message = user,
				ctx.params.data_logs = logs_add

			}

			//! Kullanıcı Yoksa
			else {

			    //! Return 		
                ctx.params.title = "Mesaj Silinen Kutusuna Gönder"
				ctx.params.tablo = "message.json"
				ctx.params.status = 0
                ctx.params.data_message =  "Mesaj Bulunmadı"
				ctx.params.data_logs = "Mesaj Bulunmadı"

				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Mesaj Bulunamadı' + '\u001b[0m'); //! console

			}
			
            //! Delete
            delete ctx.params.token          
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
