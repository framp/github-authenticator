# GitHub Authenticator

Use this tool to authenticate static apps on GitHub.

The application is hosted on this free instance:
 - [Heroku](https://heroku.com), `https://github-authenticator.herokuapp.com` 
 
Feel free to use it - but it's a free instance and it will temporarily go down if you don't use it (which means the first request may take longer than usual).

You may want to use something better.

## How to:

    URL=https://github-authenticator.herokuapp.com
    #OR
    URL=https://yourownhost.com

#### Create an application
[Create](https://github.com/settings/applications/new) or [open](https://github.com/settings/applications) your application settings on GitHub.

Set `URL/callback/CLIENT_ID` as an `Authorization callback URL`

#### Register your app

    curl URL/apps -d"name=APPNAME&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&callback=http://your-app.com/#{ID}"

#### Update your app

    curl URL/apps -d"_method=PUT&name=APPNAME&client_secret=CLIENT_SECRET" 
    
#### Delete your app

    curl URL/apps -d"_method=DELETE&name=APPNAME&client_secret=CLIENT_SECRET"

#### Inspect your app

    curl "URL/apps/CLIENT_ID?client_secret=CLIENT_SECRET" 
    
#### Redirect your users
Send your user here: `https://github.com/login/oauth/authorize?scope=user:email&client_id=CLIENT_ID`.

The authenticator will redirect to the callback URL saved in the database with `{ID}` replaced with the `access_token`

## Hosting on Heroku:
You'll need `node.js` and the `postgres` cartridge
  
## Why:
I just wanted to build a static app using GitHub authentication.

## License
MIT
