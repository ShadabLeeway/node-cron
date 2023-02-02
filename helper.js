const crypto=require('crypto');
const ans =crypto.randomBytes(64).toString("hex");
console.log(ans);