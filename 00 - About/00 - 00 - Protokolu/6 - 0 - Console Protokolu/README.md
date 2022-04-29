
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
console.log('\u001b[' + 32 + 'm' + '[User] Tüm Veriler Okundu [ /api/user/all ] ' + '\u001b[0m');
 ```

## Olumsuz
 
 ```
console.log('\u001b[' + 31 + 'm' + '[User] Tüm Veriler Okunamadı [ /api/user/all ] ' + '\u001b[0m');
 ```
 ```
console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
 ```

# Json

## Olumlu
 ```
console.log('\u001b[' + 32 + 'm' + '[User] Tüm Veriler Okundu [ /api/user/all ] ' + '\u001b[0m');
 ```
 
 
## Olumsuz
 
 ```
console.log('\u001b[' + 31 + 'm' + '[User] Json Veri Kayıt Edilemedi [ User.json ] ' + '\u001b[0m');	
 ```
 ```
console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
 ```
