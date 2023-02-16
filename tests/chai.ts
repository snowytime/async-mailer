import chai from "chai";
import chaiAsPromised from "chai-as-promised";

export const mochaGlobalSetup = () => {
    chai.use(chaiAsPromised);
    chai.config.includeStack = true;
};
