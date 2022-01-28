/// <reference types="Cypress" />

describe('My Second Test Suite', () => {
    it('My FirstTest case', () => {
      //Handling child windows
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      cy.get('#opentab').then(function(el){
        const url = el.prop('href');
        cy.log(url);
        //CAN NOT USE VISIT METHOD FOR MULTIPLE DOMAINS!
        cy.visit(url);
      });
    })
     
  })
  