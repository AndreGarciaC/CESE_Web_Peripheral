const connect_btn = document.getElementById('connect_btn');

connect_btn.addEventListener('click', async () => {
  /*Checks if the user's browser supports the Web Bluetooth API. 
    The navigator.bluetooth property and displays an alert message if the API is not available. 
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