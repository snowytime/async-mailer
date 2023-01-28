import { SentMessageInfo, Transporter } from "nodemailer";
import sinon from "sinon";
import { verify } from "./index.js";

describe("Testing the nodemailer verify function", () => {
    let transporter: Transporter<SentMessageInfo>;
    let verifyStub: sinon.SinonStub;

    beforeEach(() => {
        transporter = { verify: sinon.stub() } as unknown as Transporter<SentMessageInfo>;
        verifyStub = transporter.verify as sinon.SinonStub;
    });
    afterEach(() => {
        verifyStub.reset();
    });
    it("should return a promise", async () => {
        // Arrange
        const success = "Server is ready";
        verifyStub.yields(null, success);

        // Act
        const result = await verify(transporter);

        // Assert
        expect(verifyStub.calledOnce).equals(true);
        expect(result).to.equal(success);
    });
    it("should return a failure", async () => {
        // Arrange
        const error = new Error("Server error");
        verifyStub.yields(error);

        // Act
        try {
            await verify(transporter);
        } catch (err) {
            // Assert
            expect(verifyStub.calledOnce).equals(true);
            expect(err).to.equal(error);
        }
    });
});
