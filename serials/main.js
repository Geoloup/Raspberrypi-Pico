document.addEventListener('DOMContentLoaded', event => {
    (async() => {
      let device
      
      try {
        device = await navigator.usb.requestDevice()
  
        console.log('open')
        await device.open()
        console.log('opened:', device)
      } catch (error) {
        console.log(error)
      }
        await device.close()
    })()
  })