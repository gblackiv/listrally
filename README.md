# ListRally App
The ListRally App was created to solve the problem of hosting an event and people asking what they can bring. We wanted to create an easy and shareable list, so groups can collaborate on items needed for various occasions.

## Stack
The ListRally App is built with a NodeJS Back-End and a ReactJS Front-End. The Back-End features a mySQL Database with Authentication and Error Report Handling. It also features an PHP Mailer for email notifications of upcoming events.

The Front-End is using Redux which is a Framework that handles state to behave consistently, run in different environments. Along with Redux we also used React Router DOM, Redux Form, Sass and other technologies.

## Setup Instructions
1.  Fork the Repo
2. Clone your forked copy of this repo
3. Install dependencies
	- `npm install`
4. Start dev server from client directory
	 - `npm start`
5. Start the backend server from root directory
	- `node webserver.js`

## Bundle For Deployment
1. Run webpack to bundle files
	- `npm run bundle`

**NOTE:** *After bundling you can not directly run your app locally. You must run your app from the root directory of a server.*
