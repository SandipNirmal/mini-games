// animal images array
export const imageArr = [
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
 * @param {Array} arr - array to shuffle
 * @returns {Array} - shuffled array
 */
export function shuffle(arr: any[]): any[] {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    const j = Math.floor(Math.random() * len);

    const val = arr[i];
    arr[i] = arr[j];
    arr[j] = val;
  }

  return arr;
}
