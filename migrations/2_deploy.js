const Token = artifacts.require("Token");
const miniBank = artifacts.require("miniBank");

module.exports = async function(deployer){
    // deploy Token 
    await deployer.deploy(Token);

//     //assign token into variable to get its address
//     const token = await Token.deployed()
    
//     //  pass token address for dbank contract(for future minting)
//     await deployer.deploy(miniBank, token.address)

//     // assign dbank contract into variable to get its address
//     const miniBank = await miniBank.deployed()
//     // change tokens owner/minter from deployer to dbank
//     await token.passMiniter(miniBank.address)
};