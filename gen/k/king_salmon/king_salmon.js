function generate_password() {

    let table1 = [0x10, 0x11, 0x12, 0x06, 0x17, 0x16, 0x14, 0x18, 0x0C, 0x04, 0x13, 0x19, 0x03, 0x1A, 0x0E, 0x07, 0x08, 0x0A, 0x0B, 0x02, 0x0D];

    let parameters = new Array(10);

    let unk1 = 0;
    let unk2 = 0xfde8;
    let unk3 = 0xff;

    parameters[0] = 1;

    let counter = parameters[0];

    parameters[1] = 0 + ++counter;

    parameters[2] = 9 + ++counter;
    parameters[3] = 9 + ++counter;
    parameters[4] = 9 + ++counter;
    parameters[5] = 8 + ++counter;

    parameters[6] = 9 + ++counter;
    parameters[7] = 8 + ++counter;

    let checksum = 0;

    for (let i = 0; i < 8; i++) {
        checksum += table1[parameters[i]];
    }

    parameters[8] = (((checksum >> 4) & 0xf) + ++counter) % 0x15;
    parameters[9] = ((checksum & 0xf) + ++counter) % 0x15;

    let password = "";

    let alphabet = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ-.,' "

    for (let i = 0; i < 10; i++) {
        let j = table1[parameters[i]];
        password += alphabet[j];
    }
}