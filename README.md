### To see  the demo live

[B3k3n](https://remarkable-truffle-6ee85b.netlify.app/)

**API**

Category API (https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories)  
Book API (https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=1&page=0&size=10)

### Create using React, Redux, React Router Ant Design, Axios, SCSS

A web application to allow user to display, search and bookmarked his/her favourite books.

Features:

- list of books by category
- responsive layout
- pagination
- a search to find books based on title or author
- allowed user to check their favourite books and remove their favourite
- list of favourite books


Libraries and dependency packages:

- react
- redux
- react-redux
- redux-thunk 
- react-router-dom
- axios 
- antd
- sass


### Suggestion for the backend API

The API is greate already. Some suggestion to improve the API:

- the book API response should include the total number of books. This to know the total number of pagination displayed.
- the book API query parameter can include search parameter by title, author and sort by specific field.
- for live production the API should include security token for protected page.


### To run in local

**Clone the project:**

```bash
$ git clone https://github.com/Rian-Sanjaya/b3k3n.git
```

**Install package:**

```bash
$ npm install
```
**Running the development server:**

```bash
$ npm start
```
