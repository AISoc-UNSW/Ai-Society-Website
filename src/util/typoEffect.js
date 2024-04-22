export const swapRandomLetters = (word, mistakeChance) => {
    if (Math.random() > mistakeChance) {
        return word; // 90% chance to return the word unchanged.
    }

    let arr = word.split("");
    if (word.length < 2) {
        return word; // Not enough letters to swap.
    }

    // Select two different random indices for swapping letters.
    let index1 = Math.floor(Math.random() * arr.length);
    let index2 = index1 + (Math.random() < 0.5 ? -1 : 1);
    if (index2 < 0 || index2 >= word.length) {
        // Check bounds
        index2 = index1 + 1; // Ensure index2 is valid and adjacent
    }

    // Swap the letters.
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;

    return arr.join("");
};
