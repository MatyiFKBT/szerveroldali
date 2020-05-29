/*
const add = (a, b) => a + b; //azigen
*/

console.log(11)

/**
 * Multiplies the two numbers passed
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function multiply(a, b) {
    return a * b;
}


/**
 * legyen itt is de nem írom ki (köszi)
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function add(a, b) {
    return a + b;
}
// Objektumként
module.exports = { add, multiply }
    // úgytudom lehetne csak {add, multiply} is, mert a kulcs és a név ugyanaz