DevTinder APIs

authRouter

POST /SignUp
POST /login
POST /logout

ProfileRouter

GET /Profile/view
PATCH /profile/edit
PATCH /profile/password

connectionRequestRouter

POST /request/send/:status/:userId
POST /request/review/:status/:requestId


POST /request/send/ignored/:userId
POST /request/review/accepeted/:requestId
POST /request/review/rejected/:requestId

userRouter

GET /user/connections
GET /user/requests
GET /user/feed gets you  the profiles of others users on platform

status : ignored, interested, accepeted , rejected