#GitHub Authenticator

Use this tool to authenticate static apps on GitHub.

##How to:

####Create an application
[Create](https://github.com/settings/applications/new) or [open](https://github.com/settings/applications) your application settings on GitHub.

Set `http://githubauth-framp.rhcloud.com/callback/CLIENT_ID` as an `Authorization callback URL`

####Register your app

    curl githubauth-framp.rhcloud.com/apps -d"name=APPNAME&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&callback=http://your-app.com/#{ID}"

####Update your app

    curl githubauth-framp.rhcloud.com/apps -d"_method=PUT&name=APPNAME&client_secret=CLIENT_SECRET" 
    
####Delete your app

    curl githubauth-framp.rhcloud.com/apps -d"_method=DELETE&name=APPNAME&client_secret=CLIENT_SECRET"

####Inspect your app

    curl "githubauth-framp.rhcloud.com/apps/CLIENT_ID?client_secret=CLIENT_SECRET" 
    
####Redirect your users
Send your user here: `https://github.com/login/oauth/authorize?scope=user:email&client_id=CLIENT_ID`.

The authenticator will redirect to the callback URL saved in the database with `{ID}` replaced with the `access_token`
    
##Hosting:
This script is being hosted on `http://githubauth-framp.rhcloud.com` using the free service [Openshift](http://openshift.redhat.com).

You'll need `node.js`, `postgres` and some env variables.
  
    OPENSHIFT_POSTGRESQL_DB_DATABASE=database
    OPENSHIFT_POSTGRESQL_DB_USERNAME=username
    OPENSHIFT_POSTGRESQL_DB_PASSWORD=password
    
  
  Feel free to host it somewhere else, it should be pretty trivial.
  
##Why:
I just wanted to build a static app using GitHub authentication.

##License
MIT