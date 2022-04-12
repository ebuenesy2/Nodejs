'use strict';
const http = require('http'); //! Html
const dayjs = require('dayjs'); //! Zaman
const dotenv = require('dotenv'); // ! env
const fs = require("fs"); //! Dosya
const path = require("path"); //! Dosya
const mkdir = require("mkdirp").sync; //! Dosya
const mime = require("mime-types"); //! Dosya
const sharp = require('sharp');  //! Dosya Yükleme
const { stat } = require('fs/promises'); //! Dosya
const { Console } = require('console'); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
const db = require('../public/DB/file.json'); //! Json

//! -------  Yeni Klasor -------------------
const uploadDir = path.join(__dirname, "/../public/upload"); //! Upload Klasor
mkdir(uploadDir); //! Upload Klasor

//user
const userUploadDir = path.join(__dirname, "/../public/upload/user"); //! User ->  Upload Klasor
const userUploadDirImage = path.join(__dirname, "/../public/upload/user/img");  //! User ->  Resim
const userUploadDirVideo = path.join(__dirname, "/../public/upload/user/video");  //! User ->  Video
const userUploadDirDoc = path.join(__dirname, "/../public/upload/user/doc");  //! User ->  Belge
mkdir(userUploadDir); //! User ->  Upload Klasor
mkdir(userUploadDirImage);  //! User ->  Resim
mkdir(userUploadDirVideo);  //! User ->  Video
mkdir(userUploadDirDoc);  //! User ->  Belge

//admin
const adminUploadDir = path.join(__dirname, "/../public/upload/admin"); //! Admin ->  Upload Klasor
const adminUploadDirImage = path.join(__dirname, "/../public/upload/admin/img");  //! Admin ->  Resim
const adminUploadDirVideo = path.join(__dirname, "/../public/upload/admin/video");  //! Admin ->  Video
const adminUploadDirDoc = path.join(__dirname, "/../public/upload/admin/doc");  //! Admin ->  Belge
mkdir(adminUploadDir); //! Admin ->  Upload Klasor
mkdir(adminUploadDirImage);  //! Admin ->  Resim
mkdir(adminUploadDirVideo);  //! Admin ->  Video
mkdir(adminUploadDirDoc);  //! Admin ->  Belge

//blog
const blogUploadDir = path.join(__dirname, "/../public/upload/blog"); //! blog ->  Upload Klasor
const blogUploadDirImage = path.join(__dirname, "/../public/upload/blog/img");  //! blog ->  Resim
const blogUploadDirVideo = path.join(__dirname, "/../public/upload/blog/video");  //! blog ->  Video
const blogUploadDirDoc = path.join(__dirname, "/../public/upload/blog/doc");  //! blog ->  Belge
mkdir(blogUploadDir); //! blog ->  Upload Klasor
mkdir(blogUploadDirImage);  //! blog ->  Resim
mkdir(blogUploadDirVideo);  //! blog ->  Video
mkdir(blogUploadDirDoc);  //! blog ->  Belge

//mesaj
const mesajUploadDir = path.join(__dirname, "/../public/upload/mesaj"); //! mesaj ->  Upload Klasor
const mesajUploadDirImage = path.join(__dirname, "/../public/upload/mesaj/img");  //! mesaj ->  Resim
const mesajUploadDirVideo = path.join(__dirname, "/../public/upload/mesaj/video");  //! mesaj ->  Video
const mesajUploadDirDoc = path.join(__dirname, "/../public/upload/mesaj/doc");  //! mesaj ->  Belge
mkdir(mesajUploadDir); //! mesaj ->  Upload Klasor
mkdir(mesajUploadDirImage);  //! mesaj ->  Resim
mkdir(mesajUploadDirVideo);  //! mesaj ->  Video
mkdir(mesajUploadDirDoc);  //! mesaj ->  Belge

//ssk
const sskUploadDir = path.join(__dirname, "/../public/upload/ssk"); //! ssk ->  Upload Klasor
const sskUploadDirImage = path.join(__dirname, "/../public/upload/ssk/img");  //! ssk ->  Resim
const sskUploadDirVideo = path.join(__dirname, "/../public/upload/ssk/video");  //! ssk ->  Video
const sskUploadDirDoc = path.join(__dirname, "/../public/upload/ssk/doc");  //! ssk ->  Belge
mkdir(sskUploadDir); //! ssk ->  Upload Klasor
mkdir(sskUploadDirImage);  //! ssk ->  Resim
mkdir(sskUploadDirVideo);  //! ssk ->  Video
mkdir(sskUploadDirDoc);  //! ssk ->  Belge


//! -------  Yeni Klasor Son -------------------


module.exports = {
	name: "file",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "file.service"
			ctx.params.time = dayjs().toDate()
			ctx.params.APi_URL=process.env.APi_URL
		
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
				ctx.params.title = "file.service -> Tüm Veriler"
				ctx.params.tablo = "file.json"
				ctx.params.status = 1
				ctx.params.size=db.length
				ctx.params.DB = db		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'File Tüm Veriler Okundu [ /api/file/all ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "file.service -> Tüm Veriler"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = error

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'File Tüm Veriler Okunamadı [ /api/file/all ] ' + '\u001b[0m');
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
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'File Veri Arama [ /api/file/find ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				ctx.params.DB = "Dosya Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'File Veri Bulunamadı [ /api/file/find ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_post(ctx) {

			//! Arama
			const dbFind = db.find(u => u.id == ctx.params.id);

			//! Veri Varsa
			if (dbFind) {

				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'File Veri Arama [ /api/file/find_post ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				ctx.params.DB = "Dosya Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'File Veri Bulunamadı [ /api/file/find_post ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.id

			return ctx.params
		},
		async find_token(ctx) {

			//! Arama
			const dbFind = db.find(u => u.token == ctx.params.token);	

			//! Veri Varsa
			if (dbFind) {

				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 1
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'File Veri Arama [ /api/file/find_token ] ' + '\u001b[0m');
			}

			//! Veri Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Veri Arama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				ctx.params.DB = "Veri Bulunamadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'File Veri Bulunamadı [ /api/file/find_token ] ' + '\u001b[0m');		
			}

			//! Return
			delete ctx.params.token

			return ctx.params
		},
		async find_user(ctx) {

			// ! Arama
			const dbFind = db.filter(u => u.created_byToken == ctx.params.created_byToken);

			// ! Veri Varsa
			if (dbFind.length > 0) {

				//! Return Api   
				ctx.params.title = "file.service -> Kullanıcı Arama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 1
                ctx.params.size=dbFind.length
				ctx.params.DB = dbFind

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'File Veri Arama [ /api/file/find ] ' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				
				//! Return Api   
				ctx.params.title = "file.service -> Kullanıcı Arama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				ctx.params.size= 0
				ctx.params.DB = "Dosya Bulunmadı"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'File Veri Bulunamadı [ /api/file/find ] ' + '\u001b[0m');				

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
					role: ctx.params.role,				
					usedPage:ctx.params.usedPage,
					FileId: ctx.params.FileId,
					uploadDir: ctx.params.uploadDir,
					fileName: ctx.params.fileName,
					fileType: ctx.params.fileType,
					fileTypeSplit: ctx.params.fileTypeSplit,
					fileOnlyName: ctx.params.fileOnlyName,
					fileExt: ctx.params.fileExt,
					created_at: CreateDate,
					created_byToken:ctx.params.created_byToken
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token				

				//! Eklenecek veriler
				const willSaveData = {
					id: TokenId,
					role: ctx.params.role,
					usedPage:ctx.params.usedPage,
					FileId: ctx.params.FileId,
					uploadDir: ctx.params.uploadDir,
					fileName: ctx.params.fileName,
					fileType: ctx.params.fileType,
					fileTypeSplit: ctx.params.fileTypeSplit,
					fileOnlyName: ctx.params.fileOnlyName,
					fileExt: ctx.params.fileExt,
					token:jwt,				
					created_at: CreateDate,
					created_byToken:ctx.params.created_byToken,
					isUpdated:false,
					updated_at: null,
					updated_byToken : null,
					isActive: true,
				    isDeleted:false,
					isDeleted_at: null,
					isDeleted_byToken:null
				}

				//Verileri Kaydet
				db.push(willSaveData)

				//Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> File"); // Success
				});				

				// //! ----------- Log ----------------------------- 	
				// let logs_add = await ctx.call('logs.add', {					
				// 	userToken: ctx.params.userToken,
				// 	from: "file",
				// 	fromToken: jwt,
				// 	name: "file_add_successful",
				// 	description: "Dosya Ekleme Başarılı"
				// })			
				// //! ----------- Log Son ----------------------------- 


				//! Return Api   
				ctx.params.title = "file.service -> Veri Ekleme"
				ctx.params.tablo = "file.json"			
				ctx.params.status = 1
				ctx.params.mesaj="Dosya Eklendi"		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'File Veri Eklendi [ /api/file/add ] ' + '\u001b[0m');


			} catch (error) {

				//! Return Api   
				ctx.params.title = "file.service -> Veri Ekleme"
				ctx.params.tablo = "file.json"			
				ctx.params.status = 0
				ctx.params.mesaj="Dosya Eklenemedi"			

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'File Veri Eklenemedi [ /api/file/add ] ' + '\u001b[0m');

			}

			//! Return
			delete ctx.params.token
			delete ctx.params.role
			delete ctx.params.created_byToken
			delete ctx.params.usedPage
			delete ctx.params.FileId
			delete ctx.params.uploadDir

			delete ctx.params.fileName
			delete ctx.params.fileType
			delete ctx.params.fileTypeSplit
			delete ctx.params.fileOnlyName
			delete ctx.params.fileExt


			return ctx.params

		},
		async update(ctx) 	{

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
				fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Edildi -> File"); // Success
				});
				// End Json içine Verileri Yazıyor -> db
			

			// 	//! ----------- Log ----------------------------- 	
			// 	let logs_add = await ctx.call('logs.add', {					
			// 		userToken: ctx.params.userToken,
			// 		from: "file",
			// 		fromToken: ctx.params.fileToken,
			// 		name: "file_update_successful",
			// 		description: "Dosya Güncelleme Başarılı"
			// 	})			
			//    //! ----------- Log Son ----------------------------- 

			    //! Return Api
				ctx.params.title = "file.service -> Veri Güncelleme"
				ctx.params.tablo = "file.json"			
				ctx.params.status = 1
				ctx.params.mesaj="Dosya Güncellendi"

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'File Güncelleme [ /api/file/update ] Güncellendi' + '\u001b[0m');

			}

			//! Veri Yoksa 
			else {

				//! Return Api
				ctx.params.title = "file.service -> Veri Güncelleme"
				ctx.params.tablo = "file.json"			
				ctx.params.status = 0
				ctx.params.mesaj="Dosya Güncellenemedi"

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'File Güncelleme [ /api/file/update ] Güncellenemedi' + '\u001b[0m');

			}

			//! Return
			delete ctx.params.token
			delete ctx.params.updated_byToken			

			return ctx.params

		},				
		async delete(ctx) {
		
			//! Arama
			var index = db.findIndex(a => a.fileToken === ctx.params.fileToken);
			if (index > -1) {
				db.splice(index, 1);

				// Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/logs.json', JSON.stringify(db), err => {

					// Hata varsa
					if (err) {
						console.log(err)
					}

					//Console Yazma
					console.log("Json Veri Kayıt Silindi -> File"); // Success
				});

				
				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "file",
					fromToken: ctx.params.fileToken,
					name: "file_delete_successful",
					description: "Dosya Silme Başarılı"
				})
				//! ----------- Log Son ----------------------------- 

				//! Return Api
				ctx.params.title = "file.service -> Veri Silme"
				ctx.params.tablo = "file.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Dosya Silindi"				

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Dosya Silme [ /api/file/delete ] Silindi' + '\u001b[0m');

			} else {

				//! Return Api
				ctx.params.title = "file.service -> Veri Silme"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Dosya Silinemedi"	

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Dosya Silme [ /api/file/delete ] Silinemedi' + '\u001b[0m');
			}

			//! Return
			delete ctx.params.fileToken
			delete ctx.params.userToken

			return ctx.params

		}, 	
        async getFile(ctx) {

			try {
            
				//! File 
				let file=ctx.params.file[0]

				let fileName=ctx.params.file[0].filename //manzara-sozleri-2021-manzara-ile-ilgili-sozler-14079504_8148_amp.jpg
				let fileType=ctx.params.file[0].mimetype //image/jpeg
				let fileTypeSplit = file.mimetype.split('/')[0]; //image

				
				//! Dosya tanımlama işlemi yapıyor
				let extName = path.extname(fileName); //dosya uzantısı - [ .jpg ]
				let baseName = path.basename(fileName, extName); //dosya adı - [ ]


				//! ------ Dosya Ölçüleri ------------
					let fizeWidth = 0;
					let fizeHeight = 0;
					let fileSize=0;

					if(fileTypeSplit=="image"){
						
					await sharp(file.data)
							.metadata()
							.then(({ width, height, size, format }) => {

								fizeWidth=width;
								fizeHeight=height;
								fileSize=size;
								
							});
					}

				//! ------ Dosya Ölçüleri  Son ------------
	
		
				//! Return Api
				ctx.params.title = "file.service -> Veri Bilgiler"
				ctx.params.tablo = "file.json"
				if(fileName!="") { ctx.params.status = 1 }
				if(fileName=="") { ctx.params.status = 0 }
				
				ctx.params.fileName=fileName
				ctx.params.fileType=fileType
				ctx.params.fileTypeSplit=fileTypeSplit

				ctx.params.fileOnlyName=baseName
				ctx.params.fileExt=extName

				ctx.params.fizeWidth=fizeWidth
				ctx.params.fizeHeight=fizeHeight
				ctx.params.fileSize=fileSize

				//Console Yazma
				if(fileName!="") { console.log('\u001b[' + 32 + 'm' + 'Dosya Bilgileri Alıyor [ /api/file/getFile ] Bulundu' + '\u001b[0m'); }
				if(fileName=="") { console.log('\u001b[' + 31 + 'm' + 'Dosya Bilgileri Alıyor [ /api/file/getFile ] Bulunamadı' + '\u001b[0m'); }


			} catch (error) {

				//! Return Api
				ctx.params.title = "file.service -> Veri Bilgiler"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				
				ctx.params.fileName="Dosya Bulunamadı"
				ctx.params.fileType="Dosya Bulunamadı"
				ctx.params.fileTypeSplit="Dosya Bulunamadı"

				ctx.params.fileOnlyName="Dosya Bulunamadı"
				ctx.params.fileExt="Dosya Bulunamadı"

				ctx.params.fizeWidth="Dosya Bulunamadı"
				ctx.params.fizeHeight="Dosya Bulunamadı"
				ctx.params.fileSize="Dosya Bulunamadı"
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Dosya Bilgileri Alıyor [ /api/file/getFile ] Bulunamadı' + '\u001b[0m');

			}

			//! Return Delete
			delete ctx.params.file		

			return ctx.params
		},
        async upload(ctx) {
		
			try {
				let APi_URL=process.env.APi_URL; //! Api
				let status=0; //! status

				//! Dosya Bilgileri Alıyor
				let file=ctx.params.file[0]
				let fileName=ctx.params.file[0].filename //manzara-sozleri-2021-manzara-ile-ilgili-sozler-14079504_8148_amp.jpg
				let fileType=ctx.params.file[0].mimetype //image/jpeg
				let fileTypeSplit = file.mimetype.split('/')[0]; //image
				let extName = path.extname(fileName); //dosya uzantısı - [ .jpg ]
				let baseName = path.basename(fileName, extName); //dosya adı - [ ]             
				let FileId=new Date().getTime()+extName;  //! Yeni Dosya Id

				//! Kayıt Yeri ve Yeni Dosya Adı		
				let filePath="";
				let fileUrl="";
				let fileData="";
				let usedPage=ctx.params.usedPage;			
				
				if(fileTypeSplit=="image"){ filePath=uploadDir+"\\"+usedPage+"\\img\\"+FileId; fileUrl=APi_URL+"/upload//"+usedPage+"//img//"+FileId; }
				else if(fileTypeSplit=="video"){ filePath=uploadDir+"\\"+usedPage+"\\video\\"+FileId; fileUrl=APi_URL+"/upload//"+usedPage+"//video//"+FileId; }
				else { filePath=uploadDir+"\\"+usedPage+"\\doc\\"+FileId; fileUrl=APi_URL+"/upload//"+usedPage+"//doc//"+FileId; }
		    
				//! Dosya Boyutları
				let fizeWidth = 0;
				let fizeHeight = 0;
				let fileSize=0;
				
				let logs_add=""; //! Logs		      	
			
				//! Dosya Varsa
				if(fileName!="") { 				
				
					//! Yükleme
					if(fileTypeSplit=="image"){				

						await sharp(file.data)
							.metadata()
							.then(({ width, height, size, format }) => {
							
								fizeWidth=width;
								fizeHeight=height;
								fileSize=size;

								sharp(file.data)					
								.toBuffer().then(data => {
									fs.writeFile(filePath, data, (err) => {
										if (err) throw Error("Media yüklenirken hata oluştu.")
										else return true
									});
								})
								
							});
						
					} //! img

					else if(fileTypeSplit=="video"){				

						await new Promise((res, rej) => {
							fs.writeFile(filePath, file.data, (err) => {
								if (err) rej(err)
								else res(true);
							});
						});

						
					} //! video

					else {
					
						await new Promise((res, rej) => {
							fs.writeFile(filePath, file.data, (err) => {

								if (err) rej(err)
								else res(true);
							});
						});
			
					} //! doc

					//! Json				
					try {

						//! Token
						let TokenId=new Date().getTime();
						let CreateDate=new Date();			

						let TokenInfo={				
							id: TokenId,							
							role: ctx.params.role,					
							userToken: ctx.params.userToken,
							usedPage:ctx.params.usedPage,
							FileId: FileId,
							uploadDir:filePath,
							fileUrl:fileUrl,
							fileName: fileName,
							fileType: fileType,
							fileTypeSplit: fileTypeSplit,
							fileOnlyName: baseName,
							fileExt: extName,				
							fizeWidth:fizeWidth,
							fizeHeight:fizeHeight,
							fileSize:fileSize,
							fizeWidth:fizeWidth,
							fizeHeight:fizeHeight,
							fileSize:fileSize,	
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
							role: ctx.params.role,					
							userToken: ctx.params.userToken,
							usedPage:ctx.params.usedPage,
							FileId: FileId,
							uploadDir:filePath,
							fileUrl:fileUrl,
							fileName: fileName,
							fileType: fileType,
							fileTypeSplit: fileTypeSplit,
							fileOnlyName: baseName,
							fileExt: extName,				
							fizeWidth:fizeWidth,
							fizeHeight:fizeHeight,
							fileSize:fileSize,
							fileToken:jwt,							
							created_at: CreateDate,
							updated_at: CreateDate
						}

						//Verileri Kaydet
						db.push(willSaveData)

						//Data Verileri Alıyor
						fileData=willSaveData;


						// Json içine Verileri Yazıyor -> db
						fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

							// Hata varsa
							if (err) { console.log(err) }

							//Console Yazma
							console.log("Json Veri Kayıt Edildi -> File"); // Success
						});

						status = 1; //! Status

						//! ----------- Log ----------------------------- 	
						logs_add = await ctx.call('logs.add', {					
							userToken: ctx.params.userToken,
							from: "file",
							fromToken: jwt,
							name: "file_upload_successful",
							description: "Dosya Yükleme Başarılı"
						})
						//! ----------- Log Son -----------------------------
						
					} catch (error) {  
						
						fileData=""; //! Dosya Bilgileri
						status = 0; //! Status
						logs_add=""; //! Log
						
					}
					//! Json Son

				}

				else {

					fileData=""; //! Dosya Bilgileri
					status = 0; //! Status
					logs_add=""; //! Log
				}			

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Yükleme"
				ctx.params.tablo = "file.json"        
				ctx.params.status = status				
				ctx.params.DB=fileData
				ctx.params.mesaj="Dosya Yüklendi"
				
				//Console Yazma
				if(status==1) { console.log('\u001b[' + 32 + 'm' + 'Dosya Yükleme [ /api/file/upload ] Yüklendi' + '\u001b[0m'); }
				if(status==0) { console.log('\u001b[' + 31 + 'm' + 'Dosya Yükleme [ /api/file/upload ] Yüklenemedi' + '\u001b[0m'); }
				
			} catch (error) {	
					
				//! Return Api
				ctx.params.title = "file.service -> Dosya Yükleme"
				ctx.params.tablo = "file.json" 
				ctx.params.status = 0
				ctx.params.DB="Dosya Yüklenemedi"
				ctx.params.mesaj="Dosya Yüklenemedi"								

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Dosya Yükleme [ /api/file/upload ] Yüklenemeddi' + '\u001b[0m');
				console.log(error);

			}

			//! Return Delete		
			delete ctx.params.token
			delete ctx.params.role
			delete ctx.params.userToken
			delete ctx.params.usedPage
			delete ctx.params.file
			
			return ctx.params
			
		},
		async updateFile(ctx) {
		
			//! -----------  File UPLOAD ----------------------------- 	
			let file_upload = await ctx.call('file.upload', {
				file: ctx.params.file,
				role: ctx.params.role,
				userToken: ctx.params.userToken,                  
				usedPage: ctx.params.usedPage
			})
			//! ----------- End File UPLOAD ----------------------------- 	
            
			if(file_upload.status==1) {

				//! -----------  File Delete ----------------------------- 	
				let file_delete = await ctx.call('file.fileDeleteUrl', {
					userToken: ctx.params.userToken,
					fileUrl: ctx.params.old_fileUrl                 
				})                
    			//! ----------- End File Delete ----------------------------- 

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "file",
					fromToken: file_upload.DB["fileToken"],
					name: "file_update_successful",
					description: "Dosya Güncelleme Başarılı"
				})
				//! ----------- Log Son -----------------------------
				
		    }

			//! ----------- Return ----------------------------- 
			if(file_upload.status==1) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Güncelleme"
				ctx.params.tablo = "file.json"        
				ctx.params.status = 1
				ctx.params.DB=file_upload.DB
				ctx.params.mesaj="Dosya Güncellendi"
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Dosya Güncelleme [ /api/file/updateFile ] Güncellendi' + '\u001b[0m');
            }
			else if(file_upload.status==0) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Güncelleme"
				ctx.params.tablo = "file.json"        
				ctx.params.status = 0	
				ctx.params.DB="Dosya Güncellenmedi"
				ctx.params.mesaj="Dosya Güncellenmedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Dosya Güncelleme [ /api/file/updateFile ] Güncellenmedi' + '\u001b[0m');
            }
			//! ----------- Return Son ------------------------- 
			
		     
			//! Return Delete	
			delete ctx.params.old_fileUrl			
			delete ctx.params.file			
			delete ctx.params.role
			delete ctx.params.userToken
			delete ctx.params.usedPage			
			
			return ctx.params				
		},		
		async fileDeleteUrl(ctx) {

			//! Tanım
			let status=0; 
			let logs_add=""; //! Logs
			let mesaj=""; //! Mesaj
			let fileUrl=ctx.params.fileUrl; //! File Url

			try {

				  let fileCheck=fs.existsSync(fileUrl) //! Dosya Varsa [ true / false]

				 if(fileCheck==true) { 
						
						// Dosya Silme
						fs.unlink(fileUrl, (err) => {
							
							// Hata varsa
							if (err) {
								console.error(err)
								return
							}		
						})		
						
						//! ----------- Log ----------------------------- 	
						let logs_add = await ctx.call('logs.add', {					
							userToken: ctx.params.userToken,
							from: "file",
							fromToken: ctx.params.fileUrl,
							name: "file_delete_successful",
							description: "Dosya Silme Başarılı"
						})
                        //! ----------- Log Son -----------------------------				

						//! Return
						status=1;
						mesaj="Dosya Silindi";	
					
						//Console Yazma
						console.log('\u001b[' + 32 + 'm' + 'Dosya Silme [ /api/file/fileDeleteUrl ] Silindi' + '\u001b[0m');					

				 } 
				 else {
					 status=0;
					 mesaj="Dosya Bulunamadı";
					 logs_add="";

					//Console Yazma
					console.log('\u001b[' + 31 + 'm' + 'Dosya Silme [ /api/file/fileDeleteUrl ] Dosya Bulunamadı' + '\u001b[0m');		
				 }
				 
				} catch (error) {

					status=1;				
					mesaj="Dosya Silinemedi";
					logs_add="";

					//Console Yazma
					console.log('\u001b[' + 31 + 'm' + 'Dosya Silme [ /api/file/fileDeleteUrl ] Silinemedi' + '\u001b[0m');	
					console.log(error);
				}
				
				
				//! Return Api
				ctx.params.title="Dosya Silme"
				ctx.params.tablo="file.json"
				ctx.params.status=status
				ctx.params.mesaj=mesaj			

				//! Return Delete
				delete ctx.params.userToken		
				delete ctx.params.fileUrl		
			
				return ctx.params
		},
		async getFileUrl(ctx) {           
			
			try
			{	
				//! File
				let fileUrl=ctx.params.fileUrl; //! Dosya Adresi - [ C:\\ENES\\Githup\\Nodejs\\public\\upload\\user\\img\\1636206003059.jpg ]
				let dirUrl=path.dirname(fileUrl); //! Klasor Adresi -[ C:\ENES\Githup\Nodejs\public\upload\user\img ]

				let fileName=path.basename(fileUrl); //! Dosya Adı - [ 1636206003059.jpg ]			
				let extName=path.extname(fileUrl); //! Dosya Uzamtısı - [.jpg]
				let baseName = path.basename(fileName, extName); //! Dosya Adı - [ 1636206003059 ]		   

				let fileType=mime.lookup(fileUrl); //! image/jpeg
				let fileTypeSplit = fileType.split('/')[0]; //! image

		
				//! ------ Dosya Ölçüleri ------------
					let fizeWidth = 0;
					let fizeHeight = 0;				

					if(fileTypeSplit=="image"){
						
						await sharp(fileUrl)
						.metadata()
						.then(({ width, height, size, format }) => {

							fizeWidth=width;
							fizeHeight=height;					
							
						});
					}

				//! ------ Dosya Ölçüleri  Son ------------

				//! ------ Dosya Boyut ------------
	
					//! Ölçü
					const stats = fs.statSync(fileUrl);
					let fileSize=stats.size;
		
					//console.log('File Ölçüleri');
					//console.log('FileSize:',fileSize);				
	
				//! ------ Dosya Boyut  Son ------------

				
				//! Return Api
				ctx.params.title = "file.service -> Veri Bilgiler"
				ctx.params.tablo = "file.json"
				if(fileName!="") { ctx.params.status = 1 }
				if(fileName=="") { ctx.params.status = 0 }			
				
				ctx.params.fileName=fileName
				ctx.params.fileType=fileType
				ctx.params.fileTypeSplit=fileTypeSplit

				ctx.params.fileOnlyName=baseName
				ctx.params.fileExt=extName	
								
				ctx.params.fizeWidth=fizeWidth
				ctx.params.fizeHeight=fizeHeight
				ctx.params.fileSize=fileSize

				//Console Yazma
				if(fileName!="") { console.log('\u001b[' + 32 + 'm' + 'Dosya Bilgileri Alıyor [ /api/file/getFile ] Bulundu' + '\u001b[0m'); }
				if(fileName=="") { console.log('\u001b[' + 31 + 'm' + 'Dosya Bilgileri Alıyor [ /api/file/getFile ] Bulunamadı' + '\u001b[0m'); }
			
			} catch (error) {

				//! Return Api
				ctx.params.title = "file.service -> Veri Bilgiler"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				
				ctx.params.fileName="Dosya Bulunamadı"
				ctx.params.fileType="Dosya Bulunamadı"
				ctx.params.fileTypeSplit="Dosya Bulunamadı"

				ctx.params.fileOnlyName="Dosya Bulunamadı"
				ctx.params.fileExt="Dosya Bulunamadı"

				ctx.params.fizeWidth="Dosya Bulunamadı"
				ctx.params.fizeHeight="Dosya Bulunamadı"
				ctx.params.fileSize="Dosya Bulunamadı"
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Dosya Bilgileri Alıyor [ /api/file/getFile ] Bulunamadı' + '\u001b[0m');
				console.log(error);
			}
			
			//! Return
			delete ctx.params.fileUrl;

			return ctx.params

		},
		async uploadUrl(ctx) {	
				
			let APi_URL=process.env.APi_URL; //! Api
			let status=0; //! status	
			let fileData=""; //! File
			let logs_add=""; //! Log

			try
			{	
				//! File
				let fileUrl=ctx.params.fileUrl; //! Dosya Adresi - [ C:\\ENES\\Githup\\Nodejs\\public\\upload\\user\\img\\1636206003059.jpg ]
				let dirUrl=path.dirname(fileUrl); //! Klasor Adresi -[ C:\ENES\Githup\Nodejs\public\upload\user\img ]
				let fileName=path.basename(fileUrl); //! Dosya Adı - [ 1636206003059.jpg ]			
				let extName=path.extname(fileUrl); //! Dosya Uzamtısı - [.jpg]
				let baseName = path.basename(fileName, extName); //! Dosya Adı - [ 1636206003059 ]  
				
				let fileType=mime.lookup(fileUrl); //! image/jpeg
				let fileTypeSplit = fileType.split('/')[0]; //! image
				let FileId=new Date().getTime()+extName;  //! Yeni Dosya Id				

				//! Kayıt Yeri ve Yeni Dosya Adı		
				let filePath="";
				let fileUrl_Api="";				
				let usedPage=ctx.params.usedPage;			
				
				if(fileTypeSplit=="image"){ filePath=uploadDir+"\\"+usedPage+"\\img\\"+FileId; fileUrl_Api=APi_URL+"/upload//"+usedPage+"//img//"+FileId; }
				else if(fileTypeSplit=="video"){ filePath=uploadDir+"\\"+usedPage+"\\video\\"+FileId; fileUrl_Api=APi_URL+"/upload//"+usedPage+"//video//"+FileId; }
				else { filePath=uploadDir+"\\"+usedPage+"\\doc\\"+FileId; fileUrl_Api=APi_URL+"/upload//"+usedPage+"//doc//"+FileId; }					
						

				//! Dosya Varsa
				if(fileUrl!="") { 	
					
					//! ------ Dosya Ölçüleri ------------
						let fizeWidth = 0;
						let fizeHeight = 0;								
	
						if(fileTypeSplit=="image"){
							
							await sharp(fileUrl)
							.metadata()
							.then(({ width, height, size, format }) => {
	
								fizeWidth=width;
								fizeHeight=height;

								sharp(fileUrl)					
								.toBuffer().then(data => {
									fs.writeFile(filePath, data, (err) => {
										if (err) throw Error("Media yüklenirken hata oluştu.")
										else return true
									});
								})
								
							});
						}
                        
						//Console Yazma
						//console.log('\u001b[' + 32 + 'm' + 'fizeWidth:'+fizeWidth + '\u001b[0m');
						//console.log('\u001b[' + 32 + 'm' + 'fizeHeight:'+fizeHeight + '\u001b[0m');
	
					//! ------ Dosya Ölçüleri  Son ------------
	
					//! ------ Dosya Boyut ------------
		
						//! Ölçü
						const stats = fs.statSync(fileUrl);
						let fileSize=stats.size;
			
						//Console Yazma
						//console.log('\u001b[' + 32 + 'm' + 'fileSize:'+fileSize + '\u001b[0m');			
		
					//! ------ Dosya Boyut  Son ------------		
					
				
					//! Json				
					try {

                      //! Token
						let TokenId=new Date().getTime();
						let CreateDate=new Date();			

						let TokenInfo={				
							id: TokenId,							
							role: ctx.params.role,					
							userToken: ctx.params.userToken,
							usedPage:ctx.params.usedPage,
							FileId: FileId,
							uploadDir:filePath,
							fileUrl:fileUrl_Api,
							fileName: fileName,
							fileType: fileType,
							fileTypeSplit: fileTypeSplit,
							fileOnlyName: baseName,
							fileExt: extName,				
							fizeWidth:fizeWidth,
							fizeHeight:fizeHeight,
							fileSize:fileSize,
							fizeWidth:fizeWidth,
							fizeHeight:fizeHeight,
							fileSize:fileSize,	
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
							role: ctx.params.role,					
							userToken: ctx.params.userToken,
							usedPage:ctx.params.usedPage,
							FileId: FileId,
							uploadDir:filePath,
							fileUrl:fileUrl_Api,
							fileName: fileName,
							fileType: fileType,
							fileTypeSplit: fileTypeSplit,
							fileOnlyName: baseName,
							fileExt: extName,				
							fizeWidth:fizeWidth,
							fizeHeight:fizeHeight,
							fileSize:fileSize,
							fileToken:jwt,							
							created_at: CreateDate,
							updated_at: CreateDate
						}

						//Verileri Kaydet
						db.push(willSaveData)

						//Data Verileri Alıyor
						fileData=willSaveData;


						// Json içine Verileri Yazıyor -> db
						fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

							// Hata varsa
							if (err) {
								console.log(err)
							}

							//Console Yazma
							console.log("Json Veri Kayıt Edildi -> File"); // Success
						});

						status = 1; //! Status

												
						//! ----------- Log ----------------------------- 	
						let logs_add = await ctx.call('logs.add', {					
							userToken: ctx.params.userToken,
							from: "file",
							fromToken: jwt,
							name: "file_upload_successful",
							description: "Dosya Yükleme Başarılı"
						})
                        //! ----------- Log Son -----------------------------	
													
					} catch (error) {

						status = 0; //! Status
						fileData=""; //! Dosya Bilgileri
						logs_add=""; //! Log	
					}
					//! Json Son
										
				} else {

					status = 0; //! Status
					fileData=""; //! Dosya Bilgileri
					logs_add=""; //! Log				
				}			
						
			
			} catch (error) {

				status=0; //! Status
				fileData=""; //! Dosya Bilgileri
				logs_add=""; //! Log	
				console.log(error); //! Error

			}

			//Console Yazma
			if(status==1) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Yükleme"
				ctx.params.tablo = "file.json"        
				ctx.params.status = status				
				ctx.params.DB=fileData
				ctx.params.mesaj="Dosya Yüklendi"	

				//Console Yazma
				if(status==1) { console.log('\u001b[' + 32 + 'm' + 'Dosya Yükleme [ /api/file/uploadUrl ] Yüklendi' + '\u001b[0m'); }
				if(status==0) { console.log('\u001b[' + 31 + 'm' + 'Dosya Yükleme [ /api/file/uploadUrl ] Yüklenemeddi' + '\u001b[0m'); }
			}
			if(status==0) { 

				//! Return Api
				ctx.params.title = "file.service -> Dosya Yükleme"
				ctx.params.tablo = "file.json" 
				ctx.params.status = 0
				ctx.params.DB="Dosya Yüklenemedi"
				ctx.params.mesaj="Dosya Yüklenemedi"								

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Dosya Yükleme [ /api/file/uploadUrl ] Yüklenemeddi' + '\u001b[0m');			
			 }

			
			//! Return
			delete ctx.params.fileUrl;
			delete ctx.params.role;
			delete ctx.params.userToken;
			delete ctx.params.usedPage;
			
		    return ctx.params

		},
		async updateFileUrl(ctx) {
		
			//! -----------  File UPLOAD ----------------------------- 	
			let file_upload = await ctx.call('file.uploadUrl', {
				fileUrl: ctx.params.fileUrl,
				role: ctx.params.role,
				userToken: ctx.params.userToken,                  
				usedPage: ctx.params.usedPage
			})		
			//! ----------- End File UPLOAD ----------------------------- 	
            
			if(file_upload.status==1) {

				//! -----------  File Delete ----------------------------- 	
				let file_delete = await ctx.call('file.fileDeleteUrl', {
					userToken: ctx.params.userToken,
					fileUrl: ctx.params.old_fileUrl                 
				})                
				//! ----------- End File Delete ----------------------------- 

				//! ----------- Log ----------------------------- 	
				let logs_add = await ctx.call('logs.add', {					
					userToken: ctx.params.userToken,
					from: "file",
					fromToken: file_upload.DB["fileToken"],
					name: "file_update_successful",
					description: "Dosya Güncelleme Başarılı"
				})
				//! ----------- Log Son -----------------------------	
			
		    }

			//! ----------- Return ----------------------------- 
			if(file_upload.status==1) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Güncelleme"
				ctx.params.tablo = "file.json"        
				ctx.params.status = 1
				ctx.params.DB=file_upload.DB	
				ctx.params.mesaj="Dosya Güncellendi"	
				
				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'Dosya Güncelleme [ /api/file/updateFile ] Güncellendi' + '\u001b[0m');
            }
			else if(file_upload.status==0) {

				//! Return Api	
				ctx.params.title = "file.service -> Dosya Güncelleme"
				ctx.params.tablo = "file.json"        
				ctx.params.status = 0
				ctx.params.DB="Dosya Güncellenmedi"		
				ctx.params.mesaj="Dosya Güncellenmedi"	
				
				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'Dosya Güncelleme [ /api/file/updateFile ] Güncellenmedi' + '\u001b[0m');
            }
			//! ----------- Return Son ------------------------- 
			
		     
			//! Return Delete	
			delete ctx.params.old_fileUrl			
			delete ctx.params.fileUrl		
			delete ctx.params.file			
			delete ctx.params.role
			delete ctx.params.userToken
			delete ctx.params.usedPage			
			
			return ctx.params				
		}	
	}
}
