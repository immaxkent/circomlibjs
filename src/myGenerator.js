import buildEddsa from './eddsa.js';

const prv = ''; //insert private key here

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// core functions

async function generatePubKey () {
    const Eddsa = await buildEddsa();
    const result = Eddsa.prv2pub(prv);
    return result;
}

async function generateSignature () {
    const Eddsa = await buildEddsa();
    const msgArray = [
        1, 
        1687489200,
        0x6738A0F6E68219111189827c87EbCAD653677bAen,
        0n,
        3906n,
        16n,
        0x6738A0F6E68219111189827c87EbCAD653677bAen
    ];
    const msg = Eddsa.poseidon(msgArray);
    const result = await Eddsa.signPoseidon(prv, msg);
    return result;
}

generatePubKey(); //working
generateSignature(); //failing at Eddsa.signPoseidon: creation of buffer seems incorrect. See log outputs
