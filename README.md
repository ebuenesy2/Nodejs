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

## Çalıştırma - Heroku üzerine

```
https://app-sabit.herokuapp.com/
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
