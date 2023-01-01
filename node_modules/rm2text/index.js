'use strict';

const RM_REGEX = /^\s*(?:(?:RM|MYR))?\s*([0-9,]+)(?:[.]([0-9]+))?\s*$/i;
const RM_NUM = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'lapan', 'sembilan', 'sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'lapan belas', 'sembilan belas'];
const RM_BASE = {10: 'puluh', 100: 'ratus', 1000: 'ribu', 10000: 'juta'};
const RM_SWAP = {'satu ratus': 'seratus', 'satu ribu': 'seribu', 'satu juta': 'sejuta'};
function toRMText(amount = '', silent = false){
    amount = String(amount);
    let match = amount.match(RM_REGEX);
    if(match !== null){
        let [ignore, ringgit = 0, sen = 0] = match;
        ringgit = Number(removeComma(ringgit));
        sen = Number(sen);
        return convert(ringgit) + ' ringgit' + ((sen === 0) ? '' : (' ' + convert(sen) + ' sen'));
    }else{
        if(silent) return undefined
        throw new Error(`Unknown format: ${amount}`);
    }
}

function convert(amount){
    let part = [];
    let ribu = true;
    let text = '';
    while(amount > 0){
        let small = amount % 1000;
        part.push((small < 20) ? convertBelowTwenty(small) : convertAboveTwenty(small));
        amount = (amount - small) / 1000;
    }
    text = part[0];
    for(var i=1; i<part.length; i++){
        if(part[i] !== '')
            text = part[i] + ((i%2===0) ? ' juta' : ' ribu') + ((text === '') ? '' : (' ' + text));
    }
    return replaceWord(text);
}


/**
 * Convert number below twenty to their written form
 * @param {Number} amount The amount to convert
 * @return {String} written The written form of amount
 */
function convertAboveTwenty(amount){
    var replaced = padZero(amount, 3).replace(/^([0-9])([0-9])([0-9])$/, '$1 ratus $2 puluh $3');
    replaced = replaced.replace(/(0 ratus|0 puluh) /g, '');
    replaced = replaced.replace(/ 0/g, '');
    replaced = replaced.replace(/[0-9]/g, value => {
        return RM_NUM[Number(value)];
    });
    return replaced;
}


/**
 * Convert number above twenty to their written form
 * @param {Number} amount The amount to convert
 * @return {String} written The written form of amount
 */
function convertBelowTwenty(amount){
    return RM_NUM[amount];
}

function removeComma(text){
    return text.replace(/[,]/g, '');
}

function padZero(amount, n){
    let len = String(amount).length;
    let result = '';
    for(var i=n-len; i>0; i--){
        result += '0';
    }
    return result + amount;
}

/**
 * Replace string to more readable string
 * @param string text
 * @return string more readable
 */
function replaceWord(text){
    for(let find in RM_SWAP){
        text = text.replace(new RegExp(find, 'g'), RM_SWAP[find]);
    }
    return text;
}

module.exports = toRMText;
