const fs = require('fs');

// Define the toBase64 function
const toBase64 = async (file) => {
  return new Promise(async(resolve, reject) => {
    const reader = await fs.promises.readFile(file);
    let base64String = '';
    console.log(reader.toString('base64url'));
  });
};

toBase64('./images/Solutions-Architect.-Associate.png')