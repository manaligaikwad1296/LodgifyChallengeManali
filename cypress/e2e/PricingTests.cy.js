const { PricingPage } = require("../support/Pages/PricingPage");

describe("Verify Lodgify Pricing Workflow", () => {
  let page = new PricingPage();
  let testdata;

  beforeEach(() => {
    cy.visit("https://www.lodgify.com/pricing/");
    page.getAcceptCookiesButton().click();

    cy.fixture("TestData").then(function (data) {
      testdata = data;
    });
  });

  it("Verify Monthly pricing plan workflow", () => {
    //verify the page title
    cy.title().should("eq", testdata.Pricing.title);

    //click on the monthly pricing plan option
    page.getPricingPlan().contains(testdata.RentalValues.monthly).click();

    //select Rental range 50
    page.getRentalsRange().contains("50").click({ force: true });

    //verify Rental range 50 is selected correctly
    page.getSelectedRentalValue().should("have.value", "50");

    //verify default values for the Rentals for all plan
    page.getRentalPlan().each((plan) => {
      if (plan.text().includes("Starter")) {
        cy.wrap(plan)
          .parent()
          .find("div")
          .find("span")
          .should("include.text", testdata.RentalValues.USD.starter);
      } else if (plan.text().includes("Professional")) {
        cy.wrap(plan)
          .parent()
          .find("div")
          .find("span")
          .should("include.text", testdata.RentalValues.USD.professional);
      } else if (plan.text().includes("Ultimate")) {
        cy.wrap(plan)
          .parent()
          .find("div")
          .find("span")
          .should("contain.text", testdata.RentalValues.USD.ultimate);
      }
    });

    //verify help me to pick up plan side button
    page.getSideButton().contains("Help me pick a plan").should("be.visible");

    //select other Currency
    page.getCurrencyDropdown().select(0);

    //verify Euro is selected
    page
      .getCurrencyDropdown()
      .find("option")
      .first()
      .should("have.text", testdata.Pricing.EUR);

    //verify Professional has Most Popular tag on it
    page
      .getRentalPlan()
      .parent()
      .parent()
      .invoke(
        "attr",
        "data-price-item-popular",
        testdata.RentalValues.mostPopular
      )
      .should("be.visible");
  });

  it("Verify Get statred workflow", () => {
    // page.getGetStartedButton().click()
    page
      .getGetStartedButton()
      .contains(testdata.GetStarted.getStarted)
      .parent()
      .invoke("removeAttr", "onclick")
      .click();

    //verify Get Started page is displayed
    page.getStartedHeader().then((el) => {
      el.text().trim().includes(testdata.GetStarted.getStarted);
    });
  });
});
