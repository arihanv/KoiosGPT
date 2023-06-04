import seedrandom from "seedrandom"
function generateRandomStringWithSeed(seed:string, sourceString:string, length:number) {
    const rng = seedrandom(seed)
    let result = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(rng() * sourceString.length)
      result += sourceString.charAt(randomIndex)
    }
    return result
}
export {generateRandomStringWithSeed}
