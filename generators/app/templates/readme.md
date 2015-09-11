## Pre installed dependencies ##
Install Node : https://nodejs.org/
Install Bower: `npm install --global bower` and `npm install --global gulp`
Install git

## Getting strated ##
 1. Download the master version, extract it
 2. Rename to project name
 3. Then open terminal from project dir and run `npm install`, `bower install`. 
 4. Run `gulp serve` to run your app

## Build Task ##
 1. Run `gulp clean` for clean project dir
 2. Run `gulp build`. This will generate production version into 'dist' folder with optimized version.
 3.  After build `gulp serve:server` This will serve build server version.
 4.  After build `gulp serve:client` This will serve build client version.
## Build task Package ##

## config ## 
1. Config task variable, variables located at task/config.json
