const ministerTest = artifacts.require("ministerTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ministerTest", function (/* accounts */) {
  it("should assert true", async function () {
    await ministerTest.deployed();
    return assert.isTrue(true);
  });
});
