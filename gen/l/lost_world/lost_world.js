function generate_password() {

    let parameters = new Array(8);

    parameters[0] = document.getElementById("parameter1").value;
    parameters[1] = document.getElementById("parameter2").value;
    parameters[2] = document.getElementById("parameter3").value;
    parameters[3] = document.getElementById("parameter4").value;
    parameters[4] = document.getElementById("parameter5").value;
    parameters[5] = document.getElementById("parameter6").value;

    let checksum = 0;

    for (let i = 0; i < 6; i++) {
        checksum ^= parameters[i];
    }

    parameters[6] = checksum & 0x1f;

    let xor = 0;

    for (let i = 0; i < 7; i++) {
        xor -= parameters[i];
    }

    parameters[7] = xor & 0x1f;

    for (let i = 0; i < 7; i++) {
        parameters[i] ^= parameters[7];
    }

    let alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let password = "";

    for (let i = 0; i < 8; i++) {
        password += alphabet[parameters[i]];
    }

    let text = document.getElementById("password");
    text.value = password;
}