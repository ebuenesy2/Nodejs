
# Socket Protokolu - Mesaj Gönderme
 
 ## Html - Bildirim Alma
 
 ```

    //! Gelen Bildirim
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        console.log("UserId:",userId);

        //! Veri Alma
        let geleData = event.data;
        const obj = JSON.parse(geleData);
        const objDataType = obj.dataType; // "Connect" 

        //--- Sil
        const objDataTypeDescription = obj.dataTypeDescription; // "Connected"
        const objConnectCount = obj.count; // 2
        const objToAll = obj.toAll; // 1
        const objFromUserID = obj.fromUserID; // 1
        const objToUserID = obj.toUserID; // 12
        const objData = obj.data; // 12
        let objMesajType = "-"; // send | incoming

        //! console yazma
        console.log("Gelen Bilgi:",geleData);    
        console.log("Gelen Bilgi Json:",obj);
        console.log("DataType:",objDataType);
        console.log("DataTypeDescription:",objDataTypeDescription);
        console.log("ToAll:",objToAll);
        console.log("FromUserID:",objFromUserID);
        console.log("ToUserID:",objToUserID);
        console.log("Data:",objData);
        console.log("MesajType:",objMesajType);
         //--- Sil Son        


       // Bağlantı Bilgileri
        if(obj.dataType == "Connect" && obj.fromUserID == userId ) { document.getElementById("connectStatus").innerText = obj.dataTypeDescription; }
        if(obj.dataType == "Connect") { document.getElementById("connectCount").innerText = obj.count; }
       // Bağlantı Bilgileri Son

        //***** Mesaj Bilgileri *****

        //! Gönderildi Mesaj
        if(obj.dataType == "Message" && obj.dataTypeTitle == "mesaj_send_successful" && obj.fromUserID == userId ) { alert("mesaj gönderildi"); }

          //! Gelen Mesaj
        if(obj.dataType == "Message" && obj.dataTypeTitle == "mesaj_send_successful") { 
            if(obj.toAll==true) { alert("Herkese mesaj geldi"); }
            if(obj.toAll==false && obj.toUserID == userId ) { alert("Özel mesaj geldi"); }
        }


         //***** Mesaj Bilgileri Son *****

    });
    //! Gelen Bildirim Son
    
 ```
 
 ## Html - Bildirim Gönderme 
 ```

    //! Gönderilen Bildirim 
    const sendMessage = () => {

        const jsonVeri = JSON.stringify({

            toAll:true,
            toUserId:"id",
            dataType: "Message",
            dataTypeTitle: "mesaj_send_successful",
            dataTypeDescription:"Mesaj Gönderme Başarılı",
            dataId: 0,
            data:"Html den merhaba"
        })

    socket.send(jsonVeri);      
    }
    //! Gönderilen Bildirim Son
    
 ```
 
 ## Return
 
 ```
{
    "fromUserID": 3,
    "fromUserToken": "1BPNu0wN3ogwUnqX4HgSBtKASoSHl2J2",
    "toAll": true,
    "toUserID": "all",
    "dataType": "Message",
    "dataTypeTitle": "mesaj_send_successful",
    "dataTypeDescription": "Mesaj Gönderme Başarılı",
    "dataId": 0,
    "data": "Html den merhaba",
    "count": 2,
    "date": "2022-05-14T18:31:10.705Z"
}
 ```
