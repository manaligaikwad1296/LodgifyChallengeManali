class RentalPage {
  getRentalSectionHeader() {
    return cy.get('[data-testid*="horizontalMenu-menu-item"]');
  }

  getAddReviewButton() {
    return cy.get('[data-testid="reviews-add-review-button"]');
  }

  getAddReviewForm() {
    return cy.get('[data-testid="reviews-modal.new-form"]');
  }

  getAddReviewFormNameField() {
    return cy.get('[placeholder="Name"]');
  }

  getAddReviewFormTitleField() {
    return cy.get('[placeholder="Title"]');
  }

  getAddReviewFormCommentField(){
    return cy.get('[placeholder="Comments"]')
  }

  getAddReviewFormButton(){
    return cy.get('[data-testid="button"]')
  }

  getRatingField(){
   return cy.get('.ui.small.rating i')
  }

  getReviewSucessMsg(){
    return cy.get('[data-testid="success-message"]')
  }

  getCurrencyFropdownOptions(){
    return cy.get('[data-testid="rates.head.currency-dropdown"] div[role="option"]')
  }

  generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

getSelectedCurrencyDropdownValue(){
    return cy.get('[class="ui selection dropdown"] [aria-atomic="true"]')
}

getFooterCurrency(){
    return cy.get('[name="currency"] div[aria-atomic="true"]')
}

getGuestSelectionTextbox(){
    return cy.get('.ui.selection.dropdown.counter-dropdown-trigger')
}

getGuestSelectionDropdownPlusIcon(){
    return cy.get('[name="plus"]')
}

getSelectedGuestOnFirstPage(){
    return cy.get('[class="flex-container"] p')
}

getBookNowButton(){
    return cy.get('[data-testid="search-button"]')
}

getSelectedGuestValue(){
    return cy.get('.form-control.select-people option')
}

getContinueButton(){
    return cy.get('[class="btn-actions"] button')
}

getBookNowButton(){
    return cy.get('[data-testid="search-button"]')
}

getArrivalDatePickerInput(){
    return cy.get('#input_arrival')
}

getDates(){
    return cy.get('.ui-datepicker-calendar tr td a')
}

getDepartureDatePickerInput(){
return cy.get('#input_departure')
}

}

export { RentalPage };
