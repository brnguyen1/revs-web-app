# Rev's Web Application

## What to Download
If you want to work/run the project, you need to install node.js and npm on your device.  Head to https://nodejs.org/en/ to download all the appropriate files for your system.

## Setting up backend and frontend
Make sure you have downloaded all the necessary files to be able to run and work with the source code.

To do this navigate into backend folder and run ```npm install``` to install dependencies

For the frontend navigate into ```frontend/revs-app``` folder and run ```npm install``` to install dependencies
## How to run backend
In order to run the app, you need to be inside the ```backend``` directory

Once inside the directory run ```npm start```

The application will render on localhost:4173 or whatever port is defined in you .env file

## How to Run the Frontend
In order to run the app, you need to be inside the ```frontend/revs-app``` directory.

Once inside the project folder, run the command: ```cd revs-app```


To run the app, run the command: ```npm start```

The application will render on localhost:3000 or a similar port on your computer's default browser.

## Environment Variables
### Backend
This is needed for the backend to connect to the database

Navigate into ```/backend``` to create a ```.env``` file

In the .env file add the following:

```
PSQL_HOST = <database host>
PSQL_USER = <database user>
PSQL_DATABASE = <database name>
PSQL_PASSWORD = <database password>
PSQL_PORT = 5432
```

### Frontend
Navigate into ```/frontend/revs-app``` to create a ```.env``` file

In the .env file add the following:

```
REACT_APP_BACKEND_API = <backend link>
```

The backend api link should be ```http:/localhost:4173/``` for development. 

## Production Link
https://orca-app-j43t2.ondigitalocean.app/
