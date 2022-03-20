const host = "http://localhost:3000/api";

/////////////     DOCTOR LOGIN    //////////////

request = {
  method: "POST",
  endpoint: "/doctor/login",
  body_json: {
    lid: 12345,
    phone: "9892468745",
  },
};

response = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMwNzg0OGY5OTJmMTYyNDI2MjBjYyIsInJvbGUiOjQwMjQsImlhdCI6MTY0NzU4ODM4NCwiZXhwIjoxNjQ3NTkxOTg0fQ.0WZgctnUvqpqszPk4jas1oVX_zOtS0pOgAmGjkjpZKk",
  message: "Login successful",
};

///////////////////    VERIFY AN AADHAAR NUMBER    ////////////////////////

request = {
  method: "POST",
  endpoint: "/aadhaar/verify",
  body_json: {
    uid: "877467266338",
  },
};

response = {
  aadhaarStatusCode: "1",
  address: "Maharashtra",
  ageBand: "30-40",
  dob: null,
  gender: "MALE",
  maskedMobileNumber: "xxxxxxx716",
  mobileNumber: null,
  status: "Success",
  statusMessage: "877467266338 Exists",
};

//////////////////////     CREATE PRESCRIPTION FOR DOCTOR ON AADHAAR VERIFICATION     ////////////////////////
// Use doctor login token as auth
request = {
  method: "POST",
  endpoint: "/prescription/create",
  header: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMwNzg0OGY5OTJmMTYyNDI2MjBjYyIsInJvbGUiOjQwMjQsImlhdCI6MTY0NzU4ODM4NCwiZXhwIjoxNjQ3NTkxOTg0fQ.0WZgctnUvqpqszPk4jas1oVX_zOtS0pOgAmGjkjpZKk",
  },
  body_json: {
    patient: "965913790963",
    image:
      "data:image/png;base64,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",
  },
};

response = {
  active: true,
  purchases: [],
  _id: "6234349433a805447cb1b2ef",
  doctor: "623307848f992f16242620cc",
  image:
    "data:image/png;base64,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",
  date: "2022-03-18T07:28:20.604Z",
  __v: 0,
};

////////////////// CREATE PRESCRIPTION FIREBASE IMAGE ///////////////////
/*
POST /api/prescription/create HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMwNzg0OGY5OTJmMTYyNDI2MjBjYyIsInJvbGUiOjQwMjQsImlhdCI6MTY0Nzc3NTQ2OSwiZXhwIjoxNjQ3Nzc5MDY5fQ.D0QAYe30Mf-jQjOWC_u3DqT4OSHr96pXcoGXy_EB7-w
Content-Length: 300
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="/C:/Users/marti/Pictures/scene1.png"
Content-Type: image/png

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="patient"

965913790963
----WebKitFormBoundary7MA4YWxkTrZu0gW

*/

var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMwNzg0OGY5OTJmMTYyNDI2MjBjYyIsInJvbGUiOjQwMjQsImlhdCI6MTY0Nzc3NTQ2OSwiZXhwIjoxNjQ3Nzc5MDY5fQ.D0QAYe30Mf-jQjOWC_u3DqT4OSHr96pXcoGXy_EB7-w"
);

var formdata = new FormData();
formdata.append(
  "image",
  fileInput.files[0],
  "/C:/Users/marti/Pictures/scene1.png"
);
formdata.append("patient", "965913790963");

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow",
};

fetch("http://localhost:3000/api/prescription/create", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

//////////////////    RETAILER LOGIN       /////////////////////////

request = {
  method: "POST",
  endpoint: "/retailer/login",
  body_json: {
    reg: 969145,
  },
};

response = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzM2OTI0MTNkYmRiNGRkYzZhYzY1ZiIsInJvbGUiOjUwMjUsImlhdCI6MTY0NzYwNTQwNiwiZXhwIjoxNjQ3NjA5MDA2fQ.KE0xHtvUh8Pm8GVSRB_qREBnUulYxN01w2M82S8zEXI",
  message: "Login successful",
};

/////////////////////////////       GET ALL PRESCRIPTION OF A PATIENT WITH PATIENT ID             /////////////////////////////////////////
// Use retailer login token here as auth
request = {
  method: "POST",
  endpoint: "/prescription",
  header: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMwNzg0OGY5OTJmMTYyNDI2MjBjYyIsInJvbGUiOjQwMjQsImlhdCI6MTY0NzU4ODM4NCwiZXhwIjoxNjQ3NTkxOTg0fQ.0WZgctnUvqpqszPk4jas1oVX_zOtS0pOgAmGjkjpZKk",
  },
  body_json: {
    patient: "965913790963",
  },
};

response = {
  prescriptions: [
    {
      active: true,
      _id: "62331b891b375345e0e0fc89",
      doctor: {
        lid: 12345,
      },
      date: "2022-03-17T11:29:13.055Z",
    },
    {
      active: true,
      _id: "6234349433a805447cb1b2ef",
      doctor: {
        lid: 12345,
      },
      date: "2022-03-18T07:28:20.604Z",
    },
  ],
  _id: "6233198becd24c56acc36736",
  uid: "965913790963",
};

////////////////////////        GET SPECIFIC PRESCRIPTION WITH ID ONCE RETAILER CLICKS ON ONE OF PRESCRIPTION FOR MORE DETAILS       /////////////////////////////
// Use retailer login token here as auth
request = {
  method: "GET",
  endpoint: "/prescription/{pres-id}",
  header: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMwNzg0OGY5OTJmMTYyNDI2MjBjYyIsInJvbGUiOjQwMjQsImlhdCI6MTY0NzU4ODM4NCwiZXhwIjoxNjQ3NTkxOTg0fQ.0WZgctnUvqpqszPk4jas1oVX_zOtS0pOgAmGjkjpZKk",
  },
};

response = {
  active: true,
  purchases: [
    {
      item: {
        drug: {
          name: "21st Century Iron 65mg Tablet",
        },
      },
      date: "2022-03-18T08:52:45.339Z",
    },
  ],
  _id: "62331b891b375345e0e0fc89",
  doctor: {
    lid: 12345,
  },
  image:
    "data:image/png;base64,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",
  date: "2022-03-17T11:29:13.055Z",
};

/////////////////////////           SET ACTIVE PRESCRIPTION TO INACTIVE              /////////////////////////////////////
// Use retailer login token here as auth

request = {
  method: "PUT",
  endpoint: "/prescription/{pres-id}/deactivate",
  header: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMwNzg0OGY5OTJmMTYyNDI2MjBjYyIsInJvbGUiOjQwMjQsImlhdCI6MTY0NzU4ODM4NCwiZXhwIjoxNjQ3NTkxOTg0fQ.0WZgctnUvqpqszPk4jas1oVX_zOtS0pOgAmGjkjpZKk",
  },
};

response = {};

////////////////////        ADD PURCHASE DETAILS AFTER SCANNING THE BARCODE           ////////////////
// Use retailer login token here as auth
request = {
  method: "POST",
  endpoint: "/purchase/add",
  header: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMwNzg0OGY5OTJmMTYyNDI2MjBjYyIsInJvbGUiOjQwMjQsImlhdCI6MTY0NzU4ODM4NCwiZXhwIjoxNjQ3NTkxOTg0fQ.0WZgctnUvqpqszPk4jas1oVX_zOtS0pOgAmGjkjpZKk",
  },
  body_json: {
    item: "6234369f33a805447cb1b2fd", // Scanned through barcode
    patient: "6233198becd24c56acc36736", // id of patient
    prescription: "62331b891b375345e0e0fc89", // pres id
  },
};

response = "if status 200 then success";

/////////////////////////////        PATIENT LOGIN          //////////////////////////////////////

request = {
  method: "POST",
  endpoint: "/patient/login",
  body_json: {
    uid: "965913790963",
    phone: "9892468735",
  },
};

response = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMxOThiZWNkMjRjNTZhY2MzNjczNiIsInJvbGUiOjMwMjMsImlhdCI6MTY0NzU4OTM3NCwiZXhwIjoxNjQ3NTkyOTc0fQ.fpycKuDzEZ-VnHTRtv7henAdl1uP_xKs5HRTelOf2UU",
  message: "Login successful",
};

///////////////////      PATIENT AFTER LOGIN (PATIENT HOMEPAGE)     ////////////////////////////////////
// Use patient login token

request = {
  method: "GET",
  endpoint: "/patient",
  body_json: {
    uid: "965913790963",
    phone: "9892468735",
  },
};

response = [
  {
    active: true,
    purchases: [
      {
        item: {
          drug: {
            name: "21st Century Iron 65mg Tablet",
          },
        },
        date: "2022-03-18T08:52:45.339Z",
      },
    ],
    _id: "62331b891b375345e0e0fc89",
    doctor: {
      lid: 12345,
    },
    image:
      "data:image/png;base64,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",
    date: "2022-03-17T11:29:13.055Z",
  },
];

/////////////////////  ADD AADHAAR ////////////////////////////
request = {
  method: "POST",
  endpoint: "/aadhaar/add",
  body_json: {
    uid: "965923790963",
    phone: "9892469835",
  },
};

response = {
  _id: "62366e191836ff57448a6e76",
  uid: "357467266338",
  phone: 9867962643,
  __v: 0,
};

//////////////////////////   OTP Send ////////////////////

request = {
  method: "POST",
  endpoint: "/otp/send",
  body_json: {
    uid: "965923790963",
  },
};

response = {
  result: "Success",
  message: "OTP sent successfully",
};

response = {
  result: "Failed",
  message: "OTP sending failed",
};

/////////////////////// OTP Verification /////////////////////

request = {
  method: "POST",
  endpoint: "/otp/verify",
  body_json: {
    uid: "357467266338",
    otp: 2345,
  },
};

response = {
  result: "Sucess",
  message: "Verification successfull",
};

response = {
  result: "Failed",
  message: "OTP Verification failed",
};
