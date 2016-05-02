var playing = false;
var media=null;
var mpic = null;
var timer = null;
var logEvents = false;
var actbtn = null;
var app = {
    // Application Constructor
    initialize: function() {        
        app.logger('initializing'); 
        app.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        app.logger('binding events'); 
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.logger('onDeviceReady called'); 
        app.receivedEvent('deviceready');
        app.initMedia();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        app.logger('Received Event: ' + id);
    },
    initMedia: function(){
        x = new Image();
        x.src = 'assets/img/snl2a.gif';
        app.logger('media initialized');
        var src = "assets/clip.mp3";
        //var src = 'http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3';   
        app.logger(device.platform);
        if(device.platform == "Android"){src = app.getPhoneGapPath() + src;}
        app.logger(src);
        media = new Media(src,app.onMediaSuccess,app.onMediaError,app.onMediaStatus);
        mpic = document.getElementById('switchpic');
        actbtn = document.getElementById('clickplaybtn');
    },
    mediaClick: function(){
        app.logger('mediaClick start');  
        app.logger(media);
        if(!playing){app.playSound();}
        else{app.stopSound();}
        return false;
    },
    playSound: function(){
            app.logger('playSound');
            media.play();
            playing=true;
            app.imgSwap();
            app.logger('img swap timeout commenced');
            timer = setTimeout(app.resetImg,12700);
    },
    stopSound: function(){
            app.logger('stopSound');
            media.stop();
            app.logger('media stopped');
            playing=false;
            app.imgSwap();
            clearTimeout(timer);
    },
    imgSwap: function(){
        var o = Math.abs(window.orientation);
        
        if(playing){
            app.logger('playing images swapped');
            mpic.src="assets/img/snl2a.gif";
            actbtn.src = 'assets/img/stop.png';
        }
        else{
            app.logger('playing images swapped');
            mpic.src="assets/img/snl2b.jpg";  
            actbtn.src = 'assets/img/play.png';          
        }
    },
    resetImg: function(){
        app.logger('image swapped on timeout');
        mpic.src="assets/img/snl2b.jpg";
        actbtn.src = 'assets/img/play.png';
        playing=false;
    },
    logger: function(el){       
        if(logEvents){
            if(!window.console) {console = {log: function() {}}; }
            console.log(el);
        }
    },
    closeApp: function(){   
        mpic.src="assets/img/snl.png";
        media.release();
        document.getElementById('mybutton').innerHTML='';
        document.getElementById('closebtn').innerHTML='<h3>GOODBYE!</h3>';
        var t = setTimeout(app.shutdown,3000);
    },
    shutdown: function(){    
        navigator.app.exitApp();
        return;
    },
    // onSuccess Callback
    onMediaSuccess: function() {
        app.logger("playAudio():Audio Success");
    },
    // onError Callback 
    onMediaError: function(error) {
        app.logger(error);
        playing = false;
        alert('code: '    + error.code    + '\n' + 
              'message: ' + error.message + '\n');
    },
    // onStatus Callback
    onMediaStatus: function(code) {
        app.logger(code);
    },
    getPhoneGapPath: function() {
        var path = window.location.pathname;
        path = path.substr( path, path.length - 10 );
        return path;
        return 'file://' + path;
    }
};