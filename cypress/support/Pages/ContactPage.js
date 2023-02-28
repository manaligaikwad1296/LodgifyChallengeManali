class ContactPage {
  getPageHeader() {
    return cy.get(".ui.header");
  }

  getButton() {
    return cy.get('[data-testid="button"]');
  }

  getNameField() {
    return cy.get('.field input[name="name"]');
  }

  getEmailField() {
    return cy.get('.field input[name="email"]');
  }

  getCommentField() {
    return cy.get('.field textarea[placeholder="Comment"]');
  }

  getLinks() {
    return cy.get(".light.tiny a");
  }
}

export { ContactPage };
