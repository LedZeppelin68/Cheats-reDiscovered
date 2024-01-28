function generate_password() {

    let _temp = new Array(32);

    for (let i = 0; i < 32; i++) {
        _temp[i] = 0x23;
    }

    let _temp2 = new Array(24);

    let counter = 5;
    let place = 0;

    for (let j = 0; j < 24; j++) {
        for (let i = 7; i >= 0; i--) {
            _temp2[j] |= ((_temp[place] >> counter) & 1) << i;
            counter--;
            if (counter < 0) {
                counter = 5;
                place++;
            }
        }
    }

    let checksum = 0;
    for (let i = 0; i < 23; i++) {
        checksum += _temp2[i];
    }

    _temp2[23] = (-checksum) & 0xff;

    counter = 7;
    place = 0;

    let _temp3 = new Array(32);

    for (let j = 0; j < 32; j++) {
        for (let i = 5; i >= 0; i--) {
            _temp3[j] |= ((_temp2[place] >> counter) & 1) << i;
            counter--;
            if (counter < 0) {
                counter = 7;
                place++;
            }
        }
    }

    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*+";

    let password = "";

    for (let i = 0; i < 32; i++) {
        password += alphabet[_temp3[i]];
    }
}