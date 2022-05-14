
# Socket Protokolu

## Web Socket Url
 
 ```
ws://localhost:3001/socket/:userId
 ```
 
 ```
ws://localhost:3001/socket/12
 ```
 ## Bağlantı Html
 ```
<!--- Socket -->
<script>
    const userId=3;
    const socket = new WebSocket('ws://localhost:3001/socket/'+userId);  // Url
</script>
<!--- Socket Son -->

 ```
 
 
 ## Bağlantı Return
 
 ```
{
    "fromUserID": 3,
    "fromUserToken": "GQ8oM91Jm1cZrLt-g0RZuehWCEUbwaLc",
    "toUserID": "all",
    "dataType": "Connect",
    "dataTypeTitle": "Connected",
    "dataTypeDescription": "Bir Kullanıcı Bağlandı",
    "dataId": 0,
    "data": "Bir Kullanıcı Bağlandı",
    "count": 2,
    "date": "2022-05-14T18:18:15.350Z"
}
 ```
 
 ## Bulunan Bildirim Uyarıları
 
 ```
  * Bağlantı Başarılı : [dataType:"Connect"] [dataTypeDescription: "Connected"] [ dataId: 0 ]
  * Mesaj Gönderme Başarılı : [dataType:"mesaj"] [dataTypeTitle: "mesaj_send_successful"] [dataTypeDescription: "Mesaj Gönderme Başarılı"] [dataId:0] [data: "merhaba"]
  

 ```

 ## Planlanan Uyarılar
 
 ```
 Service Kullanımları
 ```

