'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/ssk.json'); //! Json


module.exports = {
	name: "ssk",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "ssk.service"
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
				ctx.params.title = "ssk.service -> Tüm Veriler"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'SSK Tüm Veriler Okundu [ /api/ssk/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "ssk.service -> Tüm Veriler"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'SSK Tüm Veriler Okunamadı [ /api/ssk/all ] ' + '\u001b[0m');
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
				ctx.params.title = "ssk.service -> Veri Arama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'SSK Veri Arama [ /api/ssk/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "ssk.service -> Veri Arama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 0
				ctx.params.DB = "SSK  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'SSK Veri Bulunamadı [ /api/ssk/find ] ' + '\u001b[0m');	

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
				ctx.params.title = "ssk.service -> Veri Arama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'SSK Veri Arama [ /api/ssk/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "ssk.service -> Veri Arama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 0
				ctx.params.DB = "SSK  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'SSK Veri Bulunamadı [ /api/ssk/find_post ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_token(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.sskToken == ctx.params.sskToken);	

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "ssk.service -> Veri Arama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'SSK Veri Arama [ /api/ssk/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "ssk.service -> Veri Arama"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 0
				ctx.params.DB = "SSK  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'SSK Veri Bulunamadı [ /api/ssk/find_token ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.sskToken

			return ctx.params
		},
		async add(ctx) {
           
			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					token: ctx.params.token,
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
					token: ctx.params.token,
					soru: ctx.params.soru,
					cevap: ctx.params.cevap,
					sskToken:jwt,				
					created_at: new Date(),
					updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/ssk.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}							

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> SSK "); // Success
				});	
				//End Json içine Verileri Yazıyor -> db

				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "ssk",
					fromToken: jwt,
					name: "faq_add_successful",
					description: "SSK Ekleme Başarılı"
				})			
				//! ----------- Log Son -----------------------------  


				//! Return Api	
				ctx.params.title = "ssk.service -> Veri Ekleme"
				ctx.params.tablo = "ssk.json"        
				ctx.params.status = 1			
				ctx.params.mesaj="Veri Eklendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + 'Veri Eklendi [ /api/ssk/add ] ' + '\u001b[0m');
		


			} catch (error) {

				
				//! Return Api	
				ctx.params.title = "ssk.service -> Veri Ekleme"
				ctx.params.tablo = "ssk.json"        
				ctx.params.status = 0			
				ctx.params.mesaj="Veri Eklenemedi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + 'Veri Eklenemedi [ /api/ssk/add ] ' + '\u001b[0m');

			}  

			//! Return	
            delete ctx.params.token 
            delete ctx.params.userToken 
            delete ctx.params.soru 
            delete ctx.params.cevap 

			return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.sskToken == ctx.params.sskToken);

			//! Veri Varsa 
			if (dbFind) {
              
				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {					
					if(key!="userToken"  ) { dbFind[key] = ctx.params[key] }  //! Only Text 				
				})
				dbFind["updated_at"] = new Date()
				// End  Referans Veriler Güncelleme Yapıyor

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/ssk.json', JSON.stringify(db), err => {					
				
					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> SSK"); // Success
				});	
				// End Json içine Verileri Yazıyor -> db	
	
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "ssk",
					fromToken: ctx.params.sskToken,
					name: "faq_update_successful",
					description: "SSK Güncelleme Başarılı"
				})			
				//! ----------- Log Son -----------------------------  
				
              
                //! Return Api	
				ctx.params.title = "ssk.service -> Veri Güncelleme"
				ctx.params.tablo = "ssk.json"        
				ctx.params.status = 1			
				ctx.params.mesaj="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + 'Veri Güncelleme [ /api/ssk/update ] ' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "ssk.service -> Veri Güncelleme"
			   ctx.params.tablo = "ssk.json"        
			   ctx.params.status = 0			
			   ctx.params.mesaj="Veri Güncellendi"

			   //Console Yazma	
			   console.log('\u001b[' + 32 + 'm' + 'Veri Güncelleme [ /api/ssk/update ] ' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.userToken 
			delete ctx.params.token 
			delete ctx.params.sskToken 
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

			   // Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/message.json', JSON.stringify(db), err => {					
				
					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> SSK"); // Success
				});	
				// End Json içine Verileri Yazıyor -> db	
				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "ssk",
					fromToken: dbFind.sskToken,
					name: "faq_delete_successful",
                    description: "SSK Silme Başarılı"
				})	
				delete ctx.params.userToken 		
				//! ----------- Log Son -----------------------------  
				
                //! Return Api   
				ctx.params.title = "ssk.service -> Veri Silme"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Veri Silindi"	
				
				//Console Yazma	
			    console.log('\u001b[' + 32 + 'm' + 'SSK Veri Silindi [ /api/ssk/delete/:id ] ' + '\u001b[0m');
               

			} else {

				//! Return Api   
				ctx.params.title = "ssk.service -> Veri Silme"
				ctx.params.tablo = "ssk.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Veri Silinemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + 'SSK Veri Silinemedi [ /api/message/update ] ' + '\u001b[0m');

			}
			
			
			//! Return Delete			
			delete ctx.params.id
			delete ctx.params.userToken

			return ctx.params	

		},
	}
}
