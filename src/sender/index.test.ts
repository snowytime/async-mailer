import { SentMessageInfo, Transporter } from "nodemailer";
import sinon from "sinon";
import { EmailError, Mail } from "../types.js";
import { send } from "./index.js";

describe("send", () => {
    let transporter: Transporter<SentMessageInfo>;
    let sendMailStub: sinon.SinonStub;

    beforeEach(() => {
        transporter = { sendMail: sinon.stub() } as unknown as Transporter<SentMessageInfo>;
        sendMailStub = transporter.sendMail as sinon.SinonStub;
    });
    afterEach(() => {
        sendMailStub.reset();
    });
    // normal successful test case
    it("should call the sendmail function", async () => {
        sendMailStub.yields(null, {});
        const mail: Mail = {
            to: "john@me.com",
            subject: "Test email",
            html: "<p>Hello, world!</p>",
        };
        const id = await send({ transporter, options: mail });
        expect(sendMailStub.calledOnce).equals(true);
        expect(sendMailStub.calledWith(mail)).equals(true);
        expect(!!id).equals(true);
    });

    // it("should call sendMail with the correct options", async () => {
    //     // Arrange
    //     sendMailStub.yields(null, {});
    //     options.html = "<p>Hello, world!</p>";

    //     // Act
    //     await send({ transporter, options });

    //     // Assert
    //     expect(sendMailStub.calledOnce).equals(true);
    //     expect(sendMailStub.calledWith(options)).equals(true);
    // });

    // it("should reject with an EmailError if options are missing", async () => {
    //     // Arrange
    //     delete options.html;
    //     delete options.text;

    //     // Act
    //     try {
    //         await send({ transporter, options });
    //     } catch (err) {
    //         // Assert
    //         expect(err).to.be.an.instanceOf(EmailError);
    //         expect((err as EmailError).message).to.equal(
    //             "Missing content -- needs either text or html property",
    //         );
    //         return;
    //     }
    //     throw new Error("Expected send to reject but it resolved");
    // });

    // it("should reject with an EmailError if the sendMail call fails", async () => {
    //     // Arrange
    //     const error = new Error("Failed to send email");
    //     sendMailStub.yields(error);

    //     // Act
    //     try {
    //         await send({ transporter, options });
    //     } catch (err) {
    //         // Assert
    //         expect(err).to.be.an.instanceOf(EmailError);
    //         expect((err as EmailError).message).to.equal(error.message);
    //         return;
    //     }
    //     throw new Error("Expected send to reject but it resolved");
    // });

    // it("should resolve with the info object if the sendMail call succeeds", async () => {
    //     // Arrange
    //     const info = { messageId: "abc123" };
    //     sendMailStub.yields(null, info);

    //     // Act
    //     const result = await send({ transporter, options });

    //     // Assert
    //     expect(result).to.equal(info);
    // });
});
