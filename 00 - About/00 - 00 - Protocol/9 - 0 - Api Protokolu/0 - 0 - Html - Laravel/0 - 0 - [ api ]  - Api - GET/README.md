# Ajax Dersleri - Api - GET

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
    <button type="submit" title="Gonder	" id="send"> Gonder</button>
    <div id="sonuc"> Sonuc </div>
 ```

## AJax
 ```
<!------  script   -->
<script type="text/javascript">
    $('document').ready(function () {

        //Gönderme
        $('#send').click(function () {
            //alert('Tıklandı');

            //! **** Ajax ***********
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                type: "GET",
                success: function (response) {
                    console.log(response);
                    console.log(response[0]);
                    console.log(response[0].userId);
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
