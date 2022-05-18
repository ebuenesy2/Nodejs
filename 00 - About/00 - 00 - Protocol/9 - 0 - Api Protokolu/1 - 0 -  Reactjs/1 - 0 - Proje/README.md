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
http://localhost:3001/info
```

## Api Get
```
        //! Sabit Veriler
        state = {
            error:null,
            isLoading:"false",
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
                this.setState({isLoading:"true"})                                    
     
            } catch (error) { this.setState({error:error}) }
    
        }
```

## State Okuma
```
 {this.state.isLoading? "oldu" : "olmadı"}    
```
```
<h1> {this.state.items.title} </h1>  
```
