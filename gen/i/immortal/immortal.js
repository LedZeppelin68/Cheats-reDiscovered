function generate_password(){

    let input = new Array(13);

    input[4] = document.getElementById("item1").value;
    input[5] = document.getElementById("item2").value;
    input[6] = document.getElementById("item3").value;
    input[7] = document.getElementById("item4").value;
    input[8] = document.getElementById("item5").value;
    input[9] = document.getElementById("item6").value;
    input[10] = document.getElementById("item7").value;
    input[11] = document.getElementById("item8").value;
    input[12] = document.getElementById("item9").value;

    let sum1 = 0xa5;
    let sum2 = 0xd;

    for (let i = 4; i < input.length; i++)
    {
        sum2 += input[i];
        sum2 ^= sum1;

        sum1 += input[i] << 1;
    }

    input[0] = sum2 & 0xf;
    input[1] = (sum2 >> 4) & 0xf;
    input[2] = sum1 & 0xf;
    input[3] = (sum1 >> 4) & 0xf;

    let alphabet = "0123456789abcdef";
    let password = "";

    for(let i = 0; i < input.length; i++)
    {
        password += alphabet[input[i]];
    }

    let text = document.getElementById("password");
    text.value = password;
}