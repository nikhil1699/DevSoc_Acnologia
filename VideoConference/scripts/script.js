let errfunc = function(err){
    console.log("Error : ", err);
};

let remoteContainer = document.getElementById("remote-container");

//Function to add video stream to video-container.
function addVideoStream(streamID){
    let streamDiv = document.createElement("div");
    streamDiv.id = streamId;                       
    streamDiv.style.transform = "rotateY(180deg)"; 
    remoteContainer.appendChild(streamDiv);
}
//Function to remove video stream from videocontainer
function removeVideoStream(event){

}

//Creating client
let client = AgoraRTC.createClient({
    mode : 'live',
    codec : "h264"
});

//Initializing Client
client.init("3297051f59d6438c9011ed11254b828e", function(){
    console.log("Initialized successfully!");
});

//Joining the client
client.join(null, 'video-demo', null, function(uid){

    let localstream = AgoraRTC.createStream({
        streamID : uid,
        audio : false,
        video : true,
        screen : false
    });

    //Publishing the stream.
    lstream.init(function(){
        lstream.play('me');
        client.publish(lstream, errfunc);

        client.on('stream-added', (event)=>{
            client.subscribe(event.stream,errfunc);
        });

        client.on('stream-subscribed', (event)=>{
            let stream = event.stream;
            addVideoStream(stream.getId());
            stream.play(stream.getId());
        });
        client.on('stream-removed', removeVideoStream);
    },errfunc);

},errfunc);
