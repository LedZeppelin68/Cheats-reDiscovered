function generate_password() {

    let parameters = new Array(8);

    parameters[0] = 0;
    parameters[1] = 8;
    parameters[2] = 0;
    parameters[3] = 0;
    parameters[4] = 0;
    parameters[5] = 23;
    parameters[6] = 1;

    let checksum = 0;

    for (let i = 0; i < 7; i++) {
        checksum += parameters[i];
    }

    parameters[7] = 0x20 - (checksum & 0x1f);

    let alphabet = "ABCDEFGHIJKabcdefghijk0123456789"

    let password = "";

    for (let i = 0; i < 8; i++) {
        password += alphabet[parameters[i]];
    }

    let text = document.getElementById("password");
    text.value = password;
}