import { RentalPage } from "../support/Pages/RentalPage";

describe("Verify Lodgify Rental Workflow", () => {
  let rentalPage = new RentalPage();
  let testdata;

  beforeEach(() => {
    cy.visit("https://npreview-all-properties.lodgify.com/en/first-rental");

    cy.fixture("TestData").then(function (data) {
      testdata = data;
    });
  });

  it("Verify Each section from Rental Page", () => {
    //verify each section displayed
    rentalPage.getRentalSectionHeader().each((section, eq) => {
      cy.wrap(section).should("contain.text", testdata.Rental.section[eq]);
      if (section.text().includes(testdata.Rental.section[eq])) {
        cy.wrap(section).click();
        cy.wrap(section)
          .parent()
          .invoke("attr", "class")
          .should("contain", "item active");
      }
    });
  });

  it("Verify Add Review Button Functionality", () => {
    // rentalPage.getRentalSectionHeader().contains('Reviews').click()
    rentalPage.getAddReviewButton().scrollIntoView().click();

    //verify Clicking on Add Review button the review form displayed
    rentalPage.getAddReviewForm().should("be.visible");

    //fill the data in the all mandatory fields and submit the form
    rentalPage
      .getAddReviewFormNameField()
      .type(testdata.Rental.addReviewFormData.name);
    rentalPage
      .getAddReviewFormTitleField()
      .type(testdata.Rental.addReviewFormData.title);

    rentalPage
      .getAddReviewFormCommentField()
      .type(testdata.Rental.addReviewFormData.comment);
    rentalPage.getRatingField().click({ multiple: true });
    rentalPage
      .getAddReviewFormButton()
      .contains(testdata.Rental.addReviewFormData.button)
      .click();

    //Verify Review submission sucess message
    rentalPage
      .getReviewSucessMsg()
      .contains(testdata.Rental.addReviewFormData.reviewMsg)
      .should("be.visible");
  });

  it("verify Currency dropdown functionality", () => {
    var num = rentalPage.generateRandomInteger(84);

    rentalPage.getRentalSectionHeader().contains("Rates").click();
    cy.get('[data-testid="rates.head.currency-dropdown"]').click();
    rentalPage.getCurrencyFropdownOptions().eq(num).click();
    rentalPage
      .getSelectedCurrencyDropdownValue()
      .should("include.text", testdata.Rental.currency[num]);
    rentalPage
      .getFooterCurrency()
      .should("include.text", testdata.Rental.currency[num]);
  });

  it("Verify Request to book functinality", () => {
    cy.viewport(1280, 720);
    let guest;
    rentalPage.getGuestSelectionTextbox().click();
    rentalPage
      .getGuestSelectionDropdownPlusIcon()
      .click()
      .click()
      .click()
      .click();
    rentalPage.getSelectedGuestOnFirstPage().then((val) => {
      guest = val.text();
    });
    rentalPage.getBookNowButton().click();
    rentalPage
      .getSelectedGuestValue()
      .find("option")
      .find("selected")
      .then((option) => {
        cy.wrap(option).should("be.eq", guest);
      });

    rentalPage.getArrivalDatePickerInput().click();
    //select Arrival date
    cy.selectDate(rentalPage.getDates(), 1);

    //select Departure date
    rentalPage.getDepartureDatePickerInput().click();
    cy.selectDate(rentalPage.getDates(), 6);

    //click on continue button
    rentalPage.getContinueButton().click();
    rentalPage.getBookNowButton().click();
  });
});
