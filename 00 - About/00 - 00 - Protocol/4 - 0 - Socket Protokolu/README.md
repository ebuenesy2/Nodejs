
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
 
## Socket Durumları
 ```
    socket.onopen = function () {
        alert("Connect");
        console.log("Opening a connection...");
    };
    socket.onclose = function (evt) {
        alert("bye");
        console.log("I'm sorry. Bye!");
    };
    socket.onmessage = function (evt) {
        // handle messages here
    };
    socket.onerror = function (evt) {
        console.log("ERR: " + evt.data);
    };
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
 
 ## Başlangıç
 ```
    /* Başlangıc */
    socket.onopen = function () {

       const jsonVeri = JSON.stringify({
             toAll:true,
             toUserId:null,
             dataType: "Time",
             dataTypeTitle: "time_add_successful",
             dataTypeDescription: "Zaman Görüntüleme Başladı",
             dataId: 0,
             data:null,
             pageTable:"home",
             pageToken: "homeToken"
        })

         socket.send(jsonVeri);   
    };
    /* Başlangıc Son*/
 ```

 
 ## Bulunan Bildirim Uyarıları
 
 ```
  * Bağlantı Başarılı : [dataType:"Connect"] [dataTypeDescription: "Connected"] [ dataId: 0 ]
  * Mesaj Gönderme Başarılı : [dataType:"mesaj"] [dataTypeTitle: "mesaj_send_successful"] [dataTypeDescription: "Mesaj Gönderme Başarılı"] [dataId:0] [data: "merhaba"]
  
 ```
 
# React Socket Kullanımı
  
## React Bağlantı
 ```
      useEffect(() => {
              const userId= 0;
              const socket = new WebSocket('ws://localhost:3002/socket/'+userId);  // Url

              socket.onopen = function () {
                alert("Connect");
                console.log("Opening a connection...");

                const jsonVeri = JSON.stringify({
                     toAll:true,
                     toUserId:null,
                     dataType: "Time",
                     dataTypeTitle: "time_add_successful",
                     dataTypeDescription: "Zaman Görüntüleme Başladı",
                     dataId: 0,
                     data:null,
                     pageTable:"home",
                     pageToken: "homeToken"
                 })
          
                 socket.send(jsonVeri);   


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

                     //Return Log
                     console.log("obj:",obj);

              // Bağlantı Bilgileri
                     if(obj.dataType == "Connect" && objFromUserID == userId ) { console.log("Bağlantı Durumu:",obj.dataTypeDescription); }
                     if(obj.dataType == "Connect") { console.log("objConnectCount:",objConnectCount);  }
                     // Bağlantı Bilgileri Son

              });
              //! Gelen Bildirim Son

              };
              socket.onclose = function (evt) {
                alert("bye");
                console.log("I'm sorry. Bye!");
              };
              socket.onmessage = function (evt:any) {
                // handle messages here
              };
              socket.onerror = function (evt:any) {
                 console.log("ERR: " + evt.data);
              };
              
       }, []);

    
 ```

 # React - Api - Socket

 ## Api Verisi Çekme
 
 ```
        const [productsCount, setProductsCount] = useState<[]>([])
       const [productsData, setProductsData] = useState<any[]>([])
     
     
       const apiGet = () => {  console.log("api");
         const apiUrl_table=process.env.REACT_APP_API_URL+"/api/user/all";
         //console.log("apiUrl_table:",apiUrl_table);
         
         axios.get(apiUrl_table)
           .then(response => {
     
             //! State
             setProductsCount(response.data.onlineCount);
             setProductsData(response.data.DB);

             console.log(response.data);
             console.log("onlineCount:",response.data.onlineCount);
               
           })
           .catch(error => {  console.log("Api Error:",error.message); });
         
       };

       useEffect(() => { apiGet(); }, []);

 ```
 
 ## Socket - Anlık Yenileme 
 ```
       useEffect(() => {
              const userId= 0;
              const socket = new WebSocket('ws://localhost:3002/socket/'+userId);  // Url

              socket.onopen = function () {
                //alert("Connect");
                console.log("Opening a connection...");

                const jsonVeri = JSON.stringify({
                     toAll:true,
                     toUserId:null,
                     dataType: "Time",
                     dataTypeTitle: "time_add_successful",
                     dataTypeDescription: "Zaman Görüntüleme Başladı",
                     dataId: 0,
                     data:null,
                     pageTable:"home",
                     pageToken: "homeToken"
                 })
          
                 socket.send(jsonVeri);   


              //! Gelen Bildirim
              socket.addEventListener('message', function (event) {
                     //console.log('Message from server ', event.data);

                     //! Veri Alma
                     let geleData = event.data;
                     const obj = JSON.parse(geleData);
                     

                     //Return Log
                     console.log("obj:",obj);

                   // Bağlantı Bilgileri
                     if(obj.dataType == "Connect" &&  obj.fromUserID == userId ) { 
                            //console.log("Bağlantı Durumu:",obj.dataTypeDescription);
                      }
                     if( obj.dataType == "Time" && obj.dataTypeTitle =="time_add_successful" ) { console.log("objConnectCount:",obj.count); apiGet();  }
                     if( obj.dataType == "Connect" && obj.dataTypeTitle =="disConnect" ) { console.log("objConnectCount:",obj.count); apiGet();  }
                     // Bağlantı Bilgileri Son

              });
              //! Gelen Bildirim Son

              };
              socket.onclose = function (evt) {
                alert("bye");
                console.log("I'm sorry. Bye!");
              };
              socket.onmessage = function (evt:any) {
                // handle messages here
              };
              socket.onerror = function (evt:any) {
                 console.log("ERR: " + evt.data);
              };
              
       }, []);


 ```
