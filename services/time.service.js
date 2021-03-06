'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/time.json'); //! Json


module.exports = {
	name: "time",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "time.service -> Info"
			ctx.params.table = "time.json"
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
				ctx.params.title = "time.service -> Tüm Veriler"
				ctx.params.table = "time.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db?.sort((a, b) => (a.id > b.id ? -1 : 1))

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Time] [All] Tüm Veriler Okundu [ /api/time/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "time.service -> Tüm Veriler"
				ctx.params.table = "time.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Time] [All] SSK Tüm Veriler Okunamadı [ /api/time/all ] ' + '\u001b[0m');
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
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Time] [Find] Veri Arama [ /api/time/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 0
				ctx.params.DB = "time  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Time] [Find] Veri Bulunamadı [ /api/time/find ] ' + '\u001b[0m');	

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
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Time] [Find] Veri Arama [ /api/time/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 0
				ctx.params.DB = "Time  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Time] [Find] Veri Bulunamadı [ /api/time/find_post ] ' + '\u001b[0m');	

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
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Time] [Find] Veri Arama [ /api/time/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 0
				ctx.params.DB = "Time  Bulunmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Time] [Find] Veri Bulunamadı [ /api/time/find_token ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.token

			return ctx.params
		},
		async find_user(ctx) {

			// ! ****  Arama **** //
			const dbFind = db.filter(u => u.userToken == ctx.params.userToken ); //! Tümünü Gösteriyor
            // ! ****  Arama Son **** //

			// ! ****  Duration **** //
			let total_duration = 0;
			for(var i=0;i<dbFind.length;i++) { total_duration = total_duration + Number(dbFind[i].durationMs); }
			// ! ****  Duration Son **** //

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 1
				ctx.params.durationMs = total_duration
				ctx.params.size=dbFind.length
				ctx.params.DB = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Time] [Find] Veri Arama [ /api/time/find_user ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 0
				ctx.params.durationMs = 0
				ctx.params.size= 0
				ctx.params.DB = []
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Time] [Find] Veri Bulunamadı [ /api/time/find_user ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.userToken

			return ctx.params
		},
		async find_user_page(ctx) {

			// ! ****  Arama **** //
			const dbFind = db.filter(u => u.userToken == ctx.params.userToken && u.pageTable == ctx.params.pageTable && u.pageToken == ctx.params.pageToken ); //! Tümünü Gösteriyor
			const dbFind_Online = db.filter(u => u.userToken == ctx.params.userToken && u.pageTable == ctx.params.pageTable && u.pageToken == ctx.params.pageToken && u.loginOutAt == null ); //! Online Olanlar
			const dbFind_Offline = db.filter(u => u.userToken == ctx.params.userToken && u.pageTable == ctx.params.pageTable && u.pageToken == ctx.params.pageToken && u.loginOutAt != null ); //! Offline Olanlar
            // ! ****  Arama Son **** //
			
			// ! ****  Duration **** //
			let total_duration = 0;
			for(var i=0;i<dbFind_Offline.length;i++) { total_duration = total_duration + Number(dbFind_Offline[i].durationMs); }
			// ! ****  Duration Son **** //

			//! Veri Varsa
			if (dbFind) {	               
                
				//! Return Api   
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 1
				ctx.params.durationMs = total_duration
				ctx.params.size_online = dbFind_Online.length
				ctx.params.DB_online = dbFind_Online
				ctx.params.size_offline = dbFind_Offline.length
				ctx.params.DB_offline = dbFind_Offline
				ctx.params.size_total=dbFind.length
				ctx.params.DB_total = dbFind
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Time] [Find] Veri Arama [ /api/time/find_user_page ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "time.service -> Veri Arama"
				ctx.params.table = "time.json"
				ctx.params.status = 0
				ctx.params.durationMs = 0
				ctx.params.size_online = 0
				ctx.params.DB_online = []
				ctx.params.size_offline = 0
				ctx.params.DB_offline = []
				ctx.params.size_total= 0
				ctx.params.DB_total = []
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Time] [Find] Veri Bulunamadı [ /api/time/find_user_page ] ' + '\u001b[0m');	

			}

            //! Return
			delete ctx.params.userToken
			delete ctx.params.pageTable
			delete ctx.params.pageToken

			return ctx.params
		},
		async add(ctx) {  

			try { 

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					socketId: ctx.params.socketId,
					socketToken: ctx.params.socketToken,
					pageTable: ctx.params.pageTable,
					pageToken: ctx.params.pageToken
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token

                let user_find = await ctx.call('user.find', { id: Number(ctx.params.socketId) }) //! User    			
         
                //! Eklenecek veriler
				const willSaveData = {
					id:TokenId,		
					socketId: ctx.params.socketId,
					socketToken: ctx.params.socketToken,
                    userToken: user_find.DB.token,
					pageTable: ctx.params.pageTable,
                    pageToken: ctx.params.pageToken,
					workingMod:ctx.params.workingMod,
					loginAt: dayjs().format(),
                    loginOutAt: null,
                    durationMs: 0,
					token:jwt,				
					created_at: dayjs().format(),
					created_byToken: user_find.DB.token,
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
				fs.writeFile('./public/DB/time.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Time] [Json] [Add] Json Veri Kayıt Edilemedi [ time.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Time] [Json] [Add] Json Veri Kayıt Edildi [ time.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db
       


				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "time",
					title: "time_add_successful",
					description: "Time Ekleme Başarılı",
					logStatus: "success",
					fromToken: jwt,
					created_byToken: ctx.params.created_byToken ? ctx.params.created_byToken : user_find.DB.token
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Time] [Logs] [Add] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Time] [Logs] [Add] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------


                //! -----------  User UPDATE ----------------------------- 	
				let user_updateUrl = await ctx.call('user.updateUrl', {
					token:user_find.DB.token,
					updated_byToken: user_find.DB.token,
					onlineStatus: true,                  
					onlineLastLogin_At: dayjs().format(),
					onlineLastLoginout_At:null,
					onlinePage: ctx.params.pageTable,
                    onlinePageToken: ctx.params.pageToken,
					onlineMod:ctx.params.workingMod
				})		
				//! ----------- End User UPDATE ----------------------------


				//! Return Api   
				ctx.params.title = "time.service -> Veri Ekleme"
				ctx.params.table = "time.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Eklendi"	
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Time] [Add] Veri Eklendi [ /api/time/add ] ' + '\u001b[0m');	
				

			} catch (error) {

				//! Return Api   
				ctx.params.title = "time.service -> Veri Ekleme"
				ctx.params.table = "time.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Eklenemedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Time] [Add] Veri Eklenemedi [ /api/time/add ] ' + '\u001b[0m');	

			}

			//! Delete
		    delete ctx.params.created_byToken 
		    delete ctx.params.socketId 
		    delete ctx.params.socketToken
		    delete ctx.params.pageTable
		    delete ctx.params.pageToken
		    delete ctx.params.workingMod
              
			return ctx.params
		},
		async update(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.socketToken == ctx.params.socketToken);

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
				fs.writeFile('./public/DB/time.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Time] [Json] [Update] Json Veri Kayıt Edilemedi [ time.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Time] [Json] [Update] Json Veri Kayıt Edildi [ time.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db		

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "time",
					title: "time_update_successful",
					description: "Time Güncelleme Başarılı",
					logStatus: "success",
					fromToken: ctx.params.token,
					created_byToken: ctx.params.updated_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Time] [Logs] [Update] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Time] [Logs] [Update] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
              
                //! Return Api	
				ctx.params.title = "time.service -> Veri Güncelleme"
				ctx.params.table = "time.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Time] [Update] Veri Güncelleme [ /api/time/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "time.service -> Veri Güncelleme"
			   ctx.params.table = "time.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Time] [Update] Veri Güncellenemedi [ /api/time/update ] ' + '\u001b[0m');

			}
			
            //! Delete
            delete ctx.params.socketToken

			//! Return
			delete ctx.params.updated_byToken 
			delete ctx.params.token 
			delete ctx.params.socketId 

			return ctx.params

		},
		async delete(ctx) {
         
			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/time.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Time] [Json] [Delete] Json Veri Kayıt Edilemedi [ ssk.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Time] [Json] [Delete] Json Veri Kayıt Edildi [ ssk.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db					

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "time",
					title: "time_delete_successful",
					description: "Time Silme Başarılı",
					logStatus: "success",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Time] [Logs] [Delete] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Time] [Logs] [Delete] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------


                //! Return Api   
				ctx.params.title = "time.service -> Veri Silme"
				ctx.params.table = "time.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Silindi"	
				
				//Console Yazma	
			    console.log('\u001b[' + 32 + 'm' + '[Time] [Delete] Veri Silindi [ /api/time/delete/:id ] ' + '\u001b[0m');
               

			} else {

				//! Return Api   
				ctx.params.title = "time.service -> Veri Silme"
				ctx.params.table = "time.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Silinemedi"	
				
				//Console Yazma	
				console.log('\u001b[' + 31 + 'm' + '[Time] [Delete] Veri Silinemedi [ /api/time/delete/:id ] ' + '\u001b[0m');

			}
			
			
			//! Return Delete			
			delete ctx.params.id
			delete ctx.params.deleted_byToken

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
				dbFind["deleted_at"] = dayjs().format()
				dbFind["deleted_byToken"] = ctx.params.deleted_byToken
	
				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/time.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[Time] [Json] [Delete_Updated] Json Veri Kayıt Edilemedi [ time.json ] ' + '\u001b[0m');	
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}							

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[Time] [Json] [Delete_Updated] Json Veri Kayıt Edildi [ time.json ] ' + '\u001b[0m');								
					
				});
				// End Json içine Verileri Yazıyor -> db	

	
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {
					table: "time",
					title: "time_delete_successful",
					description: "Time Geçisi Silme Başarılı",
					logStatus: "success",
					fromToken: dbFind["token"],
					created_byToken: ctx.params.deleted_byToken
				})

				if (logs_add.status == "1") { console.log('\u001b[' + 32 + 'm' + '[Time] [Logs] [Delete_Updated] Bildirim Eklendi' + '\u001b[0m'); }
				if (logs_add.status == "0") { console.log('\u001b[' + 31 + 'm' + '[Time] [Logs] [Delete_Updated] Bildirim Eklenemedi' + '\u001b[0m'); }

				//! ----------- Log Son -----------------------------
				
               
              
                //! Return Api	
				ctx.params.title = "time.service -> Veri Geçisi Silme"
				ctx.params.table = "time.json"        
				ctx.params.status = 1			
				ctx.params.message="Veri Güncellendi"

				//Console Yazma	
				console.log('\u001b[' + 32 + 'm' + '[Time] [Delete_Updated] Veri Güncelleme [ /api/time/update ]' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {
				
				
               //! Return Api	
			   ctx.params.title = "time.service -> Veri Geçisi Silme"
			   ctx.params.table = "time.json"        
			   ctx.params.status = 0			
			   ctx.params.message="Veri Güncellenemedi"

			   //Console Yazma	
			   console.log('\u001b[' + 31 + 'm' + '[Time] [Delete_Updated] Veri Güncellenemedi [ /api/time/update ] ' + '\u001b[0m');

			}
			
			//! Return
			delete ctx.params.id
			delete ctx.params.deleted_byToken 

			return ctx.params

		},
        async loginOut(ctx) {

			// ! Arama
			const dbFind = db.find(u => u.socketToken == ctx.params.socketToken);

			//! Veri Varsa
			if (dbFind) {	
                
                let user_find = await ctx.call('user.find', { id: Number(ctx.params.socketId) }) //! User               

                let onlineLastLogin_At = user_find.DB.onlineLastLogin_At //! Login Olduğu Zaman
				let _totalDurationMs = user_find.DB.totalDurationMs //! Toplam Zaman
                let _durationMs = new Date() - new Date(onlineLastLogin_At) //! Zaman Farkı
				_totalDurationMs =Number(_totalDurationMs) + Number(_durationMs);  //! Toplam Zaman Son

                
                //! -----------  User UPDATE ----------------------------- 	
				let user_updateUrl = await ctx.call('user.updateUrl', {
					token:user_find.DB.token,
					updated_byToken: user_find.DB.token,
					onlineStatus: false,                  
					onlineLastLoginout_At: dayjs().format(),
					lastDurationMs:_durationMs,
					totalDurationMs : _totalDurationMs 			        
				})		
				//! ----------- End User UPDATE ---------------------------
			
                //! -----------  Time UPDATE ----------------------------- 	
                let time_update = ctx.call('time.update', {
                    updated_byToken: user_find.DB.token,
                    socketToken: ctx.params.socketToken,                  
                    socketId: Number(ctx.params.socekId),
                    loginOutAt: dayjs().format(),
					durationMs: _durationMs
                })		
                //! ----------- End Time UPDATE ----------------------------		
                

				//! Return Api   
				ctx.params.title = "time.service -> Socket LoginOut"
				ctx.params.table = "time.json"
				ctx.params.status = 1
				ctx.params.message = "Veri Güncellendi"
			

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + '[Time] [LoginOut] Veri Arama [ /api/time/loginOut ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "time.service -> Socket LoginOut"
				ctx.params.table = "time.json"
				ctx.params.status = 0
				ctx.params.message = "Veri Bulanmadı"
			
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + '[Time] [LoginOut] Veri Bulunamadı [ /api/time/loginOut ] ' + '\u001b[0m');	

			}
            
            //! Return
			delete ctx.params.socketId
			delete ctx.params.socketToken

			return ctx.params
		},
		async convert_time(ctx) {

			let fromValue =  Number(ctx.params.fromValue);
			
			let answer = ctx.params.formType=="sn" && ctx.params.toType =="ms" ? 1000*fromValue : 
			             ctx.params.formType=="dk" && ctx.params.toType =="ms" ? 60*1000*fromValue :
			             ctx.params.formType=="saat" && ctx.params.toType =="ms" ? 60*60*1000*fromValue :
			             ctx.params.formType=="gün" && ctx.params.toType =="ms" ? 24*60*60*1000*fromValue : 
			             ctx.params.formType=="hafta" && ctx.params.toType =="ms" ? 7*24*60*60*1000*fromValue : 
			             ctx.params.formType=="ay" && ctx.params.toType =="ms" ? 30*24*60*60*1000*fromValue : 
			             ctx.params.formType=="yıl" && ctx.params.toType =="ms" ? 12*30*24*60*60*1000*fromValue : 0 ;	
		

			let yıl=0, ay=0, gün=0, saat=0, dakika=0, saniye=0, milisaniye=0;
			let answer_last = fromValue;
            
			if(ctx.params.formType=="ms" ) {
				if(answer_last >= 31104000000) { yıl = Math.floor(answer_last / 31104000000); 	answer_last = fromValue % 31104000000;    }
				if(answer_last >= 2592000000) { ay = Math.floor(answer_last / 2592000000); 	answer_last = fromValue % 2592000000;   }
				if(answer_last >= 86400000) { gün = Math.floor(answer_last / 86400000); 	answer_last = fromValue % 86400000;   }

				if(answer_last >= 3600000) { saat = Math.floor(answer_last / 3600000); 	answer_last = fromValue % 3600000;    }
				if(answer_last >= 60000) { dakika = Math.floor(answer_last / 60000); 	answer_last = fromValue % 60000;    }
				if(answer_last >= 1000) { saniye = Math.floor(answer_last / 1000); 	answer_last = fromValue % 1000;   }

				if(answer_last <= 1000) { milisaniye = answer_last; 	answer_last = fromValue % 1000;  }
			}
		     
			let difftimeString =yıl+"yıl/"+ay+"ay/"+gün+"gun " +saat+"sa:"+dakika+"dak:"+saniye+"sn:"+milisaniye+"ms";
	        

			// Answer
			// 1 sn == 1000 ms
			// 1 dk == 60000 ms
			// 1 saat == 3600000 ms
			// 1 gün == 86400000 ms
			// 1 hafta == 604800000 ms
			// 1 ay == 2592000000 ms
			// 1 yıl == 31104000000 ms
            
			//! Return
			ctx.params.year = yıl
			ctx.params.month =ay
			ctx.params.day = gün

			ctx.params.hour = saat
			ctx.params.minute = dakika
			ctx.params.second = saniye

			ctx.params.millisecond = milisaniye

			ctx.params.answer = answer
			ctx.params.difftimeString = difftimeString
			ctx.params.note = "1 ay = 30 gün"

			return ctx.params
		},
		async time_difference(ctx) {

			const dat1 = dayjs(ctx.params.date1);
			const dat2 = dayjs(ctx.params.date2);
			
			const diffTime = Math.abs(dat1 - dat2);

			//! -----------  Time Add ----------------------------- 	
			let time_convert = await ctx.call('time.convert_time', {
				fromValue: diffTime,
				formType: "ms",       
			})		
			//! ----------- End Time Add ----------------------------

			ctx.params.diffTime = diffTime
			ctx.params.difftimeString = time_convert.difftimeString
		    
			return ctx.params
		},
		async before_after_time(ctx) {

			let refDate = ctx.params.refDate
			let ref = ctx.params.ref
			let refCount = ctx.params.refCount
			let beforeAfter = ctx.params.beforeAfter

			const date1 = beforeAfter === "before" ? dayjs(refDate).subtract(refCount, ref).format() : dayjs(refDate).add(refCount, ref).format();

			ctx.params.date1 = date1
			ctx.params.ref = ref
			ctx.params.refCount = refCount
			ctx.params.beforeAfter = beforeAfter
			
			return ctx.params
		}
	}
}
