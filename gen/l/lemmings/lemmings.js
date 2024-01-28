function generate_password() {

    let parameters = new Array(5);

    parameters[0] = 1;
    parameters[1] = 1;
    parameters[2] = 1;
    parameters[3] = 1;
    parameters[4] = 1;

    let temp = 0;

    temp += parameters[2] * 0x01b9 * 0x01b9;
    temp += parameters[4] * 0x242d;
    temp += parameters[3] * 0x01b9;
    temp += parameters[1] * 0x15;
    temp += parameters[0];

    let bit_swap = [
        [3, 2],
        [2, 1],
        [4, 1],
        [2, 3],
        [4, 5],
        [1, 1],
        [4, 2],
        [4, 9],
        [4, 7],
        [2, 4],
        [4, 6],
        [1, 0],
        [3, 1],
        [4, 3],
        [4, 8],
        [4, 4],
        [2, 2],
        [4, 0],
        [3, 0],
        [1, 2],
        [2, 0]
    ];

    let param = new Array(5);

    for (let i = 0; i < bit_swap.length; i++) {
        if ((temp & 1) === 1) {
            param[bit_swap[i][0]] |= 1 << bit_swap[i][1];
        }
        temp = temp >> 1;
    }

    param[0] = 0;
    param[1] = 5;//difficulty 0-5
    param[2] = 0;//level 0 - 29
    param[3] = 7; // must be 7
    param[4] = 0; //checksum

    let checksum = 0;
    checksum = param[3] << 7;
    checksum = (checksum & 0xff00) + ((checksum + param[1] * param[2] + param[3]) & 0xff);
    //checksum += param[3];

    param[4] = checksum;

    for (let i = 0; i < bit_swap.length; i++) {
        param[0] |= ((param[bit_swap[i][0]] >> bit_swap[i][1]) & 1) << i;
    }

    let code = new Array(5);

    code[0] = param[0] % 0x15;
    param[0] = (param[0] / 0x15) >> 0;
    code[1] = param[0] % 0x15;
    param[0] = (param[0] / 0x15) >> 0;
    code[3] = param[0] % 0x15;
    param[0] = (param[0] / 0x15) >> 0;
    code[4] = param[0] % 0x15;
    param[0] = (param[0] / 0x15) >> 0;
    code[2] = param[0] % 0x15;
    param[0] = (param[0] / 0x15) >> 0;

    let password = "";
    let alphabet = "BCDFGHJKLMNPQRSTVWXYZ";

    for (let i = 0; i < code.length; i++) {
        password += alphabet[code[i]];
    }
}