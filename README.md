UI-Framework
============

###Dependencies to Install###
- Git
- Node Package Manager
- Grunt
- Bower

**Git Install Instructions**

Download the Git installer from here: [Git download](http://git-scm.com/downloads) Run through the install process.  Make sure Git commands are added globally to your command line interface.  This may present itself in the Git installer as adding to the command line prompt path.  Leave all other choices at their default settings.  Enter the command of ‘Git –-version’ into the command line.  A returning value means that Git was installed properly.

With the command line still open run this script: git config --global url."https://".insteadOf git://  The system will not give feedback if it ran successfully, if you receive no error messages it was completed successfully. 

**NODE.js & NPM (Node Package Manager**

This depends on Git being installed on your box.  Go to http://nodejs.org/ and download the .msi file from Nodejs.  Run this file.  It will setup both NPM and Node on your machine.  On the ‘Custom Setup’ Screen, expand the ‘Add to PATH’ hard drive icon and select ‘Entire feature will be installed on the local hard drive’.  The description on the right will change from 0 of 2 sub features selected to 2 of 2 selected.  Repeat these steps for ‘npm package manager’, and all other hard drive icons.  Enter the command of npm –version into the command line.  A returning value means that Node and Node Package Manager were installed properly. 

*Note:  The command prompt will have to be closed and re-opened in order to confirm node/npm install was successful*

**Grunt**

Open up command line and type in the command of ‘npm install –g grunt’ and let the process run until complete.  After that process is complete run ‘npm install –g grunt-cli’.  Enter the command of grunt –version into the command line.  A returning value means that Grunt was installed properly.

**Bower**

Open up command line and type in the command of 'npm install -g bower' and let the process run until complete. Upon successful completion enter 'bower --version' to confimr that it was installed properly. You should receive a version # in the format of x.x.x back as a response. 

##Grunt File Tasks##

**grunt (default)**

Shows a list of all of the commands including the advanced commands.

**grunt build**

Builds out the bower components/libraries, pulls the branding files from github, copies the files to the correct directories, cleans out unnecessary files, compiles the css file for the first time, and sets the css/js paths for the initial environment. 

**grunt watch**

Watches your scss, markup, and javascript files for changes. When a change is detected three actions can occur depending on the file type saved.
- Scss saves compile the css changes and reload your browser page
- JS saves check for Modernizr changes and create a new version if needed and reload the page
- HTML/Markup changes causes the browser page to refresh

**grunt debug**

Sets up the debug environment paths for CSS and JS files, runs browser sync, and sets up the watch task. Browser sync allows for other devices on the Unum network to see your changes so long as your computer is on the network and powered on. The IP address for this is typically your computer's IP address at port 3000. Browser Sync also multiple browsers to scroll at the same time without having to tell the non-active browser to scroll and will trigger link click throughs on them as well. 

**grunt dev**

Compiles the site.css files and the site.js file.  Also changes the css and js path to point to the non-minified files.  (this task needs to be called at the beginning of each iteration right after a deployment has gone through).  In the application version of the Ui Framework it will also use uncss to remove any unused css styles from your css file.  

**grunt release**

Compiles the production build files of site.min.js and site.min.css.  Changes the css and js paths to point to the minified version of the files.  (this needs to be called at the end of an iteration before your project is deployed to the servers).
