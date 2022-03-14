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
https://yildirimdev-server.herokuapp.com/api/note/all
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

## Api Post
```
//! Sabit Veriler
state = {
error:null,
userId:1,
title:"title add",
status:0,
id:0,
data:[]
}




//! Axios
async componentDidMount() {
try {



//Eklenen Veriler
const NewData={
title:this.state.title,
mesaj:"mesaj post"
}



//Post
const response = await axios.post("https://jsonplaceholder.typicode.com/posts",NewData);
console.log(response.data); // Gelen veriler



//! Verileri Kaydet
this.setState({status:1}) //! Durum
this.setState({id:response.data.id}) //! Gelen Veriler



//! Array Veri Ekleniliyor
this.setState({
data:this.state.data.concat([NewData])
})



this.setState({error:null}) //! Hata

} catch (error) {

this.setState({error:error}) //! Hata
}



}
//! Axios Son
```
