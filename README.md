# MediaMonks exercise

This is a single page web application template using React and Redex.
It demonstrates authentication, navigation, asynchronous data fetching, error handling, caching and pagination, etc. using the technologies listed below.

Credentials are user *admin* and password *password*.

## Technologies used:

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/rackt/redux)
- [React Router](https://github.com/rackt/react-router)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [JSON Web Token](https://jwt.io/)
- [create-react-app](https://github.com/facebookincubator/create-react-app/)
- [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/)

## Feature highlights:

#### Best React Practice - [Separating "smart" and "dumb" components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

This design pattern makes even more sense when using React along with Redux, where top-level smart components (a.k.a. containers
in this codebase such as `AlbumsPage` and `PhotosPage`) subscribe to Redux state and dispatch Redux actions, while low level
components (such as `Album`, `Photo`, and `Header`) read data and invoke callbacks passed in as props.

#### Async Data Fetching with Caching and Pagination

The `AlbumsPage` and `PhotosPage` would show information. The async actions (see `users` and `repos` under actions) fetch data from:

-  `https://jsonplaceholder.typicode.com`

The fetched data are stored with the page number as the lookup key, so that the local copy can be shown without the need to re-fetch the same data remotely each time. However cached data can be invalidated if desired.

#### Error Handling while Fetching Data

You can test this by disabling your internet connection.
The application would fail gracefully with the error message if data fetching (for a particular page) fails. However, the application can still show cached data for other pages, which is very desirable behavior.
The async actions for restful API calls for authentication and fetching data are go through a common utility `callApi()`.

#### Authentication and Restricted Pages

Certain UI pages (`AlbumsPage` and `PhotosPage`) are only accessible after signing in to the application. When accessing restricted pages without signing in first, the application redirects to the `Login` page. The authentication is based on [JSON Web Token (JWT)](https://jwt.io/).


## Getting Started

To get started, please clone this git repository and then run `npm install` once under the project top-level directory. 

```
git clone https://github.com/fernandocortes10/mediamonks
cd mediamonks
npm install
```
This will install the dependencies for the client side.

**You’ll need to have Node installed on your machine**. (Node >= 6 and npm >= 3 are recommended).

`cd` to the project top-level directory and:

### `npm start`

Runs the app in the development mode, using the Webpack-provided "development server".<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**JWT-based authentication rely on an API Server deployed on Heroku (https://guarded-scrubland-46098.herokuapp.com/api).

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

App is ready to be deployed!


