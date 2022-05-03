
# Token Protokolu

## Açıklama
 ```
 * id
 * Tanım
 
 Fazla bilgiye gerek yok
 ```

## Zorunlu Alanlar [TokenInfo]
 
 ```
				let TokenInfo={				
					id: TokenId,
					title: ctx.params.title,
					content: ctx.params.content                    				
				}	
 ```
 
 ## Token Oluşturma
 
 ```
                //! Token
				let TokenId=new Date().getTime();
				let CreateDate=new Date();			

				let TokenInfo={				
					id: TokenId,
					title: ctx.params.title,
					content: ctx.params.content							
				}
				
				const secret = 'secret';
				const data = TokenInfo;
				const jwt = sign(data, secret);		
				//! End Token		
 ```

