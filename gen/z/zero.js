function zero_genpass()
{
	let values = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	//values.length = 26;

	values[0] = document.getElementById("character0").checked ? 0b1 : 0;
	values[1] = document.getElementById("character1").checked ? 0b1 : 0;
	values[2] = document.getElementById("character2").checked ? 0b1 : 0;
	values[3] = document.getElementById("character3").checked ? 0b1 : 0;
	values[4] = document.getElementById("character4").checked ? 0b1 : 0;

	values[5] = document.getElementById("item0").checked ? 0b1 : 0;
	values[6] = document.getElementById("item1").checked ? 0b1 : 0;
	values[7] = document.getElementById("item2").checked ? 0b1 : 0;
	values[8] = document.getElementById("item3").checked ? 0b1 : 0;
	values[9] = document.getElementById("item4").checked ? 0b1 : 0;
	values[10] = document.getElementById("item5").checked ? 0b1 : 0;
	values[11] = document.getElementById("item6").checked ? 0b1 : 0;
	values[12] = document.getElementById("item7").checked ? 0b1 : 0;
	values[13] = document.getElementById("item8").checked ? 0b1 : 0;
	values[14] = document.getElementById("item9").checked ? 0b1 : 0;
	values[15] = document.getElementById("item10").checked ? 0b1 : 0;
	values[16] = document.getElementById("item11").checked ? 0b1 : 0;
	values[17] = document.getElementById("item12").checked ? 0b1 : 0;
	values[18] = document.getElementById("item13").checked ? 0b1 : 0;
	
	values[19] = 0b111; //item 0 max
	values[20] = 0b111; //item 1 max
	values[21] = 0b111; //item 2 max
	values[22] = 0b111; //item 3 max
	values[23] = 0b111; //item 4 max
	
	values[24] = 0b111111; //health points max
	
	values[25] = document.getElementById("zero_level").value;
	
	let values_bits = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 6, 6 ];
	
	let alphabet = "xB?DEjGH)JKLMNOPRSTUVQWXYZabefcdhigFk!mnopqrstuvwyAz27453968C/-*";
	
	let bit_shift = [
		0x2E, 0x28, 0x16, 0x05, 0x12, 0x0E, 0x2F, 0x26,
		0x13, 0x1D, 0x06, 0x0F,	0x30, 0x29, 0x27, 0x1E,
		0x07, 0x10, 0x31, 0x2A, 0x25, 0x17, 0x08, 0x11,
		0x22, 0x14, 0x18, 0x1F, 0x09, 0x00, 0x32, 0x2B,
		0x19, 0x20, 0x0A, 0x01,	0x33, 0x23, 0x1A, 0x21,
		0x0B, 0x02, 0x34, 0x2C, 0x15, 0x1B, 0x0C, 0x03,
		0x35, 0x2D, 0x24, 0x1C, 0x0D, 0x04, 0x48, 0xA7
	];
	
	let totalbits = 0;
	
	let password = [ 0, 0, 0, 0, 0, 0, 0 ];
	let passwordshifted = [ 0, 0, 0, 0, 0, 0, 0 ];
	
	for (var j = 0; j < values_bits.length; j++)
	{
		for (var i = 0; i < values_bits[j]; i++)
		{
			password[totalbits >> 3] |= (((values[j] >> i) & 1) << (totalbits & 7));
			totalbits++;
		}
	}
	
	let checksum = 0;
	
	for (var i = 0; i < 46; i++)
	{
		if (((password[i >> 3] >> (i & 7)) & 1) == 1)
		{
			checksum += 1 << (i & 7);
		}
	}
	
	for (var i = 0; i < 8; i++)
	{
		if (((checksum >> i) & 1) == 1)
		{
			password[(i + 46) >> 3] += (1 << ((i + 46) & 7));
		}
	}
	
	for (var i = 0; i < 54; i++)
	{
		if (((password[i >> 3] >> (i & 7)) & 1) == 1)
		{
			passwordshifted[bit_shift[i] >> 3] |= (1 << (bit_shift[i] & 7));
		}
	}
	
	let xor_table = [ 0x69, 0xad, 0x28, 0x6b, 0x95, 0xd9, 0x8b];

	for (var i = 0; i < 7; i++)
	{
		passwordshifted[i] ^= xor_table[i];
	}

	totalbits = 0;

	let password_complete = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	
	for (var j = 0; j < 9; j++)
	{
		for (var i = 0; i < 6; i++)
		{
			password_complete[j] += ((passwordshifted[totalbits >> 3] >> (totalbits & 7)) & 1) << i;
			totalbits++;
		}
	}
	
	let finalpassword = "";

	for(var i = 0; i < 9; i++)
	{
		finalpassword += alphabet[password_complete[i]];
	}

	var text = document.getElementById("zero_pass");
	text.value = finalpassword;
}
