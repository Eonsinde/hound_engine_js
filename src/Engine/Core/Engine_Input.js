var hEngine = hEngine || { };


hEngine.Input = (function() {
    // Key code constants
    var kKeys = {
        // arrows
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,

        // space bar
        Space: 32,

        // numbers
        Zero: 48,
        One: 49,
        Two: 50,
        Three: 51,
        Four: 52,
        Five : 53,
        Six : 54,
        Seven : 55,
        Eight : 56,
        Nine : 57,

        // Alphabets
        A : 65,
        D : 68,
        E : 69,
        F : 70,
        G : 71,
        I : 73,
        J : 74,
        K : 75,
        L : 76,
        R : 82,
        S : 83,
        W : 87,
        LastKeyCode : 222
    };

    // in Cpp, you can set the size of the array to the lastKeyCode in the above kkeys Enum
    // The following arrays represent the keyboard state
    // Previous key state
    var mKeyPreviousState = [];
    // The pressed keys.
    var mIsKeyPressed = [];
    // Click events: once an event is set, it will remain there until polled
    var mIsKeyClicked = [];

    // Event service functions
    var _onKeyDown = function (event) {
        mIsKeyPressed[event.keyCode] = true; 
    };
    var _onKeyUp = function (event) {
        mIsKeyPressed[event.keyCode] = false;
    };

    var initialize = function () {
        for (var i = 0; i < kKeys.LastKeyCode; i++) { // from 0 - lastKeyCode(222); set it all to false
            mIsKeyPressed[i] = false;
            mKeyPreviousState[i] = false;
            mIsKeyClicked[i] = false;
        }

        // register handlers
        window.addEventListener('keyup', _onKeyUp);
        window.addEventListener('keydown', _onKeyDown);
    };

    var update = function() {
        for (var i = 0; i < kKeys.LastKeyCode; i++) {
            // this helps to detect if a key is clicked or pressed
            /*
                Note on Click: key not in prevState && key is pressed - that implies a click
                example:- not(65: false(prevState)) && 65: true(keyPressed)=true, hence key is just clicked

                Note on Pressed: if key in prevState && key is pressed - that implies a pressing 
                example:- not(65: true(prevState)) && 65: true(keyPressed)=false
            */
            mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i];
            mKeyPreviousState[i] = mIsKeyPressed[i];
        }
    };

    // this functions check to see if a key is pressed or clicked
    var isKeyPressed = function (keyCode) {
        return mIsKeyPressed[keyCode]; };
    var isKeyClicked = function(keyCode) {
        return (mIsKeyClicked[keyCode]);
    };

    var mPublic = { 
        initialize, 
        update,
        isKeyPressed,
        isKeyClicked,
        keys: kKeys
    };

    return mPublic;
}());