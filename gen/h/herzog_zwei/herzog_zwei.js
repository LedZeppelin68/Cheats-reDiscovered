function generate_password() {

    let parameters = new Array(11);

    parameters[0] = 1;
    parameters[1] = 2;
    parameters[2] = 3;
    parameters[3] = 4;
    parameters[4] = 5;
    parameters[5] = 6;
    parameters[6] = 7;
    parameters[7] = 8;
    parameters[8] = 9;

    let checksum = 0;

    for (let i = 0; i < 9; i++) {
        checksum += parameters[i];
    }

    checksum = ~checksum;

    parameters[9] = (checksum >> 4) & 0xf;
    parameters[10] = checksum & 0xf;

    let password = "";

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < 11; i++) {
        password += alphabet[parameters[i]];
    }

    let text = document.getElementById("password");
    text.value = password;
}