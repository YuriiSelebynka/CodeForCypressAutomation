/// <reference types="Cypress" />

describe('My Second Test Suite', () => {
    it('My FirstTest case', () => {
      //Cypress auto accepts alerts and pop up
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      cy.get('#alertbtn').click();
      cy.get('[value="Confirm"]').click();
      //window:alert
      cy.on('window:alert', (str) => {
        //Mocha
        expect(str).to.equal('Hello , share this practice page and share your knowledge');
      });
      cy.on('window:confirm', (str) => {
        //Mocha
        expect(str).to.equal('Hello , Are you sure you want to confirm?');
      });
      //invoke cypress
      cy.get('#opentab').invoke('removeAttr', 'target').click();

      cy.url().should('include', 'academy');
      cy.go('back');
    
    })
    
  })
  