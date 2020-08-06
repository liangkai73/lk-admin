

declare namespace login {
  interface loginParams {
    "userName": string,
    "userLogName": string,
    "userType": string,
    "passwd": string,
    "status": number
  }
  interface registerParams {
    "username": string,
    "telephone": string,
    "email": string
    "password": string
    "checkCode": string
  }

}