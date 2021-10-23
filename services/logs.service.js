'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
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


			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);

			// Kullanıcı Varsa
			if (user) {

				//api
				ctx.params.title = "Logs Araama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.data_user = user


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ logs/:userId ]' + '\u001b[0m');

			}

			//! Log Yoksa
			else {
				//api
				//api
				ctx.params.title = "logs Araama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.data_user = "Log Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ logs/:userId ]  Log Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async add(ctx) {

			ctx.params.title = "logs Ekleme"
			ctx.params.tablo = "logs.json"

			try {



				//! Eklenecek veriler
				const willSaveData = {
					id: new Date().getTime(),
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: ctx.params.name,
					description: ctx.params.description,
					created_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});

				//! Status
				ctx.params.status = 1



				//! ------------------

				//console
				console.log('\u001b[' + 32 + 'm' + 'logs Ekleme' + '\u001b[0m')


			} catch (error) {

				//! Status
				ctx.params.status = 1

			}




			return ctx.params

		},
		async update(ctx) {

			// ! Arama
			const user = db.find(u => u.id == ctx.params.id);

			// Kullanıcı Varsa
			if (user) {


				//pass by reference
				Object.keys(ctx.params).forEach(key => {
					user[key] = ctx.params[key]
				})


				//api
				ctx.params.title = "Logs Guncelleme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1



				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//! ------------------

				//console
				console.log('\u001b[' + 32 + 'm' + 'logs Güncelleme' + '\u001b[0m')




			}

			//! Log Yoksa
			else {
				//api
				//api
				ctx.params.title = "Logs Guncelleme"
				ctx.params.tablo = "log.json"
				ctx.params.status = 0
				ctx.params.data = "logs Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Log Bulunamadı' + '\u001b[0m');

			}

			return ctx.params

		},
		async delete(ctx) {



			var index = db.findIndex(a => a.id === ctx.params.id);
			if (index > -1) {
				db.splice(index, 1);


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//api
				ctx.params.title = "logs Silme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.mesaj = "logs Silindi"



			} else {

				//api
				ctx.params.title = "logs Silme"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.mesaj = "logs Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ logs/:userId ]  logs Bulunamadı' + '\u001b[0m');
			}

			//console.log(sampleArray);




			//! ------------------

			//console
			console.log('\u001b[' + 32 + 'm' + 'Json Silme' + '\u001b[0m')





			return ctx.params


		},
		async find_user(ctx) {

			// ! Arama
			const user = db.filter(u => u.userToken == ctx.params.userToken);

			// Kullanıcı Varsa
			if (user) {

				//api
				ctx.params.title = "Logs Araama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 1
				ctx.params.size=user.length
				ctx.params.data = user				


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ logs/:userId ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "logs Araama"
				ctx.params.tablo = "logs.json"
				ctx.params.status = 0
				ctx.params.data = "Kullanıcı Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ logs/:userId ]  Kullanıcı Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		}

	}
}
