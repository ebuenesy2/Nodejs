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
			ctx.params.title = "logs.service"
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

			ctx.params.title = "Logs -> Tüm Veriler"
			ctx.params.time = dayjs().toDate()
			ctx.params.size=db.length
			ctx.params.DB = db

			return ctx.params
		},
		async find(ctx) {


			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {

				//! Return Api
				ctx.params.title = "Logs Araama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.data_find = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Json Arama [ /api/logs/:id ] Bulundu' + '\u001b[0m');

			}

			//! Veri Yoksa
			else {
			
				//! Return Api
				ctx.params.title = "logs Arama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.data_find = "Log Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Json Arama [ /api/logs/:id ] Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async find_user(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.userToken == ctx.params.userToken);

			//! Veri Varsa
			if (dbFind) {

				//! Return Api
				ctx.params.title = "Logs Araama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.data = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Json Kullanıcı Arama [ /api/logs/find_user ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {

				//! Return Api
				ctx.params.title = "logs Araama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.size=0
				ctx.params.data = "Kullanıcı Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Json Kullanıcı Arama [ /api/logs/find_user ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.userToken

			return ctx.params
		},
		async add(ctx) {	
			
			try {

				//! Token
				let TokenId=new Date().getTime();
				let CreateDate=new Date();			

				let TokenInfo={				
					id: TokenId,
					userToken: ctx.params.userToken,
					from: ctx.params.from,
					name: ctx.params.name,
					description: ctx.params.description,
					created_at: CreateDate,
					updated_at: CreateDate
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token			
			
				//! Eklenecek veriler
				const willSaveData = {
					id: TokenId,			
					userToken: ctx.params.userToken,
					from: ctx.params.from,
					name: ctx.params.name,
					description: ctx.params.description,
					logToken:jwt,	
					created_at: CreateDate,
					updated_at: CreateDate
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
					console.log("Json Veri Kayıt Edildi"); // Success
				});

				//! Return Api
				ctx.params.title = "logs Ekleme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Veri Eklendi"				
		    
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Json Ekleme [ /api/logs/add ] Eklendi' + '\u001b[0m');


			} catch (error) {

				//! Return Api
				ctx.params.title = "logs Ekleme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.mesaj = error
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Json Ekleme [ /api/logs/add ] Eklenemedi' + '\u001b[0m');

			}

			//! Return
			delete ctx.params.userToken
			delete ctx.params.from
			delete ctx.params.name
			delete ctx.params.description

			return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.logToken == ctx.params.logToken);		

			//! Veri Varsa 
			if (dbFind) {

				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {
					dbFind[key] = ctx.params[key]
				})

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi"); // Success
				});
				
				//! Return Api
				ctx.params.title = "Logs Guncelleme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.data = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme [ /api/logs/update ] Güncellendi' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
			
				//! Return Api
				ctx.params.title = "Logs Guncelleme"
				ctx.params.tablo = "log.json"
				ctx.params.status = 0
				ctx.params.data = "logs Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Json Güncelleme [ /api/logs/update ] Güncellenemeddi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.logToken
			delete ctx.params.userToken
			delete ctx.params.from
			delete ctx.params.name
			delete ctx.params.description

			return ctx.params

		},
		async delete(ctx) {

			//! Arama
			var index = db.findIndex(a => a.logToken === ctx.params.logToken);
			if (index > -1) {
				db.splice(index, 1);

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi"); // Success
				});

				//! Return Api
				ctx.params.title = "logs Silme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.mesaj = "logs Silindi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Json Silme [ /api/logs/delete ] Silindi' + '\u001b[0m');

			} else {

				//! Return Api
				ctx.params.title = "logs Silme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.mesaj = "logs Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Json Silme [ /api/logs/delete ] Silinemedi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.logToken

    		return ctx.params

		}

	}
}
