# ComicSite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## How To Run Locally

### 1: Starting Out

First, run ```git clone https://github.com/aspadegit/comic-site.git``` in the folder you'd like to run this program in. 

### 2: Installing NPM and Angular

These steps can be skipped if you already have one installed.

Node and NPM can be installed using the instructions outlined [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Next, if you haven't already, install Angular with NPM using ```npm install -g @angular/cli```, or one of the other commands listed [here](https://angular.dev/installation#instructions).

### 3: Running

Once you have everything installed, navigate to the folder from step 1, and run

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## What About Building?

While you can build and then host the project using ```ng build```, it is not recommended due to a lack of security with the ComicVine API keys. 

If you are interested in building it regardless, I would recommend removing the modal that asks for an API key, and instead storing the key in an environment variable or back-end. 