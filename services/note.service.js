'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/note.json') //! Json


module.exports = {
	name: "note",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "note.service"
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
				ctx.params.title = "note.service -> Tüm Veriler"
				ctx.params.tablo = "note.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Note Tüm Veriler Okundu [ /api/note/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "pass.service -> Tüm Veriler"
				ctx.params.tablo = "pass.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Note Tüm Veriler Okunamadı [ /api/note/all ] ' + '\u001b[0m');
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
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.tablo = "note.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Note Arama [ /api/note/:id ] Bulundu' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
			
				//! Return Api
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.tablo = "note.json"
				ctx.params.status = 0
				ctx.params.DB = "Note Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Note Arama [ /api/note/:id ] Bulunamadı' + '\u001b[0m');
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
				ctx.params.tablo = "note.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma 
				console.log('\u001b[' + 32 + 'm' + 'Note Veri Arama [ /api/note/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.tablo = "note.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Note Veri Bulunamadı [ /api/note/find_post ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.id

			return ctx.params
		},
        async find_token(ctx) { 

			// ! Arama
			const dbFind = db.filter(u => u.createdToken == ctx.params.createdToken);

			//! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.tablo = "note.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Note Veri Arama [ /api/note/find_token ] Bulundu' + '\u001b[0m');
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
				console.log('\u001b[' + 31 + 'm' + 'Note Veri Arama [ /api/note/find_token ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.createdToken
			return ctx.params
		},
		async find_user(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.created_byToken == ctx.params.created_byToken);

			//! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api
				ctx.params.title = "note.service -> Veri Arama"
				ctx.params.tablo = "note.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Note Veri Arama [ /api/note/find_user ] Bulundu' + '\u001b[0m');
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
				console.log('\u001b[' + 31 + 'm' + 'Note Veri Arama [ /api/note/find_user ] Bulunamadı' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.created_byToken

			return ctx.params
		},	
		async add(ctx) {	
			
			try {

				//! Token
				let TokenId=new Date().getTime();
				let CreateDate=new Date();			

				let TokenInfo={				
					id: TokenId,
					title: ctx.params.title,
					content: ctx.params.content,
					created_at: CreateDate,
                    created_byToken: ctx.params.created_byToken				
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token			
			
				//! Eklenecek veriler
				const willSaveData = {
                    id: TokenId,
					title: ctx.params.title,
					content: ctx.params.content,
                    createdToken:jwt,
					created_at: CreateDate,
                    created_byToken: ctx.params.created_byToken,
					updated_at: null,
					updated_byToken: null,
                    isDeleted: false,
                    isDeleted_at:null,
                    isDeleted_byToken:null
				}

				//Verileri Kaydet
				db.push(willSaveData)


				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/note.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) { console.log(err) }
					
					//Console Yazma
					console.log("Note Veri Kayıt Edildi -> Note"); // Success
				});

				//! Return Api
				ctx.params.title = "note.service -> Veri Ekleme"
				ctx.params.tablo = "note.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Veri Eklendi"				
		    
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Note Veri Ekleme [ /api/note/add ] Eklendi' + '\u001b[0m');


			} catch (error) {

				//! Return Api
				ctx.params.title = "note.service -> Veri Ekleme"
				ctx.params.tablo = "note.json"
				ctx.params.status = 0
				ctx.params.mesaj = error
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Note Veri Eklenemedi [ /api/note/add ] Eklenemedi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.created_byToken
			delete ctx.params.title
			delete ctx.params.content

			return ctx.params
		},
		async update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.createdToken == ctx.params.createdToken);		

			//! Veri Varsa 
			if (dbFind) {

				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {  dbFind[key] = ctx.params[key] })				
				dbFind["updated_at"] = new Date()
				dbFind["updated_byToken"] = ctx.params.updated_byToken
				// End  Referans Veriler Güncelleme Yapıyor

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/note.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) { console.log(err) }

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Note"); // Success
				});
				// End Json içine Verileri Yazıyor -> db
				
				//! Return Api
				ctx.params.title = "note.service -> Note Veri Güncelleme"
				ctx.params.tablo = "note.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + ' Note Veri Güncelleme [ /api/note/update ] Güncellendi' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
			
				//! Return Api
				ctx.params.title = "note.service -> Veri Güncelleme"
				ctx.params.tablo = "note.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Note Veri Güncellenemedi [ /api/note/update ] Güncellenemeddi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.created_byToken
			delete ctx.params.createdToken
			delete ctx.params.title
			delete ctx.params.content

			return ctx.params
		},
        async updated_delete(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.createdToken == ctx.params.createdToken);		

			//! Veri Varsa 
			if (dbFind) {

				// Referans Veriler Güncelleme Yapıyor
				Object.keys(ctx.params).forEach(key => {  dbFind[key] = ctx.params[key] })				
				dbFind["isDeleted"] = true
				dbFind["isDeleted_at"] = new Date()
				dbFind["isDeleted_byToken"] = ctx.params.isDeleted_byToken
				// End  Referans Veriler Güncelleme Yapıyor

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/note.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) { console.log(err) }

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> Note"); // Success
				});
				// End Json içine Verileri Yazıyor -> db
				
				//! Return Api
				ctx.params.title = "note.service -> Note Veri Güncelleme"
				ctx.params.tablo = "note.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + ' Note Veri Güncelleme [ /api/note/update ] Güncellendi' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
			
				//! Return Api
				ctx.params.title = "note.service -> Veri Güncelleme"
				ctx.params.tablo = "note.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Note Veri Güncellenemedi [ /api/note/update ] Güncellenemeddi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.created_byToken
			delete ctx.params.createdToken
			delete ctx.params.title
			delete ctx.params.content

			return ctx.params
		},
		async delete(ctx) {

			//! Arama
			var index = db.findIndex(a => a.id == ctx.params.id);
			if (index > -1) {
				db.splice(index, 1);

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/note.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) { console.log(err) }

					//Console Yazma
					console.log("Json Veri Kayıt Silindi -> Note"); // Success
				});

				//! Return Api
				ctx.params.title = "note.service -> Veri Silme"
				ctx.params.tablo = "note.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Veri Silindi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Note Veri Silindi [ /api/note/delete ] Silindi' + '\u001b[0m');

			} else {

				//! Return Api
				ctx.params.title = "note.service -> Veri Silme"
				ctx.params.tablo = "note.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Note Veri Siinemedi [ /api/note/delete ] Silinemedi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.userToken
			delete ctx.params.id

    		return ctx.params
		}

	}
}
