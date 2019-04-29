# pinger
Decided to create a check for internet since my optimum internet service was going down so much 

I had created a project before using an auth module and thought that would be well used again since there is always a response from the app nexus api.

The plan and code here pings the dev app nexus api and as long as there is a response from their api, we know there is internet service.

If there is no response code at all and it's undefined, we know that there is no internet. 

I use FS to console log the date / time into a file and have a file with the dates and times where the service has gone out. 

