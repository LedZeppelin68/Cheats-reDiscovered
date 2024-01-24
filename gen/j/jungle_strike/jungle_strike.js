function generate_password() {

    let parameters = new Array(11);

    parameters[0] = parseInt(document.getElementById("level").value);

    let score = parseInt(document.getElementById("score").value);

    for (let i = 5; i >= 1; i--) {
        parameters[i] = score % 10;
        score = (score / 10) >> 0;
    }

    parameters[6] = parseInt(document.getElementById("multiplier").value);

    let copilot = 0x1f;

    copilot -= (document.getElementById("copilot01").checked) ? 1 : 0;
    copilot -= (document.getElementById("copilot02").checked) ? 2 : 0;
    copilot -= (document.getElementById("copilot04").checked) ? 4 : 0;
    copilot -= (document.getElementById("copilot08").checked) ? 8 : 0;
    copilot -= (document.getElementById("copilot10").checked) ? 16 : 0;

    parameters[7] = (copilot / 10) >> 0;
    parameters[8] = copilot % 10;
    parameters[9] = parseInt(document.getElementById("lives").value);

    let alphabet2 = "BCDFGHJKLMNPRSTVWXYZ34679";

    let checksum = 0;

    for (let i = 0; i < 10; i++) {
        checksum += (alphabet2[parameters[i]].charCodeAt(0) - 0x41) & 0xff;
    }

    parameters[10] = checksum % 0x19;

    let alphabet = "3BR9XVWT7NL4S6MHPGCZJFDYK";

    let temp = 0;

    let password = "";

    for (let i = 0; i < parameters.length; i++) {
        temp += parameters[i] + 1;

        password += alphabet[temp % 0x19];
    }

    let text = document.getElementById("password");
    text.value = password;
}