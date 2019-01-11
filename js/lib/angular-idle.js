/*
 * @author Tushar
 * @version 1.0
 * angular idle library which can be injected in your angular application.
 * This library is used to detect if application is idle.
 */
(function (angular) {
  "use strict";
  angular.module("ngIdle", ["ngIdle.idle"]);

  angular.module("ngIdle.idle", []).provider("idle", function () {
    var options = {
      idle: 1800000, // (default is 30min)
      autoResume: true, // lets events automatically resume (unsets idle state/resets warning)
      interrupt: "mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll",
      isTitleDisabled: false, // disable changes in document's title
      title: "Session has expired",
      autoRefreshTitle: false,
      titleRefreshTimer: 300000 // (default is 5min)
    };

    this.idle = function (seconds) {
      if (seconds <= 0) {
        throw new Error("Idle must be a value in seconds, greater than 0.");
      }

      options.idle = seconds;
    };

    this.titleDisabled = function (value) {
      if (typeof value === "boolean") {
        options.isTitleDisabled = value;
      } else {
        throw new Error("title disable value must be boolean");
      }
    };

    this.interrupt = function (events) {
      options.interrupt = events;
    };

    this.autoResume = function (value) {
      if (typeof value === "boolean") {
        options.autoResume = value;
      } else {
        throw new Error("auto resume value must be boolean");
      }
    };

    this.title = function (value) {
      if (typeof value === "string") {
        options.title = value;
      }
    };

    this.$get = ["$rootScope", "$document", "$timeout", idleProvider];

    function idleProvider($rootScope, $document, $timeout) {
      var state = {
          idle: null,
          isRunning: false
        },
        idleTimer,
        ngip = {
          watch: function () {
            state.isRunning = true;
            clearTimer();
            toggleDocTitle(false);
            idleTimer = $timeout(idleComplete, options.idle);
          },
          unwatch: function () {
            state.isRunning = false;
            toggleDocTitle(false);
            clearTimer();
          },
          destroy: function () {
            toggleDocTitle(false);
            $document.find("body").off(options.interrupt);
          }
        },
        initialDocTitle = $document[0].title;

      // reset timer and start idle time from start
      function resetTimer() {
        if (!state.isRunning) {
          return;
        }

        clearTimer();
        idleTimer = $timeout(idleComplete, options.idle);
      }

      // clear timer
      function clearTimer() {
        $timeout.cancel(idleTimer);
      }

      /*
       * toggle document title
       * @param {boolean} status - change document title based on status
       */
      function toggleDocTitle(status) {
        $document[0].title = status ? options.title : initialDocTitle;
      }

      function refreshTitle() {
        $timeout(function () {
          toggleDocTitle(false);
        }, options.titleRefreshTimer);
      }

      // broadcast event when idle for specified time
      function idleComplete() {
        state.isRunning = false;
        $rootScope.$broadcast("idleComplete");

        // auto resume idle timer
        if (options.autoResume) {
          ngip.watch();
        }

        if (!options.isTitleDisabled) {
          toggleDocTitle(true);
        }

        if (options.autoRefreshTitle) {
          refreshTitle();
        }
      }

      // Adding interrupt listener
      $document.find("body").on(options.interrupt, function () {
        resetTimer();
      });

      return ngip;
    }
  });
}(window.angular));