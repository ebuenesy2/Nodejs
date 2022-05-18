# Ajax Dersleri - Api - POST - Socket

## Açıklama
 ```
Ajax Dersi
 ```
 
 ## Jquery Dosyası Çekme - Klasor 
 ```
    <!---- Jquery dosyası çekme--->
    <script type="text/javascript" src="js/jquery-3.6.0.min.js"></script>
 ```
 
  ## Jquery Dosyası Çekme - Web 
 ```
<!---- Jquery dosyası çekme--->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

 ```

## Html
 ```
    <div class="apiButtonPanel">
       <div class="apiButtonPanelText" >   <p> Email: </p>   <input type="text" class="table" id="emailPost" >  </div>
       <div class="apiButtonPanelText" >   <p> Password: </p>   <input type="text" class="table" id="passwordPost" > </div>

       <div class="apiButtonPanelButton" > <button type="submit" title="Gonder	" id="sendPost"> Login</button>  </div>
   </div>
 
    
    <div class="apiPanel">
          <div class="apiPanelText" >   <p> Title: </p>  <p id="apiSonucTitle"> Sonuc </p>  </div>
          <div class="apiPanelText" >   <p> Status: </p>   <p id="apiSonucStatus"> Sonuc </p>  </div>
    </div>

 ```
 
 ## Css
 ```
<!------  Css   -->
<style>
 
    .apiButtonPanel {
       display: flex;
       width: 450px;
       flex-direction: column;
       justify-content: space-between;
       border: 1px solid black;
       padding: 4px;
       margin-bottom: 20px;
       height: 100%;
       border-radius: 14px;
    }

    .apiButtonPanelText {
       display: flex;
       width: 100%;
       flex-direction: row;
       gap: 5px;
       padding-right: 6px;
       align-items: center;
       margin-bottom: -19px;
    }

    .table {
        width: 100%;
        height: 14px;
        margin-right: 10px;
    }

    .apiButtonPanelButton {
        margin-right: 10px;
    }

    #sendPost {
       background-color: green;
       color: aliceblue;
       width: 100%;
       margin-bottom: 5px;
       margin-top: 15px;
       margin-right: 10px;
    }
      
    .apiPanel {
       display: flex;
       width: 450px;
       flex-direction: column;
       border: 1px solid black;
       padding: 4px;
       border-radius: 14px;
    }
   
    .apiPanelText {
       display: flex;
       flex-direction: row;
       gap: 5px;
    }
   
</style>
<!------  End Css   -->
 ```

## AJax
 ```

<!------  script   -->
<script type="text/javascript">


    $('document').ready(function () {

        //Gönderme
        $('#sendPost').click(function () {

            //! ---- Gönderilen Veriler --------
            var postData = {
                email: $('#emailPost').val(),
                password: $('#passwordPost').val(),
            }
            //! ---- Son  Gönderilen Veriler --------

            //! **** Ajax ***********
            $.ajax({
                url: "http://localhost:3002/api/user/loginOnline",
                type: "POST",
                data: postData,
                success: function (response) {
                    //! Console
                    console.log("Api:",response);
                    console.log("Title:",response.title);
                    console.log("Status:",response.status);
                    console.log("UserId:",response.userId);      
                    console.log("UserToken:",response.userToken);      
                    console.log("UserInfo:",response.userInfo);                  

                    //! Html
                    $('#apiSonucTitle').html(response.title);
                    $('#apiSonucStatus').html(response.status);

                    if(response.status==0) { alert(response.message) } 
                    if(response.status==1) { alert(response.message) } 


                    //! Sayfa Yönlendirme
                    //window.location='./home.html';

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            })
            //! **** Ajax Son *********

        }); //Gönderme son

    });
</script>
<!------  End script   -->

 ```

 ## Sayfa Yönlendirme
 ```
    //! Sayfa Yönlendirme
    window.location='./home.html';
 ```
 
 ## AJax - localStorage - Veri Kaydetme
 ```
 localStorage.setItem('userId', JSON.stringify(response.userId)); //! LocalStorage Kaydetme
 localStorage.setItem('userToken', JSON.stringify(response.userToken)); //! LocalStorage Kaydetme
 ```
 
 ## AJax - localStorage - Veri Çekme
 ```
var userIdLocal = JSON.parse(localStorage.getItem('userId')); //! Veri Çekme
alert(userIdLocal);
 ```
# AJax - localStorage - Login Durumları
 
 ## AJax - localStorage -  Login Kontrolu
 ```
    var userIdLocal = JSON.parse(localStorage.getItem('userId')); //! Veri Çekme
    if(userIdLocal) { window.location='./home.html'; }    //! Sayfa Yönlendirme    
 ```
 
  
 ## AJax -  Sayfa Yönlendirme
 ```
 <button onclick="window.location.href='./blog.html'">Continue</button> 
 ```


# Socket

 ## Html
 ```
<div style="width: 175px;  display: flex ; gap : 5px; border: 1px solid black; padding: 2px; margin-bottom: 5px; " > 
    <div id="connectStatus"  class="connectStatus">  DisConnect  </div>
    <div id="connectCount" >  0  </div>
</div>
 ```
 
 ## Css
 ```
.connectStatus { color: red;}
.connectStatus.active { color: green; }
.connectCount { 
    color: black;
    font-size: 15px;
    font-weight: 900;
}
 ```
 
 
 ## Socket Bağlama
 ```
    var userIdLocal = JSON.parse(localStorage.getItem('userId')); //! Veri Çekme
    const socket = new WebSocket('ws://localhost:3002/socket/'+userIdLocal);  // Url
 ```
 
 
## Socket Veri Gelmesi
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
       if(obj.dataType == "Connect" && objFromUserID == userIdLocal ) { document.getElementById("connectStatus").innerText = obj.dataTypeDescription; document.querySelector('.connectStatus').classList.toggle('active'); /* active class ekliyor */  }
       if(obj.dataType == "Connect") { document.getElementById("connectCount").innerText = objConnectCount;   }
        // Bağlantı Bilgileri Son

   });
   //! Gelen Bildirim Son
 ```

