//Constants
const connect_btn = document.getElementById('connect_btn');
const record_btn = document.getElementById('record_btn');
const play_btn = document.getElementById('play_btn');

//Variables
let mediarecorder_obj;
let audios = [];

//BLUETOOTH METHODS
/**
 * This method checks if Web Bluetooth API is supported and if so shows available BLE devices.
 */
connect_btn.addEventListener('click', async () => {
  /*Checks if the user's browser supports the Web Bluetooth API. 
    The navigator.bluetooth property displays an alert message if the API is not available. 
  */
  if (!navigator.bluetooth) {
    alert('Web Bluetooth API not supported!');
    return;
  }

  try {
    //Asks the user to select a BLE device from available devices and waits for their selection */
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['00001801-0000-1000-8000-00805f9b34fb'] }],
      optionalServices: []
    });

    //Connects to BLE device
    console.log('Connected to device:', device);
  } catch (error) {
    console.error('Error connecting to device:', error);
  }
});

//AUDIO METHODS
/**
 * Starts or stops audio recording based on the current state of mediarecorder_obj.
 */
record_btn.addEventListener('click', async () => {
  if (mediarecorder_obj) {
    mediarecorder_obj.stop(); //Stops recording if already started
    mediarecorder_obj = null; //Resets recorder state
    audios = []; //Clears previous audio data
    record_btn.textContent = 'Record Audio'; //Changes button text
    play_btn.disabled = false; //Enables button after stopping recording
    
  } else {
    try {
      //Requests microphone access and create a mediarecorder_obj instance
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediarecorder_obj = new MediaRecorder(stream);

      //Handles audio data availability and update button text
      mediarecorder_obj.ondataavailable = e => audios.push(e.data);
      mediarecorder_obj.start();
      record_btn.textContent = 'Stop Recording';
      play_btn.disabled = true;//Disables buttons while recording
    } catch (error) {
      console.error("Error accessing microphone:", error);
      //Disables button if microphone access fails
      record_btn.disabled = true; 
    }
  }
});


/**
 * Handles playback of recorded audio, if available.
 */
play_btn.addEventListener('click', () => {
  // Checks if audio recording is available to play
  if (audios.length > 0) {
    const audio_blob = new Blob(audios, { type: 'audio/webm' });
    const audio_url = URL.createObjectURL(audio_blob);
    const audio_element = new Audio(audio_url);
    audio_element.play();

    // Disable buttons during playback
    record_btn.disabled = true;
    play_btn.disabled = true;

    audio_element.addEventListener('ended', () => {
      // Enable buttons after playback ends
      record_btn.disabled = false;
      play_btn.disabled = false;
    });


  } else {
    console.warn("No audio recording available to play.");
  }
});