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

# State Güncelleme
```
  const [productsData, setProductsData] = useState<any[]>([])
```

# Api Okuma
```

  useEffect(() => {
    const apiUrl_table=process.env.REACT_APP_API_URL+"/api/user/all";
    
    console.log("apiUrl_table:",apiUrl_table);

    axios.get(apiUrl_table)
    .then(response => {
      
      //! Console Yazma
      console.log("Status:",response.status); //! Status

      console.log("Data:",response.data); //! Veriler
      console.log("DataArray:",response.data.DB); //! Array Verileri
      console.log("DataArrayCount:",response.data.DB.length); //! Array Verileri
      
      //! State
      setError(false); //! Çalışıyor
      setProducts(response.data.DB);
        
    })
    .catch(error => {
      
      //! Console Yazma
      console.log("Error:",error.message);

      //! State
      setError(true); //! Çalışıyor
    });
    
    
  }, []);
```

## Axios Array Okuma

```
      //! Console Yazma
      console.log("Data:",response.data); //! Veriler
      console.log("DataArray:",response.data.DB); //! Array Verileri
      console.log("DataArrayCount:",response.data.DB.length); //! Array Verileri
```

# State Okuma


## State Tek Okuma

```
<h2> {this.state.itemsSize} </h2>
```
```
<h1> Error: {error ? "true" : "false"} </h1>
```
```
<h1> Products: {products.length} </h1>
```
```
 <h1> ProductsId: {productsData[0].id}  </h1>
```

# State Array Güncelleme - Okuma

# State Güncelleme
```
  const [productsData, setProductsData] = useState<any[]>([])
```
```
  setProductsData(response.data.DB);
```

# State Array Okuma
```

            {productsData.map((que,i) => 
                   <p> Id: {que?.id} - Name: {que?.name} </p>
            )}
```
