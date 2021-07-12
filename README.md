# goodreads

An Application simulates some features from the well-known books website [Goodreads](https://goodreads.com).
- Browsing Books, Authors, Books Categories
- Adding Books to user's Shelve as (Want to Read, Currently Reading, Read)
- Rating Books
- Check books overall ratings by other users

## Technologies & Libraries used

- ReactJS & Redux
- Material UI & Bootstrap
- NodeJS
- ExpressJS
- MongoDB

-------------------------------------------------------------------------------------


### A live demo
<a href="https://moali-goodreads.herokuapp.com/" title="goodreads">moali-goodreads.herokuapp.com</a>

-------------------------------------------------------------------------------------

## Clone the Repo & Configure the App

### Install dependencies
To install dependencies run the following commands
#### Backend dependencies
```sh
npm install -D
```
#### Frontend dependencies
```sh
cd client/ && npm install
```

### Run the application
From the app root directory run the following command
```sh
npm run dev
```
-------------------------------------------------------------------------------------

# Create an Admin to use the admin panel
Using Postman, with your application running, create a `post` request to this api `{{localhost}}/api/adminAuth/createAdmin` with the following JSON filled with your info
<pre>{
	"name": "John Doe",
	"email": "john-doe@example.com",
	"password": "test1234"
}<pre>
