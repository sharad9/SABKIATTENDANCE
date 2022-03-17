

navigator.getUserMedia = (navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia);
 
 var video = document.getElementById('video');
 var show_snap_shot = document.getElementById('show-snap-shot');
 
 var webcamStream = null;
 
 
 function startWebcam() {
	video.style.display = 'block';
	show_snap_shot.style.display = 'none';
 
	if (navigator.getUserMedia) {
	   navigator.getUserMedia(
 
		  // constraints
		  {
			 video: true,
			 audio: false
		  },
 
		  // successCallback
		  function (localMediaStream) {
 
			 video.controls = false;
			 video.srcObject = localMediaStream;
			 webcamStream = localMediaStream;
 
			 webcamStream.stop = function () {
				this.getAudioTracks().forEach(function (track) {
				   track.stop();
				});
				this.getVideoTracks().forEach(function (track) { //in case... :)
				   track.stop();
				});
			 }
 
		  },
		  // errorCallback
		  function (err) {
			 console.log("The following error occured: " + err);
		  }
	   );
	} else {
	   console.log("getUserMedia not supported");
	}
 }
 
 function stopWebcam() {
	webcamStream.stop();
 }
 
 var canvas, ctx;
 
 function init() {
 
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext('2d');
	document.getElementById('startWebCam').addEventListener('click', startWebcam)
	document.getElementById('stopWebCam').addEventListener('click', stopWebcam)
	document.getElementById('find').addEventListener('click', find)
 }
 
 function snapshot() {
 
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	var image = canvas.toDataURL("image/png");
	return image;
 }
 function dataURItoBlob(dataURI) {
	var binary = atob(dataURI.split(',')[1]);
	var array = [];
	for (var i = 0; i < binary.length; i++) {
	   array.push(binary.charCodeAt(i));
	}
	return new Blob([new Uint8Array(array)], { type: 'image/png' });
 }
 /*_________________________________________________________________________________________*/
 
 
 
 
 Promise.all([
	faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
	faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
	faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
 ]).then(start);
 
 var faceMatcher;
 var container = show_snap_shot;
 async function start() {
 
 
	container.innerHTML = null;
	const labeledFaceDescriptors = await loadLabeledImages()
	faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
	console.log('Loaded');
 
 }
 
 async function find() {
 
	container.innerHTML = null;
	container.style.position = 'relative';
	video.style.display = 'none';
	show_snap_shot.style.display = 'block';
	let image;
	let canvas;
 
	image = await faceapi.bufferToImage(dataURItoBlob(snapshot()));
 
	container.append(image);
	canvas = faceapi.createCanvasFromMedia(image);
	container.append(canvas);
 
	const displaySize = { width: image.width, height: image.height };
	faceapi.matchDimensions(canvas, displaySize)
	const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
	const resizedDetections = faceapi.resizeResults(detections, displaySize);
	const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
	results.forEach((result, i) => {
	   const box = resizedDetections[i].detection.box
	   const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
	   drawBox.draw(canvas)
	})
 }
 
 function loadLabeledImages() {
	const labels = ['Sharad'];
	return Promise.all(
	   labels.map(async label => {
		  const descriptions = [];
		  for (let i = 1; i <= 2; i++) {
			 const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/sharad9/Face-reconition/master/labeled_images/${label}/${i}.jpeg`)
 
			 const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
			 descriptions.push(detections.descriptor);
		  }
 
		  return new faceapi.LabeledFaceDescriptors(label, descriptions);
	   })
	)
 }