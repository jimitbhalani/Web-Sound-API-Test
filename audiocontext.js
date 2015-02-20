var context;
var request;
var audiobuffer;
var el = document.getElementById("playsound");
var e2 = document.getElementById("stopsound");
var range = document.getElementById("changevolume");
range.value = 50;
var gainNode;
var mysource;

window.onload = function init() {

	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	context = new AudioContext();
	console.log("created new audio context");
	request = new XMLHttpRequest();
	request.open('GET','nirvana.mp3',true);
	request.responseType = 'arraybuffer';

	request.onload = function()
	{
		context.decodeAudioData(request.response,function(buffer)
		{
			audiobuffer = buffer;
		},function(){
			console.log("error");
		});
	}
	request.send();

	if (el.addEventListener)
		el.addEventListener("click", playSound, false);
	else if (el.attachEvent)
		el.attachEvent('onclick', playSound);

	if (e2.addEventListener)
		e2.addEventListener("click", stop, false);
	else if (e2.attachEvent)
		e2.attachEvent('onclick', stop);
	range.addEventListener("change",changeVolume,false)
}

function playSound()
{
	if (!context.createGain)
		context.createGain = context.createGainNode;
	gainNode = context.createGain();
	var source = context.createBufferSource();
	source.buffer = audiobuffer;
	source.connect(gainNode);
	gainNode.connect(context.destination);
	source.loop = true;
	source.start(0);
	mysource = source;
	changeVolume();
	//console.log("playing sound");
}

function changeVolume()
{

 // console.log("element value " +range.value+ " min " +range.min+ " max " +range.max);
 var fraction = parseInt(range.value) / parseInt(range.max);
 gainNode.gain.value = fraction * fraction;
}

function stop() {
  //console.log("stopping sound");
  mysource.stop(0);
};







