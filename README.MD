# UserManual in PostMan

### localhost:4001/

###### method: Get

- returns {"message":"Learning Node"}

### localhost:4001/user/

###### method: Get

- returns {"msg":"Visit /user/login or /user/register"}

### localhost:4001/user/register

###### method: Post

- body: raw, JSON
- send
  {
  "name":"yourname",
  "email":"your@mail.com",
  "password":"yourPassword"
  }

### localhost:4001/user/login

###### method: Post

- body: raw, JSON
- Send
  {
  "email":"your@mail.com",
  "password":"yourPassword"
  }

##### Response:

```
{"status":"success","message":"user found!!!","data":{"user":{"_id":"5fdc7d04ccd9c3b6f51aa391","name":"yourname","email":"your@mail.com","password":"$2b$10$PW.ScOcO/p30DA4RSoPxKOipq8bFYJytA32N0ornxvuWINFvTGuZm","__v":0},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGM3ZDA0Y2NkOWMzYjZmNTFhYTM5MSIsImlhdCI6MTYwODI4NTY1OSwiZXhwIjoxNjA4Mjg5MjU5fQ.07rVjWXwfvaVIrX5DtZtm6odTz6_hEQvwvZuY1g02Wo"}}
```

Copy the token, In headers, make a key 'x-access-token' and paste the token as value.

This is required to authenticate, inorder to use, product and cart.

### localhost:4001/cart

###### method: Get

- will show cart

### localhost:4001/cart

###### method: Post

- body: raw, json
- send
  {
  "productId":"Some product iD",
  "quantity":"any number"
  }

### localhost:4001/cart/empty-cart

###### method: Delete

- will empty cart

### localhost:4001/cart/subtract/:id

###### method: Delete

- will reduce quantity of the item with the provided id by one.

### localhost:4001/cart/remove/:id

###### method: Delete

- will remove the item from the cart.

### localhost:4001/product

###### method: Get

- will show all products

### localhost:4001/product/:id

###### method: Get

- will show specific product details

### localhost:4001/product

###### method: Post

- will show products

### localhost:4001/product

###### method: Post

- Body- form-data
- keys: name,price,image
  values: anyname,anynumber, select any image

##### Response

```
{
    "status": true,
    "data": {
        "_id": "5fdc9621800aff1e9ed08db6",
        "name": "latest",
        "price": "1200",
        "image": "files/c-logo_1608291873350.png",
        "__v": 0
    }
}

```

### localhost:4001/product/:id

###### method: Delete

- will delete specific product
