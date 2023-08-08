# ShoppingCart Module

## ShoppingCart API

### Create Shopping Cart

Request
```
POST /shopping-carts
{
  "id": "uuid",
  "items": [
    {
      "id": "uuid",
      "productId": "uuid",
      "name": "string",
      "price": {
        "amount": 1000,
        "currency": "EUR"
      },
      "quantity": 1
    },
    {
      "id": "uuid",
      "productId": "uuid",
      "name": "string",
      "price": {
        "amount": 1500,
        "currency": "EUR"
      },
      "quantity": 2
    }
  ],
  "userId": "uuid"
}
```

Response
```
{
  "id": "uuid",
  "userId": "uuid",
  "items": [
    {
      "id": "uuid",
      "productId": "uuid",
      "name": "string",
      "price": {
        "amount": 1000,
        "currency": "EUR"
      },
      "quantity": 1,
      "subtotal": 1000
    },
    {
      "id": "uuid",
      "productId": "uuid",
      "name": "string",
      "price": {
        "amount": 1500,
        "currency": "EUR"
      },
      "quantity": 2,
      "subtotal": 3000
    }
  ],
  "total": {
    "amount": 4000,
    "currency": "EUR"
  },
  "createdAt": "2023-01-01T00:00:00.000Z",
  "status": "pending"
}
```
