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

*Note:  some CMD windows will have to be closed and re-opened in order to confirm node/npm install was successful*

**Grunt**

Open up command line and type in the command of ‘npm install –g grunt’ and let the process run until complete.  After that process is complete run ‘npm install –g grunt-cli’.  Enter the command of grunt –version into the command line.  A returning value means that Grunt was installed properly.

**Bower**

Open up command line and type in the command of 'npm install -g bower' and let the process run until complete. Upon successful completion enter 'bower --version' to confimr that it was installed properly. You should receive a version # in the format of x.x.x back as a response. 
