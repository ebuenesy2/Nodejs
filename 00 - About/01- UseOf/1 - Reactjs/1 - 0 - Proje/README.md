# React - Api

## Açıklama

```
Api Veri Alma -  Gönderme
```

## Terminal

```
npm i axios
```

## İmport

```
import axios from 'axios'
```

## Kullanılan Url

```
Kullanılan Url
```

## Api Get
```
         //! Sabit Veriler
         state = {
            error:null,
            items: []
        }

        //! Axios
        async componentDidMount() {
            try {
    
                const response = await axios.get("http://localhost:3001/info");
                console.log(response);
                    
                //! Verileri Kaydet
                this.setState({error:null}) //! Hata Durumu          
                this.setState({items:response.data}) //! Tüm Veriler                                       
     
            } catch (error) { this.setState({error:error}) }
    
        }
```

## State Okuma
```
    <h1> {this.state.items.title} </h1>  
```
