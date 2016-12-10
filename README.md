# Angular_idle #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary - This library is use to determine the whether application is idle or not and to perform
required operation if idle for some-time
* Version 1.0


### How do I get set up? ###

* Summary of set up
For basic configuration setup just look at the example.

* Configuration
In angular config can perform following configuration setting. Just have to inject idleProvider to get working.

1: Setting idle timer:
This is used to set the idle timer for which the application will get idle complete event
idleProvider.idle( *specify time in ms* )
The input should be in integer.
eg- idleProvider.idle( 60000 ) this specify idle time of 1 min
Default time is 30 min

2: Auto resume:
Based on this the idle timer will resume
idleProvider.autoResume( *boolean* )
By default auto resume is true

3: Select interrupt:
Interrupt are the event for which you want to reset the idle timer
idleProvider.interrupt( *string* )
eg- interrupt: 'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll'

4: Disable Title change:
This will change the title of the application when application is idle.
idleProvider.titleDisabled( *boolean* )
If this is set to true document's title change will be disabled.
By default it is set to false

5: Document title on idle:
This is used to change the document title based on your choice of text
idleProvider.title( *string* )


* Dependencies
Require Angular.js version 1.X


* Methods

1: watch:
Watch is used to initialize the idle timer

2: unwatch:
This is used to cancel the currently running timer

3: Destroy:
This is used to destroy the event whic is used to reset the idle timer.
If you call destroy none of the functionality will work as the event itself is destroyed.

4: event "idleComplete"
Have to apply event listener i.e. $rootScope.$on('idleComplete', function () {}) to perform your operations.
This is broadcast when application is idle for specified time.

Note:
If auto resume is disabled then to reinitialize the idle timer you have to call "start" explicitly

