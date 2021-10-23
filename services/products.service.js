'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/products.json'); //! Json


module.exports = {
	name: "products",

	actions: {
		async info(ctx) {
			ctx.params.title = "products.service"
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

			ctx.params.title = "Ürün -> Tüm Veriler"
            ctx.params.tablo = "products.json"
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

				//! Find
				let data_productCategory = await ctx.call('productCategory.all');

				//api
				ctx.params.title = "Ürün Arama"
				ctx.params.tablo = "products.json"
				ctx.params.status = 1
				ctx.params.data_product = user
				ctx.params.data_productCategory = data_productCategory

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ users/:userId ]' + '\u001b[0m');
			}

			//! Kullanıcı Yoksa
			else {
				
				//api
				ctx.params.title = "Ürün  Araama"
				ctx.params.tablo = "products.json"
				ctx.params.status = 0
				ctx.params.data_product = "Ürün  Bulunmadı"	
				ctx.params.data_productCategory = "Ürün  Bulunmadı"	
				
				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Ürün   Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async find_userToken(ctx) {

			// ! Arama
			const user = db.filter(u => u.userToken == ctx.params.userToken);

			// Kullanıcı Varsa
			if (user.length>0) {

				//api
                ctx.params.title = "Ürün Arama"
				ctx.params.tablo = "products.json"
				ctx.params.status = 1
                ctx.params.size=user.length
				ctx.params.DB = user

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ products/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				ctx.params.title = "Ürün Arama"
				ctx.params.tablo = "products.json"
				ctx.params.status = 1
				ctx.params.size= 0
				ctx.params.DB = []

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ products/:userId ]  Ürün Bulunamadı' + '\u001b[0m');

			}
             
			//! Delete
			delete ctx.params.userToken 

			return ctx.params
		},
		async Edit_FindUserToken(ctx) {

			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);
			const data_productCategory = await ctx.call('productCategory.find_userToken', { "userToken":ctx.params.userToken });
			
			// Kullanıcı Varsa
			if (data_productCategory) {

				//api
                ctx.params.title = "Ürün Arama"
				ctx.params.tablo = "products.json"
				ctx.params.status = 1
                ctx.params.size=user.length
				ctx.params.data_product = user
				ctx.params.data_productCategory = data_productCategory

				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ products/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				ctx.params.title = "Ürün Arama"
				ctx.params.tablo = "products.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.data_product = []
				ctx.params.data_productCategory = []

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ products/:userId ]  Ürün Bulunamadı' + '\u001b[0m');

			}
             
			//! Delete
			delete ctx.params.userToken 

			return ctx.params
		},
		async add(ctx) {

			ctx.params.title = "Ürün Ekleme"
			ctx.params.tablo = "products.json"
            ctx.params.status = 1	
           
			try {

				//! Token
				let TokenId=new Date().getTime();

				let TokenInfo={				
					id: TokenId,	
					userToken: ctx.params.userToken,
					userName: ctx.params.userName,
					ProductsName: ctx.params.ProductsName,
					price: ctx.params.price,
					discountPrice: ctx.params.discountPrice,
					StockCode: ctx.params.StockCode,
					quantity: ctx.params.quantity,
					ProductsDescription: ctx.params.ProductsDescription,
					ProductsImageUrl: null,
					CategoryName: ctx.params.CategoryName			
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
					CategoryToken: ctx.params.CategoryToken,
					CategoryName: ctx.params.CategoryName,
					ProductsName: ctx.params.ProductsName,
					price: ctx.params.price,
					discountPrice: ctx.params.discountPrice,
					StockCode: ctx.params.StockCode,
					quantity: ctx.params.quantity,
					ProductsDescription: ctx.params.ProductsDescription,
					ProductsImageUrl: null,				
					ProductsToken:jwt,				
					created_at: new Date(),
					updated_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)

                
				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/products.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi -> products"); // Success
				});

				//! Status
				ctx.params.status = 1				

				//! ----------- Log ----------------------------- 
				const user_email = db.filter(u => u.id == ctx.params.id);
					
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "products_add_successful",
					description: "Ürün Ekleme Başarılı"
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
            delete ctx.params.userName 
            delete ctx.params.role 
            delete ctx.params.ProductsName 
            delete ctx.params.price 
            delete ctx.params.discountPrice 
            delete ctx.params.StockCode 
            delete ctx.params.quantity 
            delete ctx.params.ProductsDescription 
            delete ctx.params.ProductsImageUrl 
            delete ctx.params.CategoryName 

			return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const user = db.find(u => u.ProductsToken == ctx.params.ProductsToken);

			//? Kullanıcı Varsa
			if (user) {


                //! ----------- Log -----------------------------              
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "products_update_successful",
                    description: "Ürün Güncelleme Başarılı"
                })

                delete ctx.params.userToken 
				//! ----------- Log ----------------------------- 

              
				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})
				
				user["updated_at"] = new Date()
	


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/products.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json Eklendi"); // Success
				});


                //! Return 
                ctx.params.title = "Ürün Kategorisi Guncelleme"
				ctx.params.tablo = "products.json"
				ctx.params.status = 1
                ctx.params.data_productCategory = user,
				ctx.params.data_logs = logs_add

			}

			//! Kullanıcı Yoksa
			else {
				//api		
				ctx.params.title = "Ürün Kategorisi Guncelleme"
				ctx.params.tablo = "products.json"
				ctx.params.status = 0
                ctx.params.data_productCategory =  "Ürün Kategorisi Bulunmadı"
				ctx.params.data_logs = "Ürün Kategorisi Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Ürün Kategorisi Bulunamadı' + '\u001b[0m');

			}
			
            //! Delete
            delete ctx.params.token 
            delete ctx.params.userToken 
            delete ctx.params.userName 
            delete ctx.params.role 
            delete ctx.params.ProductsName 
            delete ctx.params.price 
            delete ctx.params.discountPrice 
            delete ctx.params.StockCode 
            delete ctx.params.quantity 
            delete ctx.params.ProductsDescription 
            delete ctx.params.ProductsImageUrl 
            delete ctx.params.CategoryName 
            delete ctx.params.ProductsToken 
 

			return ctx.params

		},
		async delete(ctx) {
         
			var index = db.findIndex(a => a.id == ctx.params.id);            
			if (index > -1) {
				db.splice(index, 1);

				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/products.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//api
				ctx.params.title = "Ürün Silme"
				ctx.params.tablo = "products.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Ürün Silindi"		
	            		
				//console
				console.log('\u001b[' + 32 + 'm' + 'Json Güncelleme' + '\u001b[0m')

                 //! ----------- Log -----------------------------         
                       
                let logs_add = await ctx.call('logs.add', {
                    token: ctx.params.token,
                    userToken: ctx.params.userToken,
                    name: "products_delete_successful",
                    description: "Ürün Silme Başarılı"
                })

                delete ctx.params.userToken 

                //! ----------- Log Son-------------------------

			} else {

				//api
				ctx.params.title = "Ürün Silme"
				ctx.params.tablo = "products.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Ürün Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ users/:userId ]  Ürün  Bulunamadı' + '\u001b[0m');
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
