# Node.js Web Server , JWT Assignment 2

## Assignment Requirements and Fulfillment

1. **User Authentication**
- POST request to /register.
- The request sends a JSON body with a username and password.
- The server responds with 201 Created, confirming successful registration and returning the user details.
<img width="902" alt="register" src="https://github.com/user-attachments/assets/6cb40380-9a51-445e-a653-2ba3d38b2012" />

-  POST request to /login.
-  The request includes a username and password in the JSON body.
-  The server responds with 200 OK, confirming successful authentication and returning a JWT token for authorization.
<img width="869" alt="Login" src="https://github.com/user-attachments/assets/498c7456-c8f5-4f3a-a793-6ad100b993cc" />

2. **Testing Protected Routes**
- GET request to /students.
- The request was sent without authorization, resulting in a 401 Unauthorized response.
- The server requires a JWT token for authentication, as indicated by the error message: "Token required."
<img width="858" alt="Screenshot 2025-01-30 at 7 14 25 PM" src="https://github.com/user-attachments/assets/1838dc0c-951c-428f-9405-d2c04ac3bd88" />
   
3. **Adding and View Data**
- POST request to /students.
- The request includes a JSON body with a student's name and email.
- The server responds with 201 Created, confirming that the student was successfully added and returning their details, including an assigned ID.
<img width="882" alt="addstudent" src="https://github.com/user-attachments/assets/5d8b401c-d386-4b24-bb79-1249ffec7308" />

- GET request to /students.
- The request includes an authorization token, allowing access to the protected route.
- The server responds with 200 OK, returning a list of students, including their IDs, names, and emails.
<img width="868" alt="getallstudents" src="https://github.com/user-attachments/assets/e6955c6d-a271-435a-b00b-b6145bf35877" />

4. **Handling Errors**
- GET request to /students with a Bearer Token for authentication.
- The server responds with 403 Forbidden, indicating that the token is invalid or expired, preventing access to the protected route.
<img width="863" alt="JWTExprired" src="https://github.com/user-attachments/assets/b7cd77e5-8e35-4683-bc0e-64d1cae43f96" />

- POST request to /enrollments.
- The request includes a JSON body with studentId and courseId.
- The server responds with 400 Bad Request, indicating that the provided studentId is invalid and does not exist.
<img width="855" alt="badStudentID" src="https://github.com/user-attachments/assets/9673e882-c615-460a-b6dd-b3438e3d8bd0" />

** Quang bui **
