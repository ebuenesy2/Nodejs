'use strict';
const http = require('http'); //! Html
const dayjs = require('dayjs'); //! Zaman
const dotenv = require('dotenv'); // ! env
const fs = require("fs"); //! Dosya
const path = require("path"); //! Dosya
const mkdir = require("mkdirp").sync; //! Dosya
const mime = require("mime-types"); //! Dosya
const sharp = require('sharp');  //! Dosya Yükleme
const db = require('../public/DB/file.json'); //! Json
const { stat } = require('fs/promises');
const { Console } = require('console');

//! Yeni Klasor
const uploadDir = path.join(__dirname, "/../public/upload");
const uploadDirImage = path.join(__dirname, "/../public/upload/img");
const uploadDirVideo = path.join(__dirname, "/../public/upload/video");
const uploadDirDoc = path.join(__dirname, "/../public/upload/doc");

mkdir(uploadDir); //! Klasor Oluştur
mkdir(uploadDirImage);  //! Klasor Oluştur
mkdir(uploadDirVideo);  //! Klasor Oluştur
mkdir(uploadDirDoc);  //! Klasor Oluştur


module.exports = {
	name: "file",

	actions: {
		async info(ctx) {
			ctx.params.title = "file.service"
			ctx.params.time = dayjs().toDate()
			ctx.params.APi_URL=process.env.APi_URL
		
            return ctx.params
		},
		async post(ctx) {

			ctx.params.createdAt = dayjs().toDate();
			delete ctx.params.createdAt;

			return ctx.params
		},
		async all(ctx) {

			//JSON        

			ctx.params.title = "Files -> Tüm Veriler"
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
				ctx.params.title = "Dosya Araama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 1
				ctx.params.data_file = user


				//console
				console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ file/:id ]' + '\u001b[0m');

			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Dosya Araama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				ctx.params.data_file = "Dosya Bulunamadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ file/:id ]  Dosya Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
		async add(ctx) {

			ctx.params.title = "Dosya Json Ekleme"
			ctx.params.tablo = "file.json"

			try {


				//! Eklenecek veriler
				const willSaveData = {
					id: new Date().getTime(),
					token: ctx.params.token,
					role: ctx.params.role,					
					userToken: ctx.params.userToken,
					usedPage:ctx.params.usedPage,
					FileId: ctx.params.FileId,
					uploadDir: ctx.params.uploadDir,
					fileName: ctx.params.fileName,
					fileType: ctx.params.fileType,
					fileTypeSplit: ctx.params.fileTypeSplit,
					fileOnlyName: ctx.params.fileOnlyName,
					fileExt: ctx.params.fileExt,				
					created_at: new Date()
				}

				//Verileri Kaydet
				db.push(willSaveData)


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});

				//! Status
				ctx.params.status = 1

                //! Log Add
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "file_add_successful",
					description: "Dosya Ekleme Başarılı"
				})
                
				ctx.params.data_logs = logs_add

				//console
				console.log('\u001b[' + 32 + 'm' + 'Log Eklendi' + '\u001b[0m')





				//! ------------------

				//console
				console.log('\u001b[' + 32 + 'm' + 'File Ekleme' + '\u001b[0m')


			} catch (error) {

				//! Status
				ctx.params.status = 0

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
				ctx.params.title = "Dosya Guncelleme"
				ctx.params.tablo = "file.json"
				ctx.params.status = 1



				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

					// Checking for errors
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//! Log Add
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "file_update_successful",
					description: "Dosya Güncelleme Başarılı"
				})
                
				ctx.params.data_logs = logs_add

				//console
				console.log('\u001b[' + 32 + 'm' + 'Log Eklendi' + '\u001b[0m')

				//! ------------------

				//console
				console.log('\u001b[' + 32 + 'm' + 'file Güncelleme' + '\u001b[0m')




			}

			//! Kullanıcı Yoksa
			else {
				//api
				//api
				ctx.params.title = "Kullanıcı Guncelleme"
				ctx.params.tablo = "user.json"
				ctx.params.status = 0
				ctx.params.data = "Kullanıcı Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Post [ update ]  Kullanıcı Bulunamadı' + '\u001b[0m');

			}

			return ctx.params

		},
		async delete(ctx) {

		
			const data = db.find(u => u.id == ctx.params.id); 	// ! find
			var index = db.findIndex(a => a.id === ctx.params.id); 	// ! findIndex
			if (index > -1) {
				db.splice(index, 1);


				// STEP 3: Json içine Verileri Yazıyor -> db
				fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

					// Checking for errocş
					if (err) {
						console.log(err)
					}

					console.log("Json writing"); // Success
				});


				//! File Delete
				let fileUrl=data.uploadDir

				let fileCheck=fs.existsSync(fileUrl) //! file check [ true / false]
	
				if(fileCheck==true) { 
					
					fs.unlink(fileUrl, (err) => {
						if (err) {
						console.error(err)
						return
						}		
					})
							
				}


				//api
				ctx.params.title = "Dosya Silme"
				ctx.params.tablo = "file.json"
				ctx.params.status = 1
				ctx.params.mesaj = "Dosya Silindi"
				ctx.params.data=data


				
				//! Log Add
				let logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "file_delete_successful",
					description: "Dosya Silme Başarılı"
				})
                
				ctx.params.data_logs = logs_add



			} else {

				//api
				ctx.params.title = "Dosya Silme"
				ctx.params.tablo = "Dosya.json"
				ctx.params.status = 0
				ctx.params.mesaj = "Dosya Bulunmadı"
				ctx.params.data = "Dosya Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ file/:id ]  Dosya Bulunamadı' + '\u001b[0m');
			}


			//! ------------------

			//console
			console.log('\u001b[' + 32 + 'm' + 'Json Silme' + '\u001b[0m')

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
		async find_user(ctx) {

			// ! Arama
			const user = db.filter(u => u.userToken == ctx.params.userToken);

			// Kullanıcı Varsa
			if (user) {

				//api
				ctx.params.title = "Dosya Araama"
				ctx.params.tablo = "file.json"
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
				ctx.params.title = "Dosya Araama"
				ctx.params.tablo = "file.json"
				ctx.params.status = 0
				ctx.params.data = "Dosya Bulunmadı"

				//console
				console.log('\u001b[' + 31 + 'm' + 'Anasayfa Get [ file/:userId ]  Dosya Bulunamadı' + '\u001b[0m');

			}


			return ctx.params
		},
        async getFile(ctx) {
            
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
 
	
			//send
			ctx.params.title="Dosya"
			
			ctx.params.fileName=fileName
			ctx.params.fileType=fileType
			ctx.params.fileTypeSplit=fileTypeSplit

			ctx.params.fileOnlyName=baseName
			ctx.params.fileExt=extName

			ctx.params.fizeWidth=fizeWidth
			ctx.params.fizeHeight=fizeHeight
			ctx.params.fileSize=fileSize
			


			delete ctx.params.file

			

			return ctx.params
		},
        async upload(ctx) {
		

			let APi_URL=process.env.APi_URL; //! Host
			let status=0; //! status

			//! File  Info
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
            
			if(fileTypeSplit=="image"){ filePath=uploadDir+"\\img\\"+FileId; fileUrl=APi_URL+"//upload//img//"+FileId; }
			else if(fileTypeSplit=="video"){ filePath=uploadDir+"\\video\\"+FileId; fileUrl=APi_URL+"//upload//video//"+FileId; }
			else { filePath=uploadDir+"\\doc\\"+FileId; fileUrl=APi_URL+"//upload//doc//"+FileId; }

		
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


					//! Eklenecek veriler
					const willSaveData = {
						id: new Date().getTime(),
						token: ctx.params.token,
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
						created_at: new Date()
					}

					//Verileri Kaydet
					db.push(willSaveData)


					// STEP 3: Json içine Verileri Yazıyor -> db
					fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

						// Checking for errors
						if (err) {
							console.log(err)
						}

						console.log("Json writing"); // Success
					});

					status = 1; //! Status

					
					//! Log Add
					logs_add = await ctx.call('logs.add', {
						token: ctx.params.token,
						userToken: ctx.params.userToken,
						name: "file_upload_successful",
						description: "Dosya Yükleme Başarılı"
					})

					//! ------------------

					//console
					console.log('\u001b[' + 32 + 'm' + 'logs Ekleme' + '\u001b[0m')


				} catch (error) {  
					
					status = 0; //! Status
				}
				//! Json Son

			}

			else {

				 status = 0; //! Status
			}



			    //! Delete
				delete ctx.params.token
				delete ctx.params.role
				delete ctx.params.userToken
				delete ctx.params.usedPage

				delete ctx.params.file

				//! Return
				ctx.params.title="Dosya Yükleme"
				ctx.params.tablo = "file.json"           
                ctx.params.status = status
        
				ctx.params.FileId=FileId
				ctx.params.uploadDir=filePath
				ctx.params.fileUrl=fileUrl

				ctx.params.fileName=fileName
				ctx.params.fileType=fileType
				ctx.params.fileTypeSplit=fileTypeSplit
				ctx.params.fileOnlyName=baseName
				ctx.params.fileExt=extName

				ctx.params.fizeWidth=fizeWidth
				ctx.params.fizeHeight=fizeHeight
				ctx.params.fileSize=fileSize
				ctx.params.data_logs = logs_add					

				return ctx.params
			
		},
		async fileDelete(ctx) {

			let status=0
			let fileUrl=ctx.params.fileUrl	
			let logs_add=""; //! Logs

			let fileCheck=fs.existsSync(fileUrl) //! file check [ true / false]

			if(fileCheck==true) { 
				
				fs.unlink(fileUrl, (err) => {
					if (err) {
					console.error(err)
					return
					}		
				})

				status=1
				
					
				//! Log Add
			  logs_add = await ctx.call('logs.add', {
					token: ctx.params.token,
					userToken: ctx.params.userToken,
					name: "file_delete_successful",
					description: "Dosya Silme Başarılı"
				})                
				

			}

			
			
			ctx.params.title="Dosya Silme"
            ctx.params.status=status
			ctx.params.fileCheck=fileCheck
			ctx.params.data_logs = logs_add
			
			return ctx.params
		},
		async getFileCurl(ctx) {


		try
		  {			
            
			//! Gelen
			console.log("getFile"); //! Tıklanıldığı
			console.log(ctx.params); //! Gelen Tüm Veriler
			console.log(ctx.params.file); //! Gelen Tüm Veriler
			
			//! File
		    let fileUrlG=ctx.params.file; //! Dosya Adresi
		    let fileNameG=path.basename(fileUrlG); //! Dosya Adı
		    let dirUrlG=path.dirname(fileUrlG); //! Klasor Adresi
		    let FileExtNameG=path.extname(fileUrlG); //! Dosya Uzamtısı - [.jpg]

			//! Return
			console.log('File Bilgileri');
			console.log('FileUrl:',fileUrlG);
			console.log('FileName:',fileNameG);
			console.log('DirUrl:',dirUrlG);
			console.log('FileExtName:',FileExtNameG);

			//! ******************

			//! ------ Dosya Ölçüleri ------------

			//! Ölçü
			const stats = fs.statSync(fileUrlG);
			let FileSize=stats.size;

			console.log('File Ölçüleri');
			console.log('FileSize:',FileSize);				

			//! ------ Dosya Ölçüleri  Son ------------
 
	
			//! Return
			ctx.params.title="Dosya Bilgileri"
			ctx.params.status=1;

			ctx.params.fileUrl=fileUrlG;
			ctx.params.fileName=fileNameG;
			ctx.params.dirUrl=dirUrlG;
			ctx.params.FileExtName=FileExtNameG;

			ctx.params.FileSize=FileSize;
		}
		catch
		{

				//! Return
				ctx.params.title="Dosya Bilgileri"
				ctx.params.status=0;

				ctx.params.fileUrl="";
				ctx.params.fileName="";
				ctx.params.dirUrl="";
				ctx.params.FileExtName="";
	
				ctx.params.FileSize=0;
			
		}


			
			delete ctx.params.file;

			return ctx.params
		},
		async uploadCurl(ctx) {


			let APi_URL=process.env.APi_URL; //! Host

			try
			  {			
				
				/*
				//! Gelen
				console.log("getFile"); //! Tıklanıldığı
				console.log(ctx.params); //! Gelen Tüm Veriler
				console.log(ctx.params.file); //! Gelen Tüm Veriler
				*/
				
				//! File
				let fileUrlG=ctx.params.file; //! Dosya Adresi
				let dirUrlG=path.dirname(fileUrlG); //! Klasor Adresi
				let fileNameG=path.basename(fileUrlG); //! Dosya Adı				
				let FileExtNameG=path.extname(fileUrlG); //! Dosya Uzamtısı - [.jpg]
				let FileOnlyNameG = path.basename(fileNameG, FileExtNameG); //! Dosya Adı Sadece
				let FileId=new Date().getTime()+FileExtNameG;  //! Yeni Dosya Id
				let FileUploadStatus=0;
				
	            
				/*
				//! Return
				console.log('File Bilgileri');
				console.log('FileUrl:',fileUrlG);
				console.log('FileName:',fileNameG);
				console.log('DirUrl:',dirUrlG);
				console.log('FileExtName:',FileExtNameG);
				*/			
	
				//! ******************
	
				//! ------ Dosya Ölçüleri ------------
	
				//! Ölçü
				const stats = fs.statSync(fileUrlG);
				let FileSize=stats.size;
	
				//console.log('File Ölçüleri');
				//console.log('FileSize:',FileSize);				
	
				//! ------ Dosya Ölçüleri  Son ------------
	 
				//! ------ Upload  ------------

				//! Dosya Yeri	
				let tarih_zaman_upload_ob="tarih_zaman_upload_ob";

				 //istenilen uzantılar
				let docList = ['.txt', '.pdf', '.doc', '.docx', '.css', '.sql'];
				let imgList = ['.png', '.jpg', '.jpeg', '.gif', '.PNG', '.JPG','.JPEG'];
				let videoList = ['.mp3', '.mp4'];

	
				//! Kayıt Yeri ve Yeni Dosya Adı		
				let filePath="";
				let fileUrl="";
				let fileTypeSplit = "type";
				
				if (imgList.includes(FileExtNameG)){ filePath=uploadDir+"\\img\\"+FileId; fileUrl=APi_URL+"//upload//img//"+FileId; fileTypeSplit="image"; }
				else if (videoList.includes(FileExtNameG)){ filePath=uploadDir+"\\video\\"+FileId; fileUrl=APi_URL+"//upload//video//"+FileId; fileTypeSplit="video"; }
				else if (docList.includes(FileExtNameG)) { filePath=uploadDir+"\\doc\\"+FileId; fileUrl=APi_URL+"//upload//doc//"+FileId; type="doc"; }

  
				fs.readFile( fileUrlG, function (err, data) {
					fs.writeFile(filePath, data, function (err) {
						if( err ){
						   console.log( err );
						   }else{
							    console.log("Yüklendi");							
						   }				
					
					 });
				});
                 
				//! Json
				if(fileUrl!="") { 
					
					try {


						//! Eklenecek veriler
						const willSaveData = {
							id: new Date().getTime(),
							token: ctx.params.token,
							role: ctx.params.role,					
							userToken: ctx.params.userToken,
							usedPage:ctx.params.usedPage,
							FileId: FileId,
							uploadDir:filePath,
							fileUrl:fileUrl,
							fileName: fileNameG,
							fileType: fileTypeSplit,
							fileTypeSplit: fileTypeSplit,
							fileOnlyName: FileOnlyNameG,
							fileExt: FileExtNameG,				
							created_at: new Date()
						}

						//Verileri Kaydet
						db.push(willSaveData)


						// STEP 3: Json içine Verileri Yazıyor -> db
						fs.writeFile('./public/DB/file.json', JSON.stringify(db), err => {

							// Checking for errors
							if (err) {
								console.log(err)
							}

							console.log("Json writing"); // Success
						});

						FileUploadStatus = 1; //! Status

						
						//! Log Add
						logs_add = await ctx.call('logs.add', {
							token: ctx.params.token,
							userToken: ctx.params.userToken,
							name: "file_upload_successful",
							description: "Dosya Yükleme Başarılı"
						})

						//! ------------------

						//console
						console.log('\u001b[' + 32 + 'm' + 'logs Ekleme' + '\u001b[0m')


					} catch (error) {  
						
						FileUploadStatus = 0; //! Status
					}			
				}
				//! Json Son
               

				//! ------ Upload  Son ------------


				//! Return
				ctx.params.title="Dosya Yükleme"
				ctx.params.status=FileUploadStatus;
	
				ctx.params.fileUrl=fileUrlG;
				ctx.params.dirUrl=dirUrlG;
				ctx.params.fileName=fileNameG;			
				ctx.params.FileExtName=FileExtNameG;
				ctx.params.FileOnlyName=FileOnlyNameG;
	
				ctx.params.FileSize=FileSize;
				ctx.params.FileType=fileTypeSplit;

				ctx.params.FilePath=filePath;
				ctx.params.FileUrl=fileUrl;

				
			}
			catch
			{
	
					//! Return
					ctx.params.title="Dosya Yükleme"
					ctx.params.status=0;
	
					ctx.params.fileUrl="";
					ctx.params.fileName="";
					ctx.params.dirUrl="";
					ctx.params.FileExtName="";
		
					ctx.params.FileSize=0;
					ctx.params.FileType="";

					ctx.params.FilePath="";
					ctx.params.FileUrl="";
				
			}
	
	
				
				delete ctx.params.file;
	
				return ctx.params
		}	
	
	}
}
