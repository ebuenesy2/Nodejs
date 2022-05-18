# Ajax Dersleri - Api - POST

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
                    //console.log("DB:",response.DB);
                    //console.log("title:",response.title);
                    

                    //! Html
                    $('#apiSonucTitle').html(response.title);
                    $('#apiSonucStatus').html(response.status);

                    alert("Giriş Başarılı");

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
