'use strict';
const dayjs = require('dayjs'); //! Zaman
const fs = require("fs"); //! Dosya
const sign = require('jwt-encode'); //! Token
const jwt_decode = require('jwt-decode'); //! Token
//const db = require('../public/DB/ssk.json'); //! Json


module.exports = {
	name: "xdeneme",

	actions: {
		async info(ctx) {

			//! Return Api
			ctx.params.title = "xdeneme.service"
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
		async service(ctx) {

			try {

				//! Return Api   
				ctx.params.title = "xdeneme.service -> Service"
				ctx.params.tablo = "xdeneme.json"
				ctx.params.status = 1		

				//Console Yazma
				console.log('\u001b[' + 32 + 'm' + 'xdeneme Service [ /api/xdeneme/service ] ' + '\u001b[0m');

			} catch (error) {

				//! Return Api   
				ctx.params.title = "xdeneme.service -> Tüm Veriler"
				ctx.params.tablo = "xdeneme.json"
				ctx.params.status = 0

				//Console Yazma
				console.log('\u001b[' + 31 + 'm' + 'xdeneme Service Okunamadı [ /api/xdeneme/service ] ' + '\u001b[0m');
				console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
			
			}

			//! Return
			return ctx.params
		}	
	}
}
