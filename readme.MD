# REST api which tell you if a number is spam, or allow you to find a person’s name by searching for their phone number

Technology Used:
- Express with typeScript
- SQLite
- Prisma (ORM)
- bcryptjs
- jsonwebtoken

Available Endpoints: (base_url: localhost:3000)
- api/auth/register [POST]
- api/auth/login [POST]
- api/contact [POST]
- api/contact [GET]
- api/contact/:id [GET]
- api/search/q:query [GET]
- api/spam [POST]

[NOTE] -> All endpoints except register and login are protected.

How to Use:
- Clone this repo
- From your terminal -> npm install
- npx prisma generate
- run -> nodemon [server will get started at PORT 3000]

# Login / Registration
- Your can register or login: 
'localhost:3000/api/auth/resister' [POST]
'localhost:3000/api/auth/login' [POST]
```bash
{
    "name": "test User",
    "phoneNumber": "7488901822",
    "password": "123456"
}
- On login your will get below response. You can copy token:

{
    "user": {
        "status": 200,
        "message": "User logged in successfully",
        "token": "token will come here"
    }
}

- On making other request you need to pass this token in the header as
Authorization: `Bearer copied_token`
[Note] - Email is made optional, and after register also you will get token, you can use that also

## Contact
- To create contact, after adding authorization token:
- In body pass similar format, email is optional, and make [POST] request to 'localhost:3000/api/contact: 

{
    "name": "John Doe",
    "phoneNumber": "+9876543220",
    "email": "john@example.com"
}
- To get all your contact, make a [GET] request to 'localhost:3000/api/contact'
- To Search any of your contact by their unique id also, by making a [GET] request to 'localhost:3000/contact/userId'

## Search
- To search go to 'localhost:3000/api/search/q=query', add your authorization token, in query you can pass phoneNumber or name, and make a [GET] request. This is Global and can search user not in contact also.
- Also when you get result you will see a field spamLikelihood. Intially It's zero for all contact. 
- Calculation logic:
-- Found total spam reports for a number
-- Found total users who have this number in their contacts
-- (spam count) * 100 / (spam count + contact count)

-- This basically given a estimation, how likely a number marked as spam.

## Spam
- To report a number as spam, goto 'localhost:3000/api/spam', add number you want to mark as spam in the body.

## Security Measure:
- Added middleware to validate phone number and authentication.
- Encrypted password before storing to db
