const routes = require("next-routes")();

routes
  .add("/contracts/:contractAddress", "/contracts/smartwillDetails")
  .add(
    "/contracts/:contractAddress/newBankAccount",
    "/contracts/newBankAccount"
  )
  .add(
    "/contracts/:contractAddress/:bankAccountAddress",
    "/contracts/bankAccountDetails"
  );

module.exports = routes;