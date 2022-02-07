# Marx

A simple notes making app made using Flask, React, Material-UI and MongoDB.

## Set up Guides

After cloning the app locally, you will to follow the following steps to get running:

### 01. Install dependencies

#### (a) Python

```
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

#### (b) NodeJS

```
$ cd frontend
$ yarn install
```

OR

```
$ cd frontend
$ npm i
```

### 02. Start the flask app

Running this command will initiate the backend server.

```
$ python main.py
```

### 03. Start Webpack server

```
$ cd frontend
$ yarn start
```

> API requests from frontend will automatically get redirected to `http://localhost:5000`. Make sure that this is the right address where flask is running. If its not, then you can manipulate the `proxy` field in `frontend/package.json` to point to the correct address.

### 04. Develop

### 05. Build

```
$ cd frontend
$ yarn build
```

Frontend has been configured to automatically write the build files at `<PROJECT_ROOT>/build` rather than `<PROJECT_ROOT>/frontend/build`. This helps flask easily find the files and serve them as static in production mode.
