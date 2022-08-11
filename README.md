#  Software requirements

## System architecture
For this application I'll be using the create-react-app to develop my application.
The reason for going with react is, it has great support, create browser compatibility,
it can make use of reusable components, other web-packs and libraries like bootstrap.
React can also make use of Hooks, which allows a developer to create more advanced apps
with less code.

I Will make use of heroku to deploy my app. This app will also have a back-end server
with Express and Node that are supported by Heroku for deployment. Heroku offers free
deployment for any MERN stack applications.

I'll also make use of React-bootstrap for styling my app. Bootstrap has a wide range
of reusable components that's already styled, is supported on the latest browser and
is mobile responsive. Using bootstrap will cut down a lot of development time.


## System requirements specification

### Who will use your application?
- This app is specifically made for dog owners.

### How will they beneﬁt from using it?
- Pet owners will be more aware of events to get together with other pet owners.
- Owners pets will also benefit from this by getting a lot of social interaction.
- These events can help a lot of owners who are looking for events like this.  

### How the application will work
-   The app will display a list of event cards for the current week.
-   Each event is made for a specific dog size.
-   Dog owners will be able to see what event they can go to, depending on their dog's size.
-   After 10s a popup will allow the user to sign up with a name and password.
-   Signed up users will be able to leave a comment in the comment section.
-   The comment section can also be used to ask questions.
-   Other signed up users will also be able to reply to a user comment.
-   Only the admin will be able to add or update events.

### User stories
- Jason the Admin: would like to add new events, update events, delete events, delete other users adn there comments.
- Emily the member: would like to login and add comments and reply to other comments.
- Eve the visitor: would like to be able to click the like button on a event cards to show interest.

### How this add is different from others
- Even though there are similar software out there like on facebook and mobile devices. What makes this app
  different is thats is easer to use, dog owners can easily see the planned events for the week, the location has a link
  attached to it that opens google maps for easy navigation.

### Functional requirements
- #### A user should be able to:  
- like an event.
- add a comment and reply to other comments.
- delete there own comment.
- Perform crud operation on events(admin)
- View and delete any other user(admin).

### Non-Functional requirements
-	The app should be easy to interact with.
-	There should be section that explains what the app is about.
- App should have good performance with loading times and click responses.
-	There should be 404 page when running into error. Describing the error and what to do to return or recover from that error.
-	The user should be able to securely access the app when logging in or retrieving data (user Token).
- User data like comments and events will be store in a database (MongoDB).
- User should have 24/7 access to the app.

## How to use the app.
- Visitors can like events and follow the location link icon to events.
- This app can be used by two types of users, the admin and member.
- To use the app you need to join / create an account and become a member.
- #### Members  can add comments in the comment section and reply to other user comments.
- #### The admin can add comments and also remove any other user comment. Only the admin can perform crud operations on events.


### Install as followed
##### API key's and URI's
- The app events and user data relies MongoDB, to load all the data from MongoDB you need a [URI](https://www.mongodb.com/docs/manual/reference/connection-string/).
- When having your own URI, past your URI link inside the .env file (DB_API_KEY="Your Key"), you can then start adding events and users that will be stored on MongoDB.
- This app does not make use of API key's, so none is needed.
- To run this app on your local machine.

```bash
  cd to main folder directory
  npm start
```

## Running Tests
#### Frontend/Snapshot tests
- The snapshot test uses the renderer module and will run a test on the app.js.
- The first time it runs, it will create a _snapshot_ folder, which contains the app.js snapshot. If any changes are made to the app the next snapshot test will fail. Because it's being tested and compared to the firs test.
```bash
  cd frontend
  npm test
```

#### Backend server/Unit tests
- Tests are run using mocha and chai
- This test will run by call both fetch methods and return all the users and comments of the application and checking each of their status codes.
```bash
  cd to backend directory
  npm run test
```

### Security
- To make the app more secure a middleware called [Helmet](https://www.npmjs.com/package/helmet) is used.

#### Third-party API's 
- This app contains no third-party API besides links to google maps.

## Deployment

- This app is currently deployed on [Heroku](https://dashboard.heroku.com/).
- I was directly uploaded to Heroku with the vscode terminal as followed:
```bash
  git add .
  git commit -m "My App"
  git push Heroku main 
```
- The app can also be updated at any time within vscode.

- To upload the app's frontend and backend server together, "heroku-postbuild" was used inside the package.json file and the code in app.js line 77.
- The frontend relies on the data that’s loaded from the backend server. That’s why both server need to run simultaneously.

## Deployment

🔗 [Deployed App](https://dogeventplanner.herokuapp.com/)

🔗 [Github](https://github.com/JasonMorta/doggy-event-planner) repo for this application

