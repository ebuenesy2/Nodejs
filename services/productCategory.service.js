'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/productCategory.json'); //! Json


module.exports = {
	name: "productCategory",

	actions: {
		async info(ctx) {
			ctx.params.title = "productCategory.service"
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

			ctx.params.title = "Ürün Kategori Tüm Veriler"
            ctx.params.tablo = "productCategory.json"
            ctx.params.status = 1
			ctx.params.size=db.length
			ctx.params.DB = db
            

			return ctx.params
		},
		async find(ctx) {


			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);

			// Kullanıcı Varsa
			if (user) {

				//! ----------- Kategoriler ----------------------------- 				
					
				let data_n11 = await ctx.call('category.find_site', { "site":"n11" });
				let data_trendyol = await ctx.call('category.find_site', { "site":"trendyol" });
				let data_hepsiburada = await ctx.call('category.find_site', { "site":"hepsiburada" });
				let data_gittigidiyor = await ctx.call('category.find_site', { "site":"gittigidiyor" });
				let data_amazon = await ctx.call('category.find_site', { "site":"amazon" });

				
				//! ----------- Kategoriler Son ----------------------------- 

				//api
				ctx.params.title = "Ürün Kategori Arama"
				ctx.params.tablo = "productCategory.json"
				ctx.params.status = 1
				ctx.params.data_productCategory = user
				ctx.params.data_n11 = data_n11['data']
				ctx.params.data_trendyol = data_trendyol['data']
				ctx.params.data_hepsiburada = data_hepsiburada['data']
				ctx.params.data_gittigidiyor = data_gittigidiyor['data']
				ctx.params.data_amazon = data_amazon['data']

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				
				//api
				ctx.params.title = "Ürün Kategori Araama"
				ctx.params.tablo = "productCategory.json"
				ctx.params.status = 0
				ctx.params.data_productCategory = "Ürün Kategori Bulunmadı"			
				ctx.params.data_n11 = "Ürün Kategori Bulunmadı"			
				ctx.params.data_trendyol = "Ürün Kategori Bulunmadı"			
				ctx.params.data_hepsiburada = "Ürün Kategori Bulunmadı"			
				ctx.params.data_gittigidiyor = "Ürün Kategori Bulunmadı"			
				ctx.params.data_amazon = "Ürün Kategori Bulunmadı"						

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Ürün Kategorisi  Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async find_userToken(ctx) {

			// ! Arama
			const user = db.filter(u => u.userToken == ctx.params.userToken);

			// Kullanıcı Varsa
			if (user.length>0) {

				//api
                ctx.params.title = "Kategori Arama"
				ctx.params.tablo = "productCategory.json"
				ctx.params.status = 1
                ctx.params.size=user.length
				ctx.params.DB = user


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ file/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				ctx.params.title = "Kategori Arama"
				ctx.params.tablo = "productCategory.json"
				ctx.params.status = 1
				ctx.params.size=0
				ctx.params.DB = []

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ file/:userId ]  Kategori Bulunamadı' + '\u001b[0m');

			}
             
			//! Delete
			delete ctx.params.userToken 

			return ctx.params
		},
		async add(ctx) {

			ctx.params.title = "Ürün Kategori Ekleme"
			ctx.params.tablo = "productCategory.json"
            ctx.params.status = 1	
           
			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					role: ctx.params.role,
					userToken: ctx.params.userToken,
					userName: ctx.params.userName,
					name: ctx.params.name,
					topCategory: ctx.params.topCategory,
					CategoryContext: ctx.params.CategoryContext,
					CategoryN11: ctx.params.CategoryN11,
					CategoryTrendyol: ctx.params.CategoryTrendyol,
					CategoryHepsiBurada: ctx.params.CategoryHepsiBurada,
					CategoryGittigidiyor: ctx.params.CategoryGittigidiyor,
					CategoryAmazon: ctx.params.CategoryAmazon			
				}

				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token

	
				//! Eklenecek veriler
				const willSaveData = {
					id:TokenId,				
					token: ctx.params.token,
					role: ctx.params.role,
					userToken: ctx.params.userToken,
					userName: ctx.params.userName,
					name: ctx.params.name,
					topCategory: ctx.params.topCategory,
					CategoryContext: ctx.params.CategoryContext,
					CategoryN11: ctx.params.CategoryN11,
					CategoryTrendyol: ctx.params.CategoryTrendyol,
					CategoryHepsiBurada: ctx.params.CategoryHepsiBurada,
					CategoryGittigidiyor: ctx.params.CategoryGittigidiyor,
					CategoryAmazon: ctx.params.CategoryAmazon,
					CategoryToken:jwt,				
					created_at: new Date(),
					updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/productCategory.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi -> productCategory"); // Success
				});

				//! Status
				ctx.params.status = 1				

				//! ----------- Log ----------------------------- 
				const user_email = db.filter(u => u.id == ctx.params.id);
					
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "productCategory_add_successful",
					description: "Ürün Kategorisi Ekleme Başarılı"
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
            delete ctx.params.role 
            delete ctx.params.userToken 
            delete ctx.params.userName 
            delete ctx.params.name 
            delete ctx.params.topCategory 
            delete ctx.params.CategoryContext 
            delete ctx.params.CategoryN11 
            delete ctx.params.CategoryTrendyol 
            delete ctx.params.CategoryHepsiBurada 
            delete ctx.params.CategoryGittigidiyor 
            delete ctx.params.CategoryAmazon 

			return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const user = db.find(u => u.CategoryToken == ctx.params.CategoryToken);

			//? Kullanıcı Varsa
			if (user) {


                //! ----------- Log -----------------------------              
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "productCategory_update_successful",
                    description: "Ürün Kategorisi Güncelleme Başarılı"
                })

                delete ctx.params.userToken 
				//! ----------- Log ----------------------------- 

              
				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})
				
				user["updated_at"] = new Date()
	


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/productCategory.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi"); // Success
				});


                //! Return 
                ctx.params.title = "Ürün Kategorisi Guncelleme"
				ctx.params.tablo = "productCategory.json"
				ctx.params.status = 1
                ctx.params.data_productCategory = user,
				ctx.params.data_logs = logs_add

			}

			//! Kullanıcı Yoksa
			else {
				//api		
				ctx.params.title = "Ürün Kategorisi Guncelleme"
				ctx.params.tablo = "productCategory.json"
				ctx.params.status = 0
                ctx.params.data_productCategory =  "Ürün Kategorisi Bulunmadı"
				ctx.params.data_logs = "Ürün Kategorisi Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Ürün Kategorisi Bulunamadı' + '\u001b[0m');

			}
			
		     //! Delete
             delete ctx.params.token 
             delete ctx.params.userToken 
             delete ctx.params.name 
             delete ctx.params.topCategory 
             delete ctx.params.CategoryContext 
             delete ctx.params.CategoryN11 
             delete ctx.params.CategoryTrendyol 
             delete ctx.params.CategoryHepsiBurada 
             delete ctx.params.CategoryGittigidiyor 
             delete ctx.params.CategoryAmazon 

			return ctx.params

		},
		async delete(ctx) {
         
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/productCategory.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//api
				ctx.params.title = "Ürün Kategorisi Silme"
				ctx.params.tablo = "productCategory.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Ürün Kategorisi Silindi"		
	            		
				//console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')

                 //! ----------- Log -----------------------------         
                       
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "productCategory_delete_successful",
                    description: "Ürün Kategorisi Silme Başarılı"
                })

                delete ctx.params.userToken 

                //! ----------- Log Son-------------------------

			} else {

				//api
				ctx.params.title = "Ürün Kategorisi Silme"
				ctx.params.tablo = "productCategory.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Ürün Kategorisi Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Ürün Kategorisi Bulunamadı' + '\u001b[0m');
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
