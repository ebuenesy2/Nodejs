'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/password.json') //! Json


module.exports = {
	name: "pass",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "pass.service"
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
				ctx.params.title = "pass.service -> Tüm Veriler"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Password Tüm Veriler Okundu [ /api/pass/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "pass.service -> Tüm Veriler"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Password Tüm Veriler Okunamadı [ /api/pass/all ] ' + '\u001b[0m');
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
				ctx.params.title = "pass.service -> Veri Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Password Arama [ /api/pass/:id ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
			
				//! Return Api
				ctx.params.title = "pass.service -> Veri Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.DB = "Log Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Password Arama [ /api/pass/:id ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_user(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.userToken == ctx.params.userToken);

			//! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api
				ctx.params.title = "pass.service -> Kullanıcı Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Password Kullanıcı Arama [ /api/pass/find_user ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {

				//! Return Api
				ctx.params.title = "pass.service -> Kullanıcı Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.size=0
				ctx.params.DB = "Kullanıcı Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Password Kullanıcı Arama [ /api/pass/find_user ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.userToken

			return ctx.params
		},
		async findPassName(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.passName == ctx.params.passName && u.userToken == ctx.params.userToken);

			//! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api
				ctx.params.title = "pass.service -> Password Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Password Arama [ /api/pass/find_user ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {

				//! Return Api
				ctx.params.title = "pass.service -> Password Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.size=0
				ctx.params.DB = "Password Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Password Arama [ /api/pass/find_user ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.passName
			delete ctx.params.userToken

			return ctx.params
		},
		async findToken(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.passToken == ctx.params.findToken);

			//! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api
				ctx.params.title = "pass.service -> FindToken Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Password FindToken Arama [ /api/pass/findToken ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {

				//! Return Api
				ctx.params.title = "pass.service -> FindToken Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.size=0
				ctx.params.DB = "FindToken Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Password FromToken Arama [ /api/pass/findToken ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.findToken
			return ctx.params
		},
		async findCategoryToken(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.passCategoryToken == ctx.params.passCategoryToken);

			//! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api
				ctx.params.title = "pass.service -> FindCategoryToken Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Password FindToken Arama [ /api/pass/findCategoryToken ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {

				//! Return Api
				ctx.params.title = "pass.service -> FindCategoryToken Arama"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.size=0
				ctx.params.DB = "FindToken Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Password FromToken Arama [ /api/pass/findCategoryToken ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.passCategoryToken
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
					passName: ctx.params.passName,
					passUrl: ctx.params.passUrl,
					passUserName: ctx.params.passUserName,
					pass: ctx.params.pass,
					passCategoryToken: ctx.params.passCategoryToken,
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
					passName: ctx.params.passName,
					passUrl: ctx.params.passUrl,
					passUserName: ctx.params.passUserName,
					pass: ctx.params.pass,				
					passCategoryToken: ctx.params.passCategoryToken,				
					passToken:jwt,	
					created_at: CreateDate,
					updated_at: CreateDate
				}

				//Verileri Kaydet
				db.push(willSaveData)


				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/pass.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) { console.log(err) }
					
					//Console Yazma
					console.log("Password Veri Kayıt Edildi -> Password"); // Success
				});

				//! Return Api
				ctx.params.title = "pass.service -> Veri Ekleme"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Veri Eklendi"				
		    
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Password Ekleme [ /api/pass/add ] Eklendi' + '\u001b[0m');


			} catch (error) {

				//! Return Api
				ctx.params.title = "pass.service -> Veri Ekleme"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.mesaj = error
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Password Ekleme [ /api/pass/add ] Eklenemedi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.userToken
			delete ctx.params.passName
			delete ctx.params.passUrl
			delete ctx.params.passUserName
			delete ctx.params.pass
			delete ctx.params.passCategoryToken

			return ctx.params
		},
		async update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.passToken == ctx.params.passToken);		

			//! Veri Varsa 
			if (dbFind) {

				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {  dbFind[key] = ctx.params[key] })				
				dbFind["updated_at"] = new Date()
				// End  Referans Veriler Güncelleme Yapıyor

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/pass.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) { console.log(err) }

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Password"); // Success
				});
				// End Json içine Verileri Yazıyor -> db
				
				//! Return Api
				ctx.params.title = "pass.service -> Veri Güncelleme"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Password Güncelleme [ /api/pass/update ] Güncellendi' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
			
				//! Return Api
				ctx.params.title = "pass.service -> Veri Güncelleme"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.DB = "Password Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Password Güncelleme [ /api/pass/update ] Güncellenemeddi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.passToken
			delete ctx.params.userToken
			delete ctx.params.passName
			delete ctx.params.passUrl
			delete ctx.params.passUserName
			delete ctx.params.pass
			delete ctx.params.passCategoryToken

			return ctx.params
		},
		async delete(ctx) {

			//! Arama
			var index = db.findIndex(a => a.logToken === ctx.params.logToken);
			if (index > -1) {
				db.splice(index, 1);

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/pass.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) { console.log(err) }

					//Console Yazma
					console.log("Json Veri Kayıt Silindi -> Password"); // Success
				});

				//! Return Api
				ctx.params.title = "pass.service -> Veri Silme"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Password Silindi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Password Silme [ /api/pass/delete ] Silindi' + '\u001b[0m');

			} else {

				//! Return Api
				ctx.params.title = "pass.service -> Veri Silme"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.mesaj = "pass Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Log Silme [ /api/pass/delete ] Silinemedi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.passToken
    		return ctx.params
		}

	}
}
