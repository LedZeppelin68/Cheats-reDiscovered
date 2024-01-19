function generate_password() {
    let alphabet = "0123456789BCDFGHJKLMNPQRSTVWXYZ-";
    let xor = [ 0x53, 0x68, 0x65, 0x72, 0x69, 0x43, 0x6F, 0x68, 0x65, 0x6E ];

    let name = document.getElementById("name").value; //ANDREW
    let money = document.getElementById("money").value;// "9999999";

    let multiplier = money.length - 4;
    let digits = money.length;

    if (multiplier < 0) multiplier = 0;
    if (money.length > 5) digits = 5;

    let final_cash = 0;

    for (let i = 0; i < digits; i++) {
        final_cash |= money.charCodeAt(i) - 0x30;
        final_cash <<= 4;
    }
    final_cash |= multiplier;

    let name_array = new Array(8);

    for (let i = 0; i < name.length; i++) {
        name_array[i] = name.charCodeAt(i) - 0x1f;
    }

    let password_array = new Array(10);

    password_array[1] = (final_cash >> 16) & 0xff;
    password_array[2] = (final_cash >> 8) & 0xff;
    password_array[3] = (final_cash >> 0) & 0xff;

    let counter = 5;
    let place = 0;

    for (let i = 4; i < 10; i++)
    {
        for (let j = 7; j >= 0; j--)
        {
            password_array[i] |= ((name_array[place] >> counter) & 1) << j;
            counter--;
            if (counter < 0)
            {
                counter = 5;
                place++;
            }
        }
    }

    let checksum = 0;

    for (let i = 0; i < 10; i++)
    {
        for (let j = 0; j < 8; j++)
        {
            if (((password_array[i] >> j) & 1) === 1)
            {
                checksum++;
            }
        }
    }

    password_array[0] |= checksum & 0x3f;

    for (let i = 0; i < 10; i++)
    {
        password_array[i] ^= xor[i];
    }

    let password_final = new Array(16);

    counter = 4;
    place = 0;

    for (let i = 0; i < 10; i++)
    {
        for (let j = 7; j >= 0; j--)
        {
            password_final[place] |= ((password_array[i] >> j) & 1) << counter;
            counter--;
            if (counter < 0)
            {
                counter = 4;
                place++;
            }
        }
    }

    let pass= "";

    for (let i = 0; i < 16; i++)
    {
        pass += alphabet[password_final[i]];
    }

    let output = document.getElementById("password");
    output.value = pass;
}