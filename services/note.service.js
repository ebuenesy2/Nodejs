'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/note.json'); //! Json


module.exports = {
	name: "note",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "note.service -> Info"
			ctx.params.table = "note.json"
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
				ctx.params.title = "note.service -> Tüm Veriler"
				ctx.params.table = "note.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db?.sort((a, b) => (a.id > b.id ? -1 : 1))		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Note] [All] Tüm Veriler Okundu [ /api/note/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "note.service -> Tüm Veriler"
				ctx.params.table = "note.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Note] [All] SSK Tüm Veriler Okunamadı [ /api/note/all ] ' + '\u001b[0m');
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
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.table = "note.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Note] [Find] Veri Arama [ /api/note/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.table = "note.json"
				ctx.params.status = 0
				ctx.params.DB = "Note  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Note] [Find] Veri Bulunamadı [ /api/note/find ] ' + '\u001b[0m');	

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
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.table = "note.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Note] [Find] Veri Arama [ /api/note/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.table = "note.json"
				ctx.params.status = 0
				ctx.params.DB = "Note  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Note] [Find] Veri Bulunamadı [ /api/note/find_post ] ' + '\u001b[0m');	

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
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.table = "note.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Note] [Find] Veri Arama [ /api/note/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.table = "note.json"
				ctx.params.status = 0
				ctx.params.DB = "Note  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Note] [Find] Veri Bulunamadı [ /api/note/find_token ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token

			return ctx.params
		},
		async find_user(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.created_byToken == ctx.params.created_byToken);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.table = "note.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Note] [Find] Veri Arama [ /api/note/find_user ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.table = "note.json"
				ctx.params.status = 0
				ctx.params.DB = "Note  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Note] [Find] Veri Bulunamadı [ /api/note/find_user ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.created_byToken

			return ctx.params
		},
		async add(ctx) {  

			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					title: ctx.params.soru,
					content: ctx.params.cevap
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token

				//! Eklenecek veriler
				const willSaveData = {
					id:TokenId,		
					title: ctx.params.title,
					content: ctx.params.content,
					token:jwt,				
					created_at: dayjs().format(),
					created_byToken: ctx.params.created_byToken,
					isUpdated: false,
					updated_at: null,
					updated_byToken : null,
					isActive: true,
					isDeleted: false,
					deleted_at: null,
					deleted_byToken: null
				}

				//Verileri Kaydet
				db.push(willSaveData)

	
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/note.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Note] [Json] [Add] Json Veri Kayıt Edilemedi [ note.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Note] [Json] [Add] Json Veri Kayıt Edildi [ note.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	


				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "note",
					title: "note_add_successful",
					description: "Not Ekleme Başarılı",
					logStatus: "success",
					fromToken: jwt,
					created_byToken: ctx.params.created_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Note] [Logs] [Add] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Note] [Logs] [Add] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------


				//! Return Api   
				ctx.params.title = "note.service -> Veri Ekleme"
				ctx.params.table = "note.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Eklendi"	
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Note] [Add] Veri Eklendi [ /api/note/add ] ' + '\u001b[0m');	
				

			} catch (error) {

				//! Return Api   
				ctx.params.title = "note.service -> Veri Ekleme"
				ctx.params.table = "note.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Eklenemedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Note] [Add] Veri Eklenemedi [ /api/note/add ] ' + '\u001b[0m');	

			}

			//! Delete
		    delete ctx.params.created_byToken 
		    delete ctx.params.content 
              
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
				fs.writeFile('./public/DB/note.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Note] [Json] [Update] Json Veri Kayıt Edilemedi [ note.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Note] [Json] [Update] Json Veri Kayıt Edildi [ note.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
	

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "note",
					title: "note_update_successful",
					description: "Not Güncelleme Başarılı",
					logStatus: "success",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Note] [Logs] [Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Note] [Logs] [Update] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
              
                //! Return Api	
				ctx.params.title = "note.service -> Veri Güncelleme"
				ctx.params.table = "note.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Note] [Update] Veri Güncelleme [ /api/note/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "note.service -> Veri Güncelleme"
			   ctx.params.table = "note.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Note] [Update] Veri Güncellenemedi [ /api/note/update ] ' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.updated_byToken 
			delete ctx.params.token 
			delete ctx.params.content 

			return ctx.params

		},
		async delete(ctx) {
         
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/note.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Note] [Json] [Delete] Json Veri Kayıt Edilemedi [ note.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Note] [Json] [Delete] Json Veri Kayıt Edildi [ note.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "note",
					title: "note_delete_successful",
					description: "Not Silme Başarılı",
					logStatus: "success",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Note] [Logs] [Delete] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Note] [Logs] [Delete] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
				
                //! Return Api   
				ctx.params.title = "note.service -> Veri Silme"
				ctx.params.table  = "note.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Silindi"	
				
				//Console Yazma	
			    console.log('\u001b[' + 32 + 'm' + '[Note] [Delete] Veri Silindi [ /api/note/delete/:id ] ' + '\u001b[0m');
               

			} else {

				//! Return Api   
				ctx.params.title = "note.service -> Veri Silme"
				ctx.params.table  = "note.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Silinemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + '[Note] [Delete] Veri Silinemedi [ /api/note/delete/:id ] ' + '\u001b[0m');

			}
			
			
			//! Return Delete			
			delete ctx.params.id
			delete ctx.params.deleted_byToken

			return ctx.params	

		},
		async delete_update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);	

			//! Veri Varsa 
			if (dbFind) {
              
				//! Güncelleme
				dbFind["isDeleted"] = true
				dbFind["isActive"] = false
				dbFind["deleted_at"] = dayjs().format()
				dbFind["deleted_byToken"] = ctx.params.deleted_byToken
	
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/note.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Note] [Json] [Delete_Updated] Json Veri Kayıt Edilemedi [ note.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Note] [Json] [Delete_Updated] Json Veri Kayıt Edildi [ note.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
	
				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "note",
					title: "note_deleted_update_successful",
					description: "Not Geçisi Silme Başarılı",
					logStatus: "success",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Note] [Logs] [Delete_Updated] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Note] [Logs] [Delete_Updated] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son ----------------------------- 
				
              
                //! Return Api	
				ctx.params.title = "note.service -> Veri Geçisi Silme"
				ctx.params.table  = "note.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Note] [Delete_Updated] Veri Güncelleme [ /api/note/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "note.service -> Veri Geçisi Silme"
			   ctx.params.table  = "note.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Note] [Delete_Updated] Veri Güncellenemedi [ /api/note/update ] ' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.id
			delete ctx.params.deleted_byToken 
			
			return ctx.params

		}		
	}
}
