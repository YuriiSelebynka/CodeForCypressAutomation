/// <reference types="Cypress" />

describe('My Second Test Suite', () => {
    it('My FirstTest case', () => {
      //Handling mouse hover
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      //SHOW METHOD SHOULD BE APPLIED ON IMMEDIATE PARENT OF HIDDEN ELEMENT!:
      cy.get('div.mouse-hover-content').invoke('show');
      cy.contains('Top').click();
      cy.url().should('include', 'top');
      //OR (without opening drop-down menu): 
      //cy.get('div.mouse-hover-content').invoke('show');
      cy.contains('Top').click({ force: true});
      cy.url().should('include', 'top');
    })
    
  })
  