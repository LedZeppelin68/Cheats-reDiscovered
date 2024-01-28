function generate_password() {

    let code = new Array(11);

    code[1] = 1;
    code[2] = 0b1111; // 1 - YAKUTSK, 2 - JAPAN, 4 - AUSTRALIA, 8 - NEW ZEALAND
    code[3] = 0b11111; // 1 - ANTARCTICA, 2 - EGYPT, 4 - KUWAIT, 8 - RUSSIA, 16 - CHINA
    code[4] = 0b11111; // 1 - ARGENTINA, 2 - UNITED KINGDOM, 4 - SCANDINAVIA, 8 - NIGERIA, 16 - SOUTH AFRICA
    code[5] = 0b11111; // 1 - ALASKA, 2 - NORTHERN USA, 4 - EASTERN USA, 8 - PERU, 16 - BRAZIL
    code[6] = 0b11111; // 1 - EUROPE, 2 - CALIFORNIA, 4 - INDIA, 8 - ICELAND, 16 - GREENLAND
    code[7] = 0b11111;
    code[8] = 0b11111;
    code[9] = 0b11111;
    code[10] = 0b11111;

    let checksum = 0;

    for (let i = 1; i < 11; i++) {
        checksum += code[i];
    }

    code[0] = checksum & 0x1f;

    let alphabet = "ABCDEFGHJKLMNPQRSTUWXY0123456789";

    let password = "";

    for (let i = 0; i < 11; i++) {
        password += alphabet[code[i]];
    }
}