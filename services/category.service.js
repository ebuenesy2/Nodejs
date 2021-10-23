'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/category.json'); //! Json


module.exports = {
	name: "category",

	actions: {
		async info(ctx) {
			ctx.params.title = "category.service"
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
			
			let data_n11 = await ctx.call('category.find_site', { "site":"n11" });
			let data_trendyol = await ctx.call('category.find_site', { "site":"trendyol" });
			let data_hepsiburada = await ctx.call('category.find_site', { "site":"hepsiburada" });
			let data_gittigidiyor = await ctx.call('category.find_site', { "site":"gittigidiyor" });
			let data_amazon = await ctx.call('category.find_site', { "site":"amazon" });

			ctx.params.title = "Kategori Tüm Veriler"
            ctx.params.tablo = "category.json"
            ctx.params.status = 1
			ctx.params.size=db.length
			ctx.params.DB = db
			ctx.params.data_n11 = data_n11['data']
			ctx.params.data_trendyol = data_trendyol['data']
			ctx.params.data_hepsiburada = data_hepsiburada['data']
			ctx.params.data_gittigidiyor = data_gittigidiyor['data']
			ctx.params.data_amazon = data_amazon['data']
            

			return ctx.params
		},
		async find(ctx) {


			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);

			// Kullanıcı Varsa
			if (user) {

				//api
				ctx.params.title = "Kategori Arama"
				ctx.params.tablo = "category.json"
				ctx.params.status = 1
				ctx.params.data_Category = user
				//ctx.params.data_user_logs = user_logs

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				
				//api
				ctx.params.title = "Kategori Araama"
				ctx.params.tablo = "category.json"
				ctx.params.status = 0
				ctx.params.data_Category = "Ürün Kategori Bulunmadı"			

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]   Kategori  Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
        async find_site(ctx) {

			// ! Arama
			const user = db.filter(u => u.site == ctx.params.site);

			// Kullanıcı Varsa
			if (user) {

				//api
                ctx.params.title = "Kategori Arama"
				ctx.params.tablo = "category.json"
				ctx.params.status = 1
                ctx.params.size=user.length
				ctx.params.data = user


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ file/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Kategori Arama"
				ctx.params.tablo = "category.json"
				ctx.params.status = 0
				ctx.params.data = "Kategori Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ file/:userId ]  Dosya Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async add(ctx) {

			ctx.params.title = "Kategori Ekleme"
			ctx.params.tablo = "category.json"
            ctx.params.status = 1	
           
			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					name: ctx.params.name,							
					site: ctx.params.site			
				}

				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token

	
				//! Eklenecek veriler
				const willSaveData = {
					id:TokenId,				
					token: ctx.params.token,
                    name: ctx.params.name,							
					site: ctx.params.site,
					SiteCategoryToken:jwt,				
					created_at: new Date(),
					updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/category.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi -> category"); // Success
				});

				//! Status
				ctx.params.status = 1				

				//! ----------- Log ----------------------------- 
				const user_email = db.filter(u => u.id == ctx.params.id);
					
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "Category_add_successful",
					description: "Kategori Ekleme Başarılı"
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
            delete ctx.params.userToken 
            delete ctx.params.name  
            delete ctx.params.site  

			return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const user = db.find(u => u.SiteCategoryToken == ctx.params.SiteCategoryToken);

			//? Kullanıcı Varsa
			if (user) {


                //! ----------- Log -----------------------------              
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "Category_update_successful",
                    description: "Kategori Güncelleme Başarılı"
                })

                delete ctx.params.userToken 
				//! ----------- Log ----------------------------- 

              
				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})
				
				user["updated_at"] = new Date()
	


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/category.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi"); // Success
				});


                //! Return 
                ctx.params.title = "Kategori Guncelleme"
				ctx.params.tablo = "category.json"
				ctx.params.status = 1
                ctx.params.data_Category = user,
				ctx.params.data_logs = logs_add

			}

			//! Kullanıcı Yoksa
			else {
				//api		
				ctx.params.title = "Kategori Guncelleme"
				ctx.params.tablo = "category.json"
				ctx.params.status = 0
                ctx.params.data_productCategory =  "Kategori Bulunmadı"
				ctx.params.data_logs = "Kategori Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Kategori Bulunamadı' + '\u001b[0m');

			}
			
            //! Delete
            delete ctx.params.token 
            delete ctx.params.userToken 
            delete ctx.params.name  
            delete ctx.params.site  

			return ctx.params

		},
		async delete(ctx) {
         
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/category.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//api
				ctx.params.title = "Kategori Silme"
				ctx.params.tablo = "category.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Kategori Silindi"		
	            		
				//console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')

                 //! ----------- Log -----------------------------         
                       
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "Category_delete_successful",
                    description: "Kategori Silme Başarılı "
                })

                delete ctx.params.userToken 

                //! ----------- Log Son-------------------------

			} else {

				//api
				ctx.params.title = "Kategori Silme"
				ctx.params.tablo = "category.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Kategori Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Kategori Bulunamadı' + '\u001b[0m');
			}

			//console.log(sampleArray);

			//! ------------------

			//console
			console.log('\u001b[' + 32 + 'm' + 'Json Silme' + '\u001b[0m')

             delete ctx.params.id
             delete ctx.params.token
             delete ctx.params.userToken


			return ctx.params


		}	
	}
}
