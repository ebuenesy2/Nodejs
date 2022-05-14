
# Socket Protokolu - Mesaj Gönderme
 
 ## Html - Tasarım
 
 ```
      <div class="connectUserInfo">
        <div>  User: </div>
        <div id="connectUserId" >  0  </div>
    </div>


   <div class="connectGenelPanel">
        <div class="connectPanel">  
            <div>  Client1 </div>
            <div>  <button onclick="sendMessage()">Send Msg</button> </div>
        </div>
        
        <div id="connectStatus" >  DisConnect  </div>
        <div id="connectCount" >  0  </div>
   </div>

   <div class="messagePanel">
    <div id="PanelDescription" >  <p id="PanelName"> FromId: </p> <p id="FromId"> 0 </p>  </div>
    <div id="PanelDescription" >  <p id="PanelName"> ToAll: </p> <p id="ToAll"> 0 </p>  </div>
    <div id="PanelDescription" >  <p id="PanelName"> ToUserID: </p> <p id="ToUserID"> 0 </p>  </div>
    <div id="PanelDescription" >  <p id="PanelName"> DataType: </p> <p id="DataType"> DataType </p>  </div>
    <div id="PanelDescription" >  <p id="PanelName"> DataTypeTitle: </p> <p id="DataTypeTitle"> DataTypeTitle </p>  </div>
    <div id="PanelDescription" >  <p id="PanelName"> DataTypeDescription: </p> <p id="DataTypeDescription"> DataTypeDescription </p>  </div>
    <div id="PanelDescription" >  <p id="PanelName"> DataId: </p> <p id="DataId"> DataId </p>  </div>
    <div id="PanelDescription" >  <p id="PanelName"> Data: </p> <p id="ComingData"> Data </p>  </div>
  </div>
  
 ```
 
## Html - Css
 
 ```
     .connectUserInfo {  
        display: flex;
        width: 165px;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid black;
        padding: 4px;
        margin-bottom: 6px;
    }

    .connectGenelPanel { display: flex; }

    .connectPanel {
        display: flex;
        width: 165px;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid black;
        padding: 4px;
    }

    #connectStatus { margin-left: 10px; margin-right: 10px;}


    .messagePanel { 
        display: flex;
        width: 345px;
        border: 1px solid black;
        height: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        flex-direction: column;
    }

    #PanelDescription { 
        display: flex; 
        margin-top: -10px;
        margin-bottom: -10px;
    } 
    #PanelName { margin-left: 10px; }
    #FromId { margin-left: 2px; }
    #ToId { margin-left: 2px; }
    #MessageType { margin-left: 2px; }
    #MessageData { margin-left: 2px; }
 ```
 
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

        document.getElementById("FromId").innerText = obj.fromUserID;
        document.getElementById("ToId").innerText = obj.toUserID;
        document.getElementById("DataType").innerText = obj.dataType;
        document.getElementById("DataTypeTitle").innerText = obj.dataTypeTitle;
        document.getElementById("DataTypeDescription").innerText = obj.dataTypeDescription;
        document.getElementById("DataId").innerText = obj.dataId;
        document.getElementById("ComingData").innerText = obj.data;
        

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
            if(obj.toAll==true && obj.fromUserID != userId) { alert("Herkese mesaj geldi"); }
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
