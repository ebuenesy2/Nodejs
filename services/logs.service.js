'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/logs.json') //! Json


module.exports = {
	name: "logs",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "logs.service"
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
                        <p>Hello API ebu enes!</p>
                    </body>
                    </html>
            `);
			
		},
		async all(ctx) {

			try {

				//! Return Api   
				ctx.params.title = "logs.service -> Tüm Veriler"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Log Tüm Veriler Okundu [ /api/logs/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "logs.service -> Tüm Veriler"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Log Tüm Veriler Okunamadı [ /api/logs/all ] ' + '\u001b[0m');
				console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
			
			}

			//! Return
			return ctx.params

		},
		async find(ctx) {


			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {

				//! Return Api
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Log Arama [ /api/logs/:id ] Bulundu' + '\u001b[0m');

			}

			//! Veri Yoksa
			else {
			
				//! Return Api
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.DB = "Log Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Log Arama [ /api/logs/:id ] Bulunamadı' + '\u001b[0m');

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
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind	

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Logs Veri Arama [ /api/logs/find_token ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {

				//! Return Api
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Logs Veri Arama [ /api/logs/find_token ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.id
			return ctx.params
		},
		async find_token(ctx) { 

			// ! Arama
			const dbFind = db.filter(u => u.token == ctx.params.token);

			//! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Logs Veri Arama [ /api/logs/find_token ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {

				//! Return Api
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.size=0
				ctx.params.DB = "Veri Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Logs Veri Arama [ /api/logs/find_token ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.token
			return ctx.params
		},
		async find_user(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.created_byToken == ctx.params.created_byToken);

			//! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api
				ctx.params.title = "logs.service -> Veri Kullanıcı Arama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Logs Veri Arama [ /api/logs/find_user ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {

				//! Return Api
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.tablo = "note.json"
				ctx.params.status = 0
				ctx.params.size=0
				ctx.params.DB = "Veri Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Logs Veri Arama [ /api/note/find_user ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.created_byToken

			return ctx.params
		},
		async find_user_tablo(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.created_byToken == ctx.params.created_byToken && u.tablo == ctx.params.tablo);

			//! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api
				ctx.params.title = "logs.service -> Veri Kullanıcı Tablo Arama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Logs Veri Arama [ /api/logs/find_user ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {

				//! Return Api
				ctx.params.title = "logs.service -> Veri Kullanıcı Tablo Arama"
				ctx.params.tablo = "note.json"
				ctx.params.status = 0
				ctx.params.size=0
				ctx.params.DB = "Veri Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Logs Veri Arama [ /api/note/find_user ] Bulunamadı' + '\u001b[0m');
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
					tablo: ctx.params.tablo,
					title: ctx.params.title,
					description: ctx.params.description,
					created_byToken: ctx.params.created_byToken
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token			
			
				//! Eklenecek veriler
				const willSaveData = {
					id: TokenId,			
					tablo: ctx.params.tablo,
					title: ctx.params.title,
					description: ctx.params.description,
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


				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}
					
					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Log"); // Success
				});

				//! Return Api
				ctx.params.title = "logs.service -> Veri Ekleme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Veri Eklendi"				
		    
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Log Ekleme [ /api/logs/add ] Eklendi' + '\u001b[0m');


			} catch (error) {

				//! Return Api
				ctx.params.title = "logs.service -> Veri Ekleme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.mesaj = error
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Log Ekleme [ /api/logs/add ] Eklenemedi' + '\u001b[0m');

			}

			//! Return
			delete ctx.params.description
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
					dbFind[key] = ctx.params[key]
				})				
				dbFind["isUpdated"] = true
				dbFind["updated_at"] = new Date()
				// End  Referans Veriler Güncelleme Yapıyor

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Log"); // Success
				});
				// End Json içine Verileri Yazıyor -> db
				
				//! Return Api
				ctx.params.title = "logs.service -> Veri Güncelleme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Log Güncelleme [ /api/logs/update ] Güncellendi' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
			
				//! Return Api
				ctx.params.title = "logs.service -> Veri Güncelleme"
				ctx.params.tablo = "log.json"
				ctx.params.status = 0
				ctx.params.DB = "logs Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Log Güncelleme [ /api/logs/update ] Güncellenemeddi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.token
			delete ctx.params.updated_byToken
			

			return ctx.params

		},
		async delete(ctx) {

			//! Arama
			var index = db.findIndex(a => a.id == ctx.params.id);
			if (index > -1) {
				db.splice(index, 1);

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) { console.log(err) }

					//Console Yazma
					console.log("Json Veri Kayıt Silindi -> Note"); // Success
				});

				//! Return Api
				ctx.params.title = "logs.service -> Veri Silme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Veri Silindi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Logs Veri Silindi [ /api/logs/delete ] Silindi' + '\u001b[0m');

			} else {

				//! Return Api
				ctx.params.title = "logs.service -> Veri Silme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Logs Veri Siinemedi [ /api/logs/delete ] Silinemedi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.Deleted_byToken
			delete ctx.params.id

    		return ctx.params
		}

	}
}
