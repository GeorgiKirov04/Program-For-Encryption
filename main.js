function encryption(input) {
  let letters = [];
  for (let i = 0; i < input.length; i++) {
    letters.push(input[i]);
  }
  let resultonepad = onePadEncryption(letters);
  let resultrsa = rsaEncryption(resultonepad);
  let finalresult = binaryAndAsciiEncryption(resultrsa);
  console.log(`To Encrypt: ${input}`);
  console.log(`First stage of encryption: ${resultonepad} `);
  console.log(`Second stage of encryption: ${resultrsa} `);
  console.log(`Encrypted message: ${finalresult} `);
}
function onePadEncryption(letters) {
  let onePadEncryptResult = [];

  for (let i = 0; i < letters.length; i++) {
    if (letters[i].charCodeAt(0) >= 97 && letters[i].charCodeAt(0) <= 122) {
      onePadEncryptResult.push(letters[i].charCodeAt(0) - 96);
    } else if (
      letters[i].charCodeAt(0) >= 65 &&
      letters[i].charCodeAt(0) <= 90
    ) {
      onePadEncryptResult.push(letters[i].charCodeAt(0) - 64);
    }
  }

  for (let k = 0; k < onePadEncryptResult.length; k++) {
    onePadEncryptResult[k] += Math.floor(Math.random() * 100000); //kolkoto poveche kombinacii, tolkova po malko povtoreniq

    if (onePadEncryptResult[k] > 26) {
      while (onePadEncryptResult[k] > 26) {
        onePadEncryptResult[k] -= 26;
      }
    }
  }

  for (let j = 0; j < onePadEncryptResult.length; j += 2) {
    //vsqka nechetna bukva

    onePadEncryptResult[j] += 64;
    onePadEncryptResult[j] = String.fromCharCode(onePadEncryptResult[j]);
  }

  //vsqka chetna bukva
  for (let i = 1; i < onePadEncryptResult.length; i += 2) {
    onePadEncryptResult[i] += 96;
    onePadEncryptResult[i] = String.fromCharCode(onePadEncryptResult[i]);
  }

  return onePadEncryptResult;
}
function rsaEncryption(resultonepad) {
  //////////////////////////////////////////////////////////////////
  let primeNumberP = Math.floor(Math.random() * (10 - 2 + 2)) + 1; //2
  let primeNumberQ = Math.floor(Math.random() * (20 - 11 + 1)) + 11; //11
  let product = primeNumberP * primeNumberQ;
  let fiOfProduct = (primeNumberP - 1) * (primeNumberQ - 1);
  let factors = [];
  let x = [];
  let resultFromOnePadEncrToRSA = [];

  if (fiOfProduct * 2 > product) {
    primeNumberP = Math.floor(Math.random() * (10 - 2 + 2)) + 2;
    primeNumberQ = Math.floor(Math.random() * (20 - 11 + 1)) + 11;
  }

  if (primeNumberP * 2 == primeNumberQ) {
    primeNumberP = Math.floor(Math.random() * (10 - 2 + 2)) + 2;
    primeNumberQ = Math.floor(Math.random() * (20 - 11 + 1)) + 11;
  }

  for (let i = 2; i < primeNumberQ - 1; i++) {
    if ((primeNumberQ - 1) % i == 0) {
      factors.push(i);
    }
  }
  ////////////////////////////////////////////////
  for (let i = 2; i < primeNumberP - 1; i++) {
    if ((primeNumberP - 1) % i == 0 && primeNumberP - 1 != 1) {
      factors.push(i);
    }
  }
  //////////////////////////////////////////////////////////
  for (let i = 2; i < fiOfProduct; i++) {
    x.push(i);
    for (let j = 0; j < factors.length; j++) {
      if (
        i % factors[j] == 0 ||
        factors[j] % i == 0 ||
        i % primeNumberP == 0 ||
        primeNumberP % i == 0 ||
        i % primeNumberQ == 0 ||
        primeNumberQ % i == 0
      ) {
        x.pop(i);
      }
    }
  }
  if (x.length > 1) {
    while (x.length != 1) {
      x.pop();
    }
  }

  //DO TUK E GOTOVO I VSICKO RABOTI. I AZ NE SUM SIGUREN ZASTO. PROSTO RABOTI !

  ///////////////////////////////////////////
  for (let i = 0; i < resultonepad.length; i++) {
    if (resultonepad[i].charCodeAt(0) >= 97 &&resultonepad[i].charCodeAt(0) <= 122) {
      
    
      resultFromOnePadEncrToRSA.push(resultonepad[i].charCodeAt(0) - 96);
    } else if (resultonepad[i].charCodeAt(0) >= 65 && resultonepad[i].charCodeAt(0) <= 90) {

    
      resultFromOnePadEncrToRSA.push(resultonepad[i].charCodeAt(0) - 64);
    }
  }

  let resultFromMathPow = 0;
  let resultFromMathFloor = 0;
  let resultFromPowAndFloor = [];
  //////////////////////////////////////////////////////////////
  for (let i = 0; i < resultFromOnePadEncrToRSA.length; i++) {
    resultFromMathPow = Math.pow(resultFromOnePadEncrToRSA[i], x);
    resultFromMathFloor = Math.floor(resultFromMathPow / product);
    resultFromMathFloor = resultFromMathFloor * product;
    resultFromPowAndFloor.push(resultFromMathPow - resultFromMathFloor);
  }
  ///////////
  for (let i = 0; i < resultFromPowAndFloor.length; i++) {
    if (resultFromPowAndFloor[i] > 26) {
      while (resultFromPowAndFloor[i] > 26) {
        resultFromPowAndFloor[i] -= 26;
      }
    }
    if (resultFromPowAndFloor[i] == 0) {
      resultFromMathFloor[i] = Math.floor(Math.random() * (26 - 1)) + 1;
    }
  }

  for (let j = 0; j < resultFromPowAndFloor.length; j += 2) {
    //vsqka nechetna bukva
    if (resultFromPowAndFloor[j] == 1 || resultFromPowAndFloor[j] == 0) {
      resultFromPowAndFloor[j] = Math.floor(Math.random() * (26 - 1)) + 1;
    }
    resultFromPowAndFloor[j] += 64;

    resultFromPowAndFloor[j] = String.fromCharCode(resultFromPowAndFloor[j]);
  }

  //vsqka chetna bukva
  for (let i = 1; i < resultFromPowAndFloor.length; i += 2) {
    if (resultFromPowAndFloor[i] == 1 || resultFromPowAndFloor[i] == 0) {
      resultFromPowAndFloor[i] = Math.floor(Math.random() * (26 - 1)) + 1;
    }
    resultFromPowAndFloor[i] += 96;

    resultFromPowAndFloor[i] = String.fromCharCode(resultFromPowAndFloor[i]);
  }

  resultonepad = resultFromPowAndFloor;
  return resultonepad;
}
function binaryAndAsciiEncryption(resultrsa) {
  let thirdEncr = [];
  let elFinal = [];

  for (let i = 0; i < resultrsa.length; i++) {
    if (resultrsa[i].charCodeAt(0) >= 97 && resultrsa[i].charCodeAt(0) <= 122) {
      thirdEncr.push(resultrsa[i].charCodeAt(0) - 96);
    } else if (
      resultrsa[i].charCodeAt(0) >= 65 &&
      resultrsa[i].charCodeAt(0) <= 90
    ) {
      thirdEncr.push(resultrsa[i].charCodeAt(0) - 64);
    }
  }

  for (let i = 0; i < thirdEncr.length; i++) {
    elFinal.push(Number(thirdEncr[i]).toString(2));
  }

  resultrsa = elFinal.join("");
  return resultrsa;
}

encryption("Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.");
