async function serialMain() {
var ports = await navigator.serial.getPorts();
if (ports == []) {
    var port = await navigator.serial.requestPort();
}
await port.open({ baudRate: 9600 /* pick your baud rate */ });

if (port.readable) {
    const reader = port.readable.getReader();
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                // |reader| has been canceled.
                break;
            }
            // Do something with |value|…
        }
    } catch (error) {
        // Handle |error|…
    } finally {
        reader.releaseLock();
    }
    const encoder = new TextEncoder();
    const writer = port.writable.getWriter();
    save()
    await writer.write(encoder.encode(loadLastReturn()));
    writer.releaseLock();
}
}
serialMain()