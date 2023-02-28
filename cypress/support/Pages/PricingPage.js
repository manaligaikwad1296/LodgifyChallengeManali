class PricingPage {
  getAcceptCookiesButton() {
    return cy.get(".banner-actions-container #onetrust-accept-btn-handler");
  }

  getPricingPlan() {
    return cy.get(".btn-group.row.row-xs li");
  }

  getRentalsRange() {
    return cy.get(".slider-tick-label-container div");
  }

  getSelectedRentalValue() {
    return cy.get("#scroll-prop-plan");
  }

  getRentalPlan() {
    return cy.get(".plan-name");
  }

  getSideButton() {
    return cy.get(".tf-v1-sidetab-button-text");
  }

  getPrice(pricingType) {
    let pricingItem = this.getPricingItem(pricingType);
    if (pricingItem === PricingType.Lite) {
      return pricingItem.get(".total-sum-always");
    }
    return pricingItem.get(".total-sum");
  }

  getCurrencyDropdown() {
    return cy.get(
      ".price-currency-select.form-control.input-sm.form-control-bord-round"
    );
  }

  getGetStartedButton() {
    return cy.get(".span-text");
  }

  getStartedHeader() {
    return cy.get(".container div");
  }
}

export { PricingPage };
