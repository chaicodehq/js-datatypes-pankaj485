/**
 * 🪪 Aadhaar Number Masker
 *
 * Sharma uncle ka beta naya app bana raha hai jisme Aadhaar number dikhana hai,
 * lekin privacy maintain karni hai. Toh last 4 digits dikhao, baaki sab mask
 * karo "X" se. Format mein dashes bhi hone chahiye: XXXX-XXXX-1234
 *
 * Rules:
 *   - Input ek string honi chahiye exactly 12 digits ki (no spaces, no dashes)
 *   - Pehle 8 digits ko "X" se replace karo
 *   - Last 4 digits as-is rakho
 *   - Output format: "XXXX-XXXX-1234" (dashes after every 4 characters)
 *   - Hint: Use string methods like slice(), repeat(), and length
 *
 * Validation:
 *   - Agar input string nahi hai, return "INVALID"
 *   - Agar string ki length exactly 12 nahi hai, return "INVALID"
 *   - Agar string mein koi non-digit character hai, return "INVALID"
 *
 * @param {string} aadhaarNumber - 12-digit Aadhaar number as string
 * @returns {string} Masked Aadhaar in format "XXXX-XXXX-1234" or "INVALID"
 *
 * @example
 *   maskAadhaar("123456781234")
 *   // => "XXXX-XXXX-1234"
 *
 *   maskAadhaar("9876")
 *   // => "INVALID"
 */
export function maskAadhaar(aadhaarNumber) {
  // Your code here

  if (
    !aadhaarNumber ||
    typeof aadhaarNumber !== "string" ||
    aadhaarNumber.trim().length !== 12
  ) {
    return "INVALID";
  }

  const includesInvalidChars =
    aadhaarNumber.includes("-") || aadhaarNumber.includes(" ");
  const onlyNumsRegex = /^[0-9]+$/.test(aadhaarNumber);

  if (includesInvalidChars || !onlyNumsRegex) {
    return "INVALID";
  }

  const chunkLength = 4;
  const splittedValues = [];
  let chunkCount = 1;

  for (let i = 0; i < 12; i++) {
    let currentChunk = "";

    if ((i + 1) % 4 === 0) {
      if (chunkCount !== chunkLength - 1) {
        splittedValues.push("X".repeat(4));
      } else {
        const start = i - 3;
        const end = i;
        currentChunk = "";

        for (let i = start; i <= end; i++) {
          currentChunk += aadhaarNumber[i];
        }

        splittedValues.push(currentChunk);
      }

      chunkCount++;
    }
  }

  const maskedAaddhar = splittedValues.join("-");
  return maskedAaddhar;
}
