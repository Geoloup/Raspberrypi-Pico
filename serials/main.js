async function serialMain() {
    var port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 /* pick your baud rate */ });
    window.pico = port

    if (port.readable) {
        const encoder = new TextEncoder();
        const writer = port.writable.getWriter();
        save()
        await writer.write(encoder.encode(loadLastReturn()));
        writer.releaseLock();
    }
}
