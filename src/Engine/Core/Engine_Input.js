var hEngine = hEngine || { };


hEngine.Input = (function() {


    // Previous key state
    var mKeyPreviousState = [];
    // The pressed keys.
    var mIsKeyPressed = [];
    // Click events: once an event is set, it will remain there until polled
    var mIsKeyClicked = [];

    var mPublic = { };
    return mPublic;
}());