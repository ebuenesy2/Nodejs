# Console Protokolu

## Açıklama

```
Console Ekranına yazma protokolü
```

## Kullanımı

```
console.log('\u001b[' + 32 + 'm' + '[FİLE_NAME] Mesaj [ /api/user/all ] ' + '\u001b[0m');
```

## Olumlu

```
console.log('\u001b[' + 32 + 'm' + '[File] [Delete] Veri Silindi [ /api/file/delete ]' + '\u001b[0m');
```

## Olumsuz

```
console.log('\u001b[' + 31 + 'm' + '[File] [Delete] Veri Silinemedi [ /api/file/delete ]' + '\u001b[0m');
```

```
console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
```

# Json

## Olumlu

```
console.log('\u001b[' + 32 + 'm' + '[File] [Json] [Add] Json Veri Kayıt Edildi [ file.json ] ' + '\u001b[0m');
```

## Olumsuz

```
console.log('\u001b[' + 31 + 'm' + '[File] [Json] [Add] Json Veri Kayıt Edilemedi [ file.json ] ' + '\u001b[0m');
```

```
console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
```

## Olumlu ve Olumsuz

```


					// Hata varsa
					if (err) {
						console.log('\u001b[' + 31 + 'm' + '[File] [Json] [Add] Json Veri Kayıt Edilemedi [ file.json ] ' + '\u001b[0m');
						console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
					}

					//Console Yazma
					console.log('\u001b[' + 32 + 'm' + '[File] [Json] [Add] Json Veri Kayıt Edildi [ file.json ] ' + '\u001b[0m');

```
