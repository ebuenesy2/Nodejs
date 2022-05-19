
# Socket Protokolu

## Web Socket Url
 
 ```
ws://localhost:3002/socket/:userId
 ```
 
 ```
ws://localhost:3002/socket/12
 ```
 ## Bağlantı Html
 ```
<!--- Socket -->
<script>
     const userId= new Date().getTime();
     const socket = new WebSocket('ws://localhost:3002/socket/'+userId);  // Url
     document.getElementById("connectUserId").innerText = userId;
</script>
<!--- Socket Son -->

 ```
 
 ## Html - Bildirim Alma
 
 ```
    //! Gelen Bildirim
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);

        //! Veri Alma
        let geleData = event.data;
        const obj = JSON.parse(geleData);
        const objDataType = obj.dataType; // "Connect" - 
        const objDataTypeDescription = obj.dataTypeDescription; // "Connected"
        const objConnectCount = obj.count; // 2
        const objToAll = obj.toAll; // 1
        const objFromUserID = obj.fromUserID; // 1
        const objToUserID = obj.toUserID; // 12
        const objData = obj.data; // 12
        let objMesajType = "-"; // send | incoming

       // Bağlantı Bilgileri
        if(obj.dataType == "Connect" && objFromUserID == userId ) { document.getElementById("connectStatus").innerText = obj.dataTypeDescription; }
        if(obj.dataType == "Connect") { document.getElementById("connectCount").innerText = objConnectCount; }
         // Bağlantı Bilgileri Son

    });
    //! Gelen Bildirim Son
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

