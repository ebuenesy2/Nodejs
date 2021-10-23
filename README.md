
## Port Bilgilerim

 ```
 /3000 => React
 /3001 => Api - Nodejs
 /8000 => Laravel
  ```

  ## Proje Hakkında - Version [ V1 ]

 ```
 /api/products => Ürünler
 /api/productCategory => Ürün Kategorisi
 /api/category => Kategorisi
 /api/orders => Sipariş
 /api/page => Sayfalar
 /api/pricing => Fiyat Listesi
 /api/ssk => Sık Sorulan Sorular
 /api/blogs => Blog
 /api/file => Dosya
 /api/message => Messajlar
 /api/settings => Ayarlar
 /api/admin => Admin
 /api/user => Kullanıcı
 /api/logs => Bildirim
 /token => Token
 /env => Env
 /env => Env

  ```


## Çalıştırma - Terminal

 ```
  http://localhost:3001/
 ```

```
yarn start
```

## Çalıştırma - Heroku üzerine

```
https://api-yildirim-dev.herokuapp.com/
```

# Yayınlama - Heroku

```
heroku login
```

```
git init

heroku git:remote -a app-sabit

git add .

git commit -m "heroku"

git push heroku
```

<br>

## Terminal Aç - Online

```
heroku logs --tail
```

```
heroku logs --tail --app app-sabit
```


## Git Yükleme

```
git add .
git commit -m "heroku"
git push
```

## Çalıştırma - Local üzerine

```
npm start
```

## [ npm start ] Düzenleme

```
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

## Express Yükleme

```
npm i express -g
```

## Fastify Yükleme

```
npm i fastify
```

```
npm i fastify-formbody
```
# Moleculer Kullanımı

  ## Kaynak
  
  ```
  https://moleculer.services/docs/0.14/services.html
  ```


   ## İçinde bulunan konular

   * Node js
   * Moleculer 
   * Mongoose db
   * Fastify 

 ## Eklenti - CMD

  CMD programını çalıştır 

 ```
  cd klasor_adresi
 ```


 ```
  moleculer init project moleculer-demo
 ```
 
  ## İzlenen Yol * Cmd üzerinden
  <br>
  
 
 ![cmd](https://user-images.githubusercontent.com/86044516/126914590-3ca0a383-8ce0-403e-b09b-3f4c9e4a6eb2.png)

  

   ## Çalıştırma - Terminal

   Proje  Çalıştırma 
 
 ```
  cd moleculer-demo
 ```

 ```
  npm run dev
 ```

<br>

 Çalıştırma site

<br>

 ```
  http://localhost:3001/
 ```

  ## Postman Kullanımı

   Postman klasor içindeki Json verisini indirip bunu postman içine dahil ediniz
  <br>

  ## PORT Değiştirme

  > services > api 

  ```
  module.exports = {
	name: 'api',

	settings: {
		port: process.env.PORT || 3000
	},

  ```


  
## Yarn Yükleme

```
npm install --global yarn
```

# Moleculer ekleme

```
 yarn add moleculer
```

<b> Yarn çalışacak yer - [ start] </b>
```
"start":"npm run dev",
```

<b> Çalıştırma </b>
```
yarn start
```


## Pm2 Yükleme

```
npm i pm2@latest -g
```

Başlatma
<br

```
pm2 start app.js
```

Durdurma
<br>

```
pm2 stop  app
```

Silme işlemi
<br>

```
pm2 delete app
```

```
pm2 delete all
```

# Pm2 Listeleme

```
pm2 list
```

```
pm2 monit
```

# Pm2 Bilgiler

```
pm2 logs
```

## Pm2 Ecosystem Yükleme

```
pm2 ecosystem
```

<br>
 Proje başlangıç yeri yazılacak / değiştirecek - [ ecosystem Dosyası]

```
 module.exports = {
	apps: [{
		name: 'Eczane Api',
		script: 'api.js',
		args: 'start',
		instances: 1,
		autorestart: true,
		watch: false,
		max_memory_restart: '8G',
		env: {
			NODE_ENV: 'development',
		},
		env_production: {
			NODE_ENV: 'production'
    	}
	}
	]
};
```

Başlatma
<br>

```
pm2 start ecosystem.config.js
```

Durdurma
<br>

```
pm2 stop ecosystem.config.js
```




# Contact
Copyright (c) 2021 - Temmuz  By Ebu Enes Yıldırım

