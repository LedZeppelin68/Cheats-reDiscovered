function generate_password() {

    let parameters = new Array(9);

    parameters[0] = document.getElementById("level").value;
    parameters[1] = (document.getElementById("weapon1").value >> 2) & 0xf;
    parameters[2] = (document.getElementById("weapon2").value >> 2) & 0xf;
    parameters[3] = (document.getElementById("weapon3").value >> 2) & 0xf;
    parameters[4] = (document.getElementById("weapon4").value >> 2) & 0xf;
    parameters[5] = (document.getElementById("weapon5").value >> 2) & 0xf;
    parameters[6] = (document.getElementById("weapon6").value >> 2) & 0xf;
    parameters[7] = (document.getElementById("weapon7").value >> 2) & 0xf;
    parameters[8] = document.getElementById("difficulty").value;

    let code = new Array(8);

    code[0] = parameters[0] << 1;

    let counter = 3;
    let place = 1;

    for (let i = 1; i < 7; i++) {
        for (let j = 4; j >= 0; j--) {
            code[i] |= ((parameters[place] >> counter) & 1) << j;
            counter--;
            if (counter < 0) {
                counter = 3;
                place++;
            }
        }
    }

    code[6] |= parameters[8];

    let checksum = 0;

    for(let i = 0; i < 7; i++)
    {
        checksum += code[i] & 0x1f;
    }

    code[7] = checksum & 0x1f;

    let alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUV";

    let password = "";

    for(let i = 0; i < 8; i++)
    {
        password += alphabet[code[i]];
    }

    let text = document.getElementById("password");
    text.value = password;
}