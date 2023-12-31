# Booking Module

## Booking API

### Create Booking

Request
```
POST /bookings
{
  "id": "uuid",
  "items": [
    {
      "id": "uuid",
      "serviceId": "uuid",
      "name": "string",
      "price": {
        "amount": 1000,
        "currency": "EUR"
      },
      "frequency": "Daily",
      "quantity": 1
    },
    {
      "id": "uuid",
      "serviceId": "uuid",
      "name": "string",
      "price": {
        "amount": 1500,
        "currency": "EUR"
      },
      "frequency": "Monthly",
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
      "serviceId": "uuid",
      "name": "string",
      "price": {
        "amount": 1000,
        "currency": "EUR"
      },
      "frequency": "Daily",
      "quantity": 1,
      "subtotal": 1000
    },
    {
      "id": "uuid",
      "serviceId": "uuid",
      "name": "string",
      "price": {
        "amount": 1500,
        "currency": "EUR"
      },
      "frequency": "Monthly",
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
