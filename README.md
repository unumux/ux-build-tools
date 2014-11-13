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

<<<<<<< HEAD
Open up command line and type in the command of 'npm install -g bower' and let the process run until complete. Upon successful completion enter 'bower --version' to confimr that it was installed properly. You should receive a version # in the format of x.x.x back as a response. 
=======
Open up command line and type in the command of 'npm install -g bower' and let the process run until complete. Upon successful completion enter 'bower --version' to confirm that it was installed properly. You should receive a version # in the format of x.x.x back as a response. 

**UI Framework (this)**

Open up command line and type:
**Please note it is highly reccommended that you use the yeoman generator as instead at it sets up dependencies and files for you. More information can be found on the [generator repo](https://github.com/unumux/generator-unumux).**

```
npm i -D unumux/ui-framework 
```

This will install the UI Framework files and all of the dependencies required to use it. To begin using it on a new project (if you didn't use the Yeoman generator), create a Gruntfile.js in your project root and put the following in it:

```
module.exports = function(grunt) {

  grunt.loadNpmTasks('uiFramework');

}
```

This will set up the framework with default paths. To learn more about configuring options, read more in the wiki.
>>>>>>> develop

##Grunt File Tasks##

**grunt (default)**

Shows a list of all of the commands including the advanced commands.

**grunt watch**

Watches your scss, markup, and javascript files for changes. When a change is detected three actions can occur depending on the file type saved.
- Scss saves compile the css changes and reload your browser page
- JS saves check for Modernizr changes and create a new version if needed and reload the page
- HTML/Markup changes causes the browser page to refresh

**grunt debug**

Sets up the debug environment paths for CSS and JS files, imports bower components into the main scss file, implements sass immports, runs browser sync, and sets up the watch task. Browser sync allows for other devices on the Unum network to see your changes so long as your computer is on the network and powered on. The IP address for this is typically your computer's IP address at port 3000. Browser Sync also multiple browsers to scroll at the same time without having to tell the non-active browser to scroll and will trigger link click throughs on them as well. 

**grunt dev**

Compiles the site.css files and the site.js file.  Also changes the css and js path to point to the non-minified files.  (this task needs to be called at the end of an iteration/sprint before a deployment).  This also runs autoprefixer and uncss to preen your css and to add browser prefixes to css properties.  

**grunt release**

Compiles the production build files of site.min.js and site.min.css.  Changes the css and js paths to point to the minified version of the files.  (this needs to be called at the end of an iteration before your project is deployed to the servers). This also runs autoprefixer and uncss to preen your css and to add browser prefixes to css properties.  

More in-depth information about the UI-Framework and its commands can be found on the [wiki page](https://github.com/unumux/UI-Framework/wiki). 
