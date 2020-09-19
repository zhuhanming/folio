<!-- markdownlint-disable MD033 MD041 -->
<h1 align="center">Folio</h1>
<p align="center"><em>A Seamless Drag and Drop Portfolio Building Experience</em></p>

<p align="center"><img width="45%" src="docs/images/main.png"/><img width="45%" src="docs/images/portfolio.png"/></p>

Folio is a portfolio builder that helps you to craft a simple yet beautiful portfolio in minutes, through a seamless drag and drop experience. Save your work and immediately get a shareable link to your online portfolio.

Folio was built over a course of 24 hours for the hackathon [Hack&Roll 2020](https://hacknroll.nushackers.org). The team members are:

- [Zhu Hanming](https://www.github.com/zhuhanming)
- [Liu Jia Rui](https://github.com/charoi)
- [Praveen Elango](https://github.com/PraveenElango)
- [Nicholas Toh](https://github.com/nicktohzyu)

> The current maintainer of this project is [Hanming](https://www.github.com/zhuhanming).

The core packages/dependencies used are:

- [react-beautiful-dnd](https://www.github.com/atlassian/react-beautiful-dnd)
- [redux](https://github.com/reduxjs/redux), [react-redux](https://github.com/reduxjs/react-redux), [redux-persist](https://github.com/rt2zz/redux-persist), [redux-toolkit](https://github.com/reduxjs/redux-toolkit)
- [Bulma](https://bulma.io) for the styling

Other packages used for both production and development can be found in [package.json](package.json).

The code for the backend can be found [here](https://github.com/zhuhanming/folio-backend).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br/><br/>
[![Netlify Status](https://api.netlify.com/api/v1/badges/1789072e-fc42-43b8-b345-e1f3a356fe41/deploy-status)](https://app.netlify.com/sites/folio-hnr/deploys)

## Features

With Folio, you can instantly add the following elements to your portfolio:

- Title
- Subtitle
- Description
- Caption
- Message
- Images (up to 3 in a row, automatically resizes)
- URLs
- YouTube Videos
- Code Samples
- SoundCloud Embed

Simply drag and drop it into the middle. It's that easy!

## Project Structure

```bash
folio
├── public/
└── src/
    │   index.js
    │   serviceWorker.js
    ├── app/
    ├── assets/
    ├── components/
    ├── constants/
    ├── contexts/
    ├── reducers/
    ├── routes/
    ├── services/
    └── utils/
```

## Getting Started

If you wish to run this app locally, make sure to clone the backend [here](https://github.com/zhuhanming/folio-backend).

Run the backend on `http://localhost:3001` (or whatever port that suits you). You can do so using the `bundle exec rails s -p 3001` command.

Subsequently, sign up for a [Cloudinary](https://cloudinary.com) account if you wish to upload images via the local app.

Then, edit the `.env` file in the project root to:

```bash
REACT_APP_BACKEND_API="http://localhost:3001"
REACT_APP_CLOUD_NAME=<YOUR CLOUDINARY CLOUD NAME>
REACT_APP_UPLOAD_PRESET=<YOUR CLOUDINARY UPLOAD PRESET>
```

You can read Cloudinary's documentation [here](https://cloudinary.com/documentation/upload_presets) on setting up an upload preset for unsigned uploads.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
