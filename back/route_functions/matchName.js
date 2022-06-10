const stringSimilarity = require("string-similarity");

const matchName = (userName,aadhaarName,panName,enteredFatherName,fetchedFatherName) => {

    userName = userName.toLowerCase();
    aadhaarName = aadhaarName.toLowerCase();
    panName = panName.toLowerCase();
    enteredFatherName = enteredFatherName.toLowerCase();
    fetchedFatherName = fetchedFatherName.toLowerCase();
    
    var aadNameSimilarity = Math.ceil((stringSimilarity.compareTwoStrings(userName,aadhaarName))*100);
    var panNameSimilarity = Math.ceil((stringSimilarity.compareTwoStrings(userName,panName))*100);
    var fatherNameSimilarity = Math.ceil((stringSimilarity.compareTwoStrings(enteredFatherName,fetchedFatherName))*100);

    const match = {
        aadNameMatch: aadNameSimilarity+"%",
        panNameMatch: panNameSimilarity+"%",
        fatherNameMatch: fatherNameSimilarity+"%"
    }
    return match;
};

module.exports = matchName