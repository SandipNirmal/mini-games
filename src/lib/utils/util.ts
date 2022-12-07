// animal images array
export const imageArr: string[] = [
	'bat',
	'cat',
	'dog',
	'flamingo',
	'leopard',
	'shark',
	'turtle',
	'bear',
	'cheetah',
	'dolphin',
	'fox',
	'lion',
	'sheep',
	'wolf',
	'bee',
	'chicken',
	'dove',
	'frog',
	'monkey',
	'snake',
	'zebra',
	'bird',
	'coala',
	'duck',
	'giraffe',
	'mouse',
	'spider',
	'bug',
	'cow',
	'eagle',
	'gorilla',
	'panda',
	'squirrel',
	'butterfly',
	'crocodile',
	'elephant',
	'horse',
	'parrot',
	'star-fish',
	'camel',
	'dinosaur',
	'fish',
	'kangoroo',
	'penguin',
	'tiger'
];

/**
 * return random images from set of images
 * @param {number} count - number of random items to pick
 * @returns {Array}
 */
export const getRandomImages = (count: number): string[] => {
	const images: string[] = [];
	const totalImages = imageArr.length;

	while (images.length < count && count < totalImages) {
		const randomImg = imageArr[Math.floor(Math.random() * totalImages)];
		if (!images.includes(randomImg)) {
			images.push(randomImg);
		}
	}

	return images;
};

/**
 * Shuffles the array using Fisher–Yates algorithm
 * @param arr
 * @returns
 */
export function shuffle(arr: any[]): any[] {
	return arr;
}
