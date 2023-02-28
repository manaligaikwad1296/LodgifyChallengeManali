import { ContactPage } from "../support/Pages/ContactPage";

describe("Verify Lodgify Contact us Workflow", () => {
  let contactPage = new ContactPage();
  let testdata;

  beforeEach(() => {
    cy.visit("https://npreview-all-properties.lodgify.com/en/contact-us");

    cy.fixture("TestData").then(function (data) {
      testdata = data;
    });
  });

  it("Verify Mandatory field error message validation", () => {
    //verify contact us page displayed
    contactPage.getPageHeader().contains(testdata.ContactUs.header);

    //verify Mandatory fields error
    contactPage.getButton().click();
    contactPage
      .getNameField()
      .parent()
      .find("div")
      .invoke("attr", "class", "ui red pointing below label")
      .should("have.text", testdata.ContactUs.nameFieldError);
    contactPage
      .getEmailField()
      .parent()
      .find("div")
      .invoke("attr", "class", "ui red pointing below label")
      .should("have.text", testdata.ContactUs.emailFieldError);
    contactPage
      .getCommentField()
      .parent()
      .find("div")
      .invoke("attr", "class", "ui red pointing below label")
      .should("have.text", testdata.ContactUs.commentFieldError);
  });

  it("Verify Contact us Date picker fields", () => {});

  it("Verify Contact us Page fields and links", () => {
    //verify email field should accept valid email only
    contactPage.getEmailField().type(testdata.ContactUs.invalidEmailData);
    contactPage
      .getEmailField()
      .parent()
      .find("div")
      .invoke("attr", "class", "ui red pointing below label")
      .should("have.text", testdata.ContactUs.invalidEmailError);

    //verify with valid Email there is no error
    contactPage.getEmailField().type(testdata.ContactUs.validEmailData);
    contactPage
      .getEmailField()
      .parent()
      .find("div")
      .invoke("attr", "class", "ui red pointing below label")
      .should("not.be.visible", testdata.ContactUs.invalidEmailError);

    //verify Privacy policy and Terms of service links
    contactPage.getLinks().should("be.visible", testdata.privacyPolicyLink);
    contactPage.getLinks().should("be.visible", testdata.termsOfServiceLink);
  });
});
