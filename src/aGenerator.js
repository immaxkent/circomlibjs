//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// imports
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import buildEddsa from './eddsa.js';

const prv = ''; //insert private key here

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// utility functions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function bigIntArrayToUint8Array(bigintArray) {
    return bigintArray.map(bigint => {
        let hex = bigint.toString(16);
        if (hex.length % 2) {
            hex = '0' + hex;
        }
        const len = hex.length / 2;
        const u8 = new Uint8Array(len);
        var i = 0;
        var j = 0;
        while (i < len) {
            u8[i] = parseInt(hex.slice(j, j+2), 16);
            i += 1;
            j += 2;
        }
        return u8;
    });
}

function bigIntToUint8Array(bigint) {
    let hex = bigint.toString(16);
    if (hex.length % 2) {
        hex = '0' + hex;
    }
    const len = hex.length / 2;
    const u8 = new Uint8Array(len);
    var i = 0;
    var j = 0;
    while (i < len) {
        u8[i] = parseInt(hex.slice(j, j+2), 16);
        i += 1;
        j += 2;
    }
    return u8;
}

function uint8ArrayToString(uint8Array) {
    return uint8Array.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

function uint8ArrayToNumber(uint8Array) {
    let number = 0;
    for (let i = 0; i < uint8Array.length; i++) {
        number = (number * 256) + uint8Array[i];
    }
    return number;
}

function concatUint8Arrays(arrayOfUint8Arrays) {
    let totalLength = arrayOfUint8Arrays.reduce((acc, val) => acc + val.length, 0);
    let result = new Uint8Array(totalLength);
    let offset = 0;
    for(let array of arrayOfUint8Arrays) {
        result.set(array, offset);
        offset += array.length;
    }
    return result;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// core functions
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function generatePubKey () {
    const Eddsa = await buildEddsa();
    const result = Eddsa.prv2pub(prv);
    console.log(result);
}

async function generateSignature () {

    const Eddsa = await buildEddsa();

    //define inputs to create signature here
    const msgArray = [
        1, 
        1687489200,
        0x6738A0F6E68219111189827c87EbCAD653677bAen,
        0n,
        3906n,
        16n,
        0x6738A0F6E68219111189827c87EbCAD653677bAen
    ];
    // const msgArrayStr = msgArray.map(bigInt => bigInt.toString());
    const msg = msgArray.map((item) => {
        // const result = bigIntToUint8Array(item);
        const result = uint8ArrayToNumber(item);
        return result;
    });

    //pass prv and msg to signPoseidon to generate signature here
    const result = await Eddsa.signPoseidon(prv, msg);
    console.log(result);
}

generatePubKey(); //working
generateSignature(); //failing at Eddsa.signPoseidon: creation of buffer seems incorrect. See log outputs
