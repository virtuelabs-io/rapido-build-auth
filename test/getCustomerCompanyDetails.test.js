const util = require("util");
const lambda = require("../src/customer-company/getCustomerCompanyDetails");
const handler = util.promisify(lambda.fun);

describe(`Testing: getCustomerCompanyDetails`, () => {
    beforeEach(() => {
        process.env.HOST = "localhost";
        process.env.PORT = "3306";
        process.env.DATABASE = "rapido";
        process.env.USERNAME = "root";
        process.env.PASSWORD = "admin";
    });

    test(`The handler exists`, () => {
      expect(handler).toBeTruthy();
    });
  
    test(`Asks for environment variables`, async () => {
        const result = await handler({}, {})
        expect(result).not.toBeNull()
    });
});