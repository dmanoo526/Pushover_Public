[![Build Status](https://travis-ci.com/nyu-software-engineering/nyu-classes-auth-bypass.svg?token=EBigicXppZ4c1shjKFfa&branch=master)](https://travis-ci.com/nyu-software-engineering/nyu-classes-auth-bypass)

## NYU TWO-FACTOR AUTHENTICATION BYPASS


### Bypassing NYU's Two-Factor Authentication System 
------

The aim of this project is to create a solution to bypass the two-factor authentication currently required to access NYU sites. We are currently working on a proof-of-concept where users add a specific number to NYU's list of trusted devices for that user which is dialed(one of the three authentication options) and routes through Twilio to automatically accept the call, play a response, and dial a random number thus granting access to the chosen NYU site without touching a real phone. 

Currently in our solution, the user's local machine executes the script to accept the call once Twilio redirects the request to it and it acts as a temporary "server". In the future, we aim to have the script executed on and Twilio requests forwarded to a dedicated server so the user's local machine is only used to access the NYU site and doesn't need to host the site locally or do anything else.


### Team: Dhanvin(dmanoo526), Austin(austinwu97), Wagner(wagnercolodette), and Justin(jjc750)
&nbsp;

## Project Setup (Running our website locally which enables users to receive new phone numbers that have our script already binded to them on Twilio once they sign up for our service)
------
### Cloning
1. [Go to the repository page](https://github.com/nyu-software-engineering/nyu-classes-auth-bypass.git)
2. Tap "Clone or download"
3. Tap the clipboard icon from the dropdown menu and copy the link

### Terminal
1. Navigate to the directory you wish to clone the repository in
2. Execute `git clone 'repository-link'` where `'repository-link'` is the copied link
- You will be prompted to install git if you do not already have it
- Enter your GitHub credentials if you are prompted for them (your password will not appear as you type it, this a security feature)

### Install Node.js
1. Go to the [Node.js download page](https://nodejs.org/en/download/)
2. Download the appropriate installer for your system

### Install Homebrew (macOS only)
1. Go to the [Homebrew webpage](https://brew.sh/)
2. Install Homebrew

### Install MongoDB
#### macOS
1. Open the Terminal app and type `brew update`
2. Install mongodb by running `brew install mongodb`
3. Create the "db" directory by running `sudo mkdir -p /data/db`
4. Add required permission to "db" directory by running `sudo chown -R ``id -un`` /data/db`

#### Windows
1. Go to the [MongoDB Download Center Webpage](https://www.mongodb.com/download-center/community)
2. Download the appropriate installer for your system, and run it.
3. Follow the steps on this [MongoDB Windows Installation Guide](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514)


### Project setup
1. Run the command `npm install` while in the project folder

### Running the project
1. Open three terminal windows (or three tabs within the same one)
2. Navigate the project directory in each one
3. Run `mongod` in the first
4. Run `mongo` in the second
5. Run `node src/app.js` in the third
6. In your browser type `localhost:9001` to begin using the application

## Using the number acquired from the site (adding the phone number to your NYU account's list of phone numbers so it can be called on sign in to automatically log in)
------

1. Feel free to use numbers we have already purchased as each number incurs a charge on the Twilio account. Reach out to us for a number. 

* Note: Please enter the numbers as listed above. The (+1) is not needed.

2. Click on the link below to access the guide to link your new number to your NYU account: https://www.nyu.edu/life/information-technology/getting-started/netid-and-password/mfa.html

3. Scroll down to the "add additional device" section and follow this guide

4. Make sure to select this new number from the dropdown menu when logging into an NYU site and also select the option to call it as our service uses an automated call responder
