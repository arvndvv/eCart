# UserManual in PostMan

### localhost:4001/

- method: Get
- returns {"message":"Learning Node"}

### localhost:4001/user/

- method: Get
- returns {"msg":"Visit /user/login or /user/register"}

### localhost:4001/user/register

- method: Post
- body: raw, JSON
- send
  {
  "name":"yourname",
  "email":"your@mail.com",
  "password":"yourPassword"
  }

### localhost:4001/user/login

- method: Post
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

- method: Get
  - will show cart

### localhost:4001/product

- method: Get
  - will show products

### localhost:4001/cart

- method: Post
  - will show cart
