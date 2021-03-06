'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/logs.json'); //! Json


module.exports = {
	name: "logs",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "logs.service -> Info"
			ctx.params.table = "logs.json"
			ctx.params.time = dayjs().format()
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
				ctx.params.title = "logs.service -> Tüm Veriler"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db?.sort((a, b) => (a.id > b.id ? -1 : 1))

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [All] Tüm Veriler Okundu [ /api/logs/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "logs.service -> Tüm Veriler"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [All] Tüm Veriler Okunamadı [ /api/logs/all ] ' + '\u001b[0m');
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
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find ] ' + '\u001b[0m');	

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
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_post ] ' + '\u001b[0m');	

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
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_token ] ' + '\u001b[0m');	

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
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_user ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_user ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token
			delete ctx.params.created_byToken

			return ctx.params
		},
		async find_user_table(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.created_byToken == ctx.params.created_byToken && u.table == ctx.params.table);
			delete ctx.params.table

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_user_table ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_user_table ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token
			delete ctx.params.created_byToken

			return ctx.params
		},
		async find_table(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.table == ctx.params.table);
			delete ctx.params.table

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_table ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_table ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token
			delete ctx.params.created_byToken

			return ctx.params
		},
		async find_fromToken(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.fromToken == ctx.params.fromToken);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_fromToken ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_fromToken ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token
			delete ctx.params.created_byToken
			delete ctx.params.fromToken

			return ctx.params
		},
		async find_user_fromToken(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.created_byToken == ctx.params.created_byToken && u.fromToken == ctx.params.fromToken);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_user_fromToken ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_user_fromToken ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token
			delete ctx.params.created_byToken
			delete ctx.params.fromToken

			return ctx.params
		},
		async find_title_fromToken(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.title == ctx.params.title && u.fromToken == ctx.params.fromToken);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_title_fromToken ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_title_fromToken ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token
			delete ctx.params.created_byToken
			delete ctx.params.fromToken

			return ctx.params
		},
		async find_user_title_fromToken(ctx) {

			// ! Arama
			const dbFind = db.filter(u =>  u.created_byToken == ctx.params.created_byToken && u.title == ctx.params.title && u.fromToken == ctx.params.fromToken);

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_title_fromToken ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Logs  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_title_fromToken ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token
			delete ctx.params.created_byToken
			delete ctx.params.fromToken

			return ctx.params
		},
		async find_date_diff(ctx) {

			//! Zamanı Buluyor
			let refDate = ctx.params.refDate
			let ref = ctx.params.ref
			let refCount = ctx.params.refCount
			let beforeAfter = ctx.params.beforeAfter
			let refNow = ctx.params.refNow

            let dateLater = beforeAfter === "before" ? dayjs(refDate).subtract(refCount, ref).format() : dayjs(refDate).add(refCount, ref).format();
			let dateLaterBefore = beforeAfter === "before" ? dayjs(dateLater).subtract(refCount, ref).format() : dayjs(dateLater).add(refCount, ref).format();
			

			// ! Veri Tabanı Arıyor
			let dbFind = beforeAfter === "after" ? db.filter(u => u.created_at >= refDate && u.created_at <= dateLater) :
				db.filter(u => u.created_at >= dateLater && u.created_at <= refDate);
			
			let dbFindBefore = beforeAfter === "after" ? db.filter(u => u.created_at >= dateLater && u.created_at <= dateLaterBefore) :
				db.filter(u => u.created_at >= dateLaterBefore && u.created_at <= dateLater);
			
			
			//! Hesaplama
			let difference = dbFind.length - dbFindBefore.length
			let differencePercent =(difference / dbFind.length)*100
			let positiveNegative = difference > 0 ? "positive" : difference < 0 ? "negative" : "normal";	
			
			
			
			//! Delete
			delete ctx.params.refDate
			delete ctx.params.ref
			delete ctx.params.refCount
			delete ctx.params.beforeAfter
			delete ctx.params.refNow

			//! Veri Varsa
			if (dbFind) {	                
                
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama Zaman Farkı"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.refDate = refDate
				ctx.params.dateLater = dateLater
				ctx.params.ref = ref
		    	ctx.params.refCount = refCount
				ctx.params.beforeAfter = beforeAfter
				ctx.params.refNow = refNow
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind?.sort((a, b) => (a.id > b.id ? -1 : 1))
				ctx.params.dateLaterBefore = dateLaterBefore
				ctx.params.sizeBefore=dbFindBefore.length
				ctx.params.DbBefore = dbFindBefore?.sort((a, b) => (a.id > b.id ? -1 : 1))
				ctx.params.difference = difference
				ctx.params.differencePercent = differencePercent
				ctx.params.positiveNegative = positiveNegative

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Find] Veri Arama [ /api/logs/find_date_diff ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "logs.service -> Veri Arama"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
	            ctx.params.refDate = ""
				ctx.params.dateLater = ""
				ctx.params.ref = ""
		    	ctx.params.refCount = 0
				ctx.params.beforeAfter = ""
				ctx.params.refNow = ""
				ctx.params.size= 0
				ctx.params.DB = []
				ctx.params.dateLaterBefore = ""
				ctx.params.sizeBefore= 0
				ctx.params.DbBefore = []
				ctx.params.difference = 0
				ctx.params.differencePercent = 0
				ctx.params.positiveNegative = ""
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Find] Veri Bulunamadı [ /api/logs/find_date_diff ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token
			delete ctx.params.created_byToken
			delete ctx.params.fromToken

			return ctx.params
		},
		async add(ctx) {  

			try {

				
				let user_find = await ctx.call('user.find_token', { token: ctx.params.created_byToken }) //! User        
				//console.log("user_find:",user_find);
				//console.log("userId:",user_find.DB.id);


				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,
					table: ctx.params.table,
					title: ctx.params.title
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token

				//! Eklenecek veriler
				const willSaveData = {
					id: TokenId,			
					table: ctx.params.table,
					title: ctx.params.title,
					description: ctx.params.description,
					logStatus: ctx.params.logStatus,
					fromToken: ctx.params.fromToken,
					token:jwt,				
					created_at: dayjs().format(),
					created_byToken: ctx.params.created_byToken,
					created_byUserId: user_find.DB.id,
					created_byUserNameSurname: null,
					isUpdated: false,
					updated_at: null,
					updated_byToken : null,
					isReaded: false,                   
                    readed_at: null,	
                    readed_byToken: null,	
					isActive: true,
					isDeleted: false,
					deleted_at: null,
					deleted_byToken: null
				}

				//Verileri Kaydet
				db.push(willSaveData)

	
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Logs] [Json] [Add] Json Veri Kayıt Edilemedi [ logs.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Logs] [Json] [Add] Json Veri Kayıt Edildi [ logs.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db
				
				//! Delete
				delete ctx.params.table

				//! Return Api   
				ctx.params.title = "logs.service -> Veri Ekleme"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Eklendi"	
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Add] Veri Eklendi [ /api/logs/add ] ' + '\u001b[0m');	
				

			} catch (error) {

				//! Return Api   
				ctx.params.title = "logs.service -> Veri Ekleme"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Eklenemedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Add] Veri Eklenemedi [ /api/logs/add ] ' + '\u001b[0m');	

			}

			//! Return
			delete ctx.params.created_byToken
			delete ctx.params.description
			delete ctx.params.logStatus
		    delete ctx.params.fromToken
			
              
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
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Logs] [Json] [Update] Json Veri Kayıt Edilemedi [ logs.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Logs] [Json] [Update] Json Veri Kayıt Edildi [ logs.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db
			  
				//! Delete
				delete ctx.params.table
              
                //! Return Api	
				ctx.params.title = "logs.service -> Veri Güncelleme"
				ctx.params.table = "logs.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Update] Veri Güncelleme [ /api/logs/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "logs.service -> Veri Güncelleme"
			   ctx.params.table = "logs.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Logs] [Update] Veri Güncellenemedi [ /api/logs/update ] ' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.updated_byToken 
			delete ctx.params.token 
			delete ctx.params.description 

			return ctx.params

		},
		async delete(ctx) {
         
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Logs] [Json] [Delete] Json Veri Kayıt Edilemedi [ logs.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Logs] [Json] [Delete] Json Veri Kayıt Edildi [ logs.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
				
                //! Return Api   
				ctx.params.title = "logs.service -> Veri Silme"
				ctx.params.table = "logs.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Silindi"	
				
				//Console Yazma	
			    console.log('\u001b[' + 32 + 'm' + '[Logs] [Delete] Veri Silindi [ /api/logs/delete/:id ] ' + '\u001b[0m');
               

			} else {

				//! Return Api   
				ctx.params.title = "logs.service -> Veri Silme"
				ctx.params.table = "logs.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Silinemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + '[Logs] [Delete] Veri Silinemedi [ /api/logs/delete/:id ] ' + '\u001b[0m');

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
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Logs] [Json] [Delete_Updated] Json Veri Kayıt Edilemedi [ logs.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Logs] [Json] [Delete_Updated] Json Veri Kayıt Edildi [ logs.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	
					
              
                //! Return Api	
				ctx.params.title = "logs.service -> Veri Geçisi Silme"
				ctx.params.table = "logs.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Logs] [Delete_Updated] Veri Güncelleme [ /api/logs/delete_update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "logs.service -> Veri Geçisi Silme"
			   ctx.params.table = "logs.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Logs] [Delete_Updated] Veri Güncellenemedi [ /api/logs/delete_update ] ' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.id
			delete ctx.params.Deleted_byToken   

			return ctx.params

		}
	}
}
