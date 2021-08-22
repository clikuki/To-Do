const getRandomInt = (min, max) =>
{
	min = Math.ceil(min);
	max = Math.floor(max);

	const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

	return randomInt;
}

const getRandChar = () => chars.charAt(Math.floor(Math.random() * charsLen))

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charsLen = chars.length;
const keylen = {
	min: 10,
	max: 20,
};

export default () =>
{
	const length = getRandomInt(keylen.min, keylen.max);
	const result = Array.from({ length }, () => getRandChar()).join('');

	return result;
};