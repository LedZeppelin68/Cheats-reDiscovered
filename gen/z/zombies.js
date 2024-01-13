function zombies_genpass()
{
	let data_level = [
		[0x10, 0x00],
		[0x08, 0x05],
		[0x02, 0x0D],
		[0x11, 0x07],
		[0x05, 0x06],
		[0x0C, 0x11],
		[0x09, 0x0C],
		[0x14, 0x12],
		[0x03, 0x09],
		[0x0E, 0x10],
		[0x00, 0x0C],
		[0x12, 0x04],
		[0x0F, 0x0B]
	];
	let data_victims = [
		[0x04, 0x07],
		[0x0F, 0x0A],
		[0x0C, 0x12],
		[0x10, 0x09],
		[0x0E, 0x10],
		[0x03, 0x05],
		[0x0D, 0x08],
		[0x08, 0x0C],
		[0x0A, 0x0E],
		[0x06, 0x11]
	];
	
	let alphabet = "YGFVSBQMRKJXNCPTZLDWH";
	
	let data_relative_to_level = [
		[ 0, -2],
		[-2, -1],
		[ 2,  0],
		[ 1,  2],
		[-1, -2],
		[ 2,  2],
		[ 2,  1],
		[ 0,  0],
		[ 1,  1],
		[ 1,  0],
		[-1, -1],
		[ 0, -1],
		[ 0,  1]
	];
	
	var level = document.getElementById("zombies_1").value;
	var victims = document.getElementById("zombies_2").value;
	
	var password = "";

	password += alphabet[data_victims[victims][0] + data_relative_to_level[level][0]];
	password += alphabet[data_level[level][1]];
	password += alphabet[data_level[level][0]];
	password += alphabet[data_victims[victims][1] + data_relative_to_level[level][1]];

	var text = document.getElementById("zombies_3");
	text.value = password;
}
