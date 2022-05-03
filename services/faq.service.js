'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/faq.json'); //! Json


module.exports = {
	name: "faq",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "faq.service -> Info"
			ctx.params.table = "faq.json"
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
				ctx.params.title = "faq.service -> Tüm Veriler"
				ctx.params.table = "faq.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Faq] [All] Tüm Veriler Okundu [ /api/faq/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "faq.service -> Tüm Veriler"
				ctx.params.table = "faq.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Faq] [All] SSK Tüm Veriler Okunamadı [ /api/faq/all ] ' + '\u001b[0m');
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
				ctx.params.title = "faq.service -> Veri Arama"
				ctx.params.table = "faq.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Faq] [Find] Veri Arama [ /api/faq/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "faq.service -> Veri Arama"
				ctx.params.table = "faq.json"
				ctx.params.status = 0
				ctx.params.DB = "Faq  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Faq] [Find] Veri Bulunamadı [ /api/faq/find ] ' + '\u001b[0m');	

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
				ctx.params.title = "faq.service -> Veri Arama"
				ctx.params.table = "faq.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Faq] [Find] Veri Arama [ /api/faq/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "faq.service -> Veri Arama"
				ctx.params.table = "faq.json"
				ctx.params.status = 0
				ctx.params.DB = "Faq  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Faq] [Find] Veri Bulunamadı [ /api/faq/find_post ] ' + '\u001b[0m');	

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
				ctx.params.title = "faq.service -> Veri Arama"
				ctx.params.table = "faq.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Faq] [Find] Veri Arama [ /api/faq/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "faq.service -> Veri Arama"
				ctx.params.table = "faq.json"
				ctx.params.status = 0
				ctx.params.DB = "Faq  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Faq] [Find] Veri Bulunamadı [ /api/faq/find_token ] ' + '\u001b[0m');	

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
				ctx.params.title = "faq.service -> Veri Arama"
				ctx.params.table = "faq.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Faq] [Find] Veri Arama [ /api/faq/find_user ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "faq.service -> Veri Arama"
				ctx.params.table = "faq.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Faq  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Faq] [Find] Veri Bulunamadı [ /api/faq/find_user ] ' + '\u001b[0m');	

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
					soru: ctx.params.soru,
					cevap: ctx.params.cevap
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token

				//! Eklenecek veriler
				const willSaveData = {
					id:TokenId,		
					soru: ctx.params.soru,
					cevap: ctx.params.cevap,
					token:jwt,				
					created_at: new Date(),
					created_byToken: ctx.params.created_byToken,
					isUpdated: false,
					updated_at: null,
					updated_byToken : null,
					isActive: true,
					isDeleted: false,
					Deleted_at: null,
					Deleted_byToken: null
				}

				//Verileri Kaydet
				db.push(willSaveData)

	
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/faq.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Faq] [Json] [Add] Json Veri Kayıt Edilemedi [ faq.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Faq] [Json] [Add] Json Veri Kayıt Edildi [ faq.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db					


				// //! ----------- Log ----------------------------- 	
				// let logs_add = await ctx.call('logs.add', {					
				// 	userToken: ctx.params.FromUserToken,
				// 	from: "message",
				// 	fromToken: jwt,
				// 	name: "message_add_successful",
				// 	description: "message Yazma Başarılı"
				// })			
				// //! ----------- Log Son ----------------------------- 


				//! Return Api   
				ctx.params.title = "faq.service -> Veri Ekleme"
				ctx.params.table = "faq.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Eklendi"	
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Faq] [Add] Veri Eklendi [ /api/faq/add ] ' + '\u001b[0m');	
				

			} catch (error) {

				//! Return Api   
				ctx.params.title = "faq.service -> Veri Ekleme"
				ctx.params.table = "faq.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Eklenemedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Faq] [Add] Veri Eklenemedi [ /api/faq/add ] ' + '\u001b[0m');	

			}

			//! Delete
		    delete ctx.params.created_byToken 
		    delete ctx.params.soru 
		    delete ctx.params.cevap 
              
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
				fs.writeFile('./public/DB/faq.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Faq] [Json] [Update] Json Veri Kayıt Edilemedi [ faq.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Faq] [Json] [Update] Json Veri Kayıt Edildi [ faq.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
	
				// //! ----------- Log ----------------------------- 	
				// let logs_add = await ctx.call('logs.add', {					
				// 	userToken: ctx.params.userToken,
				// 	from: "ssk",
				// 	fromToken: ctx.params.sskToken,
				// 	name: "faq_update_successful",
				// 	description: "SSK Güncelleme Başarılı"
				// })			
				// //! ----------- Log Son -----------------------------  
				
              
                //! Return Api	
				ctx.params.title = "faq.service -> Veri Güncelleme"
				ctx.params.table = "faq.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Faq] [Update] Veri Güncelleme [ /api/faq/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "faq.service -> Veri Güncelleme"
			   ctx.params.table = "faq.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Faq] [Update] Veri Güncellenemedi [ /api/faq/update ] ' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.updated_byToken 
			delete ctx.params.token 
			delete ctx.params.soru 
			delete ctx.params.cevap 

			return ctx.params

		},
		async delete(ctx) {
         
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/faq.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Faq] [Json] [Delete] Json Veri Kayıt Edilemedi [ ssk.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Faq] [Json] [Delete] Json Veri Kayıt Edildi [ ssk.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
				
				// //! ----------- Log ----------------------------- 	
				// let logs_add = await ctx.call('logs.add', {					
				// 	userToken: ctx.params.userToken,
				// 	from: "ssk",
				// 	fromToken: dbFind.sskToken,
				// 	name: "faq_delete_successful",
                //     description: "SSK Silme Başarılı"
				// })	
				// delete ctx.params.userToken 		
				// //! ----------- Log Son -----------------------------  
				
                //! Return Api   
				ctx.params.title = "faq.service -> Veri Silme"
				ctx.params.table = "faq.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Silindi"	
				
				//Console Yazma	
			    console.log('\u001b[' + 32 + 'm' + '[Faq] [Delete] Veri Silindi [ /api/faq/delete/:id ] ' + '\u001b[0m');
               

			} else {

				//! Return Api   
				ctx.params.title = "faq.service -> Veri Silme"
				ctx.params.table = "faq.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Silinemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + '[Faq] [Delete] Veri Silinemedi [ /api/faq/delete/:id ] ' + '\u001b[0m');

			}
			
			
			//! Return Delete			
			delete ctx.params.id
			delete ctx.params.Deleted_byToken

			return ctx.params	

		},
		async delete_update (ctx) {

			// ! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa 
			if (dbFind) {
              
				//! Güncelleme
				dbFind["isDeleted"] = true
				dbFind["isActive"] = false
				dbFind["Deleted_at"] = new Date()
				dbFind["Deleted_byToken"] = ctx.params.Deleted_byToken
	
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/faq.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Faq] [Json] [Delete_Updated] Json Veri Kayıt Edilemedi [ faq.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Faq] [Json] [Delete_Updated] Json Veri Kayıt Edildi [ faq.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
	
				// //! ----------- Log ----------------------------- 	
				// let logs_add = await ctx.call('logs.add', {					
				// 	userToken: ctx.params.userToken,
				// 	from: "ssk",
				// 	fromToken: ctx.params.sskToken,
				// 	name: "faq_update_successful",
				// 	description: "SSK Güncelleme Başarılı"
				// })			
				// //! ----------- Log Son -----------------------------  
				
              
                //! Return Api	
				ctx.params.title = "faq.service -> Veri Geçisi Silme"
				ctx.params.table = "faq.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Faq] [Delete_Updated] Veri Güncelleme [ /api/faq/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "faq.service -> Veri Geçisi Silme"
			   ctx.params.table = "faq.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Faq] [Delete_Updated] Veri Güncellenemedi [ /api/faq/update ] ' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.id
			delete ctx.params.Deleted_byToken 

			return ctx.params

		},
	}
}
