/// <reference types="Cypress" />

import HomePage from '../../support/pageObjects/HomePage';
import ProductPage from '../../support/pageObjects/ProductPage';
describe('My Second Test Suite', function() {
  before(function() {
      // runs once before all tests in the block
      cy.fixture('example.json').then(function(data) {
        this.data = data 
      })
    })
    it('My FirstTest case', function() { 
      
      const homePage = new HomePage();
      const productPage = new ProductPage();
      
      cy.visit(Cypress.env('url') + 'angularpractice/');
      /* cy.get('input[name="name"]:nth-child(2)').type("Bob");
      cy.get('select').select("Female"); */
      
      /* cy.get('input[name="name"]:nth-child(2)').type(this.data.name);
      cy.get('select').select(this.data.gender);
      cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name);
      cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', '2');
      cy.get('#inlineRadio3').should('be.disabled');
      cy.get(':nth-child(2) > .nav-link').click(); */ //OR WITH USING JAVASCRIPT OBJECT:
      homePage.getEditBox().type(this.data.name);
      homePage.getGender().select(this.data.gender);
      homePage.getTwoWayDataBinding().should('have.value', this.data.name);
      homePage.getEditBox().should('have.attr', 'minlength', '2'); 
      homePage.getEntrepreneaur().should('be.disabled');
      Cypress.config('defaultCommandTimeout', 8000); //WORKS FOR THE ALL COMMANDS BELOW
      homePage.getShopTab().click();

      /* cy.pause(); */ //OR: debag

      /* cy.selectProduct('Blackberry');
      cy.selectProduct('Nokia Edge'); */ //OR: 
      this.data.productName.forEach(function(element) {
        cy.selectProduct(element)
      });
      productPage.checkOutButton().click();
      var sum = 0;
      cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
        cy.log($el.text());
        const amount = $el.text();
        var res = amount.split(" ");//₹. 50000
        res = res[1].trim();
        cy.log(res);
        sum = Number(sum) + Number(res)
      }).then(function(){
          
          cy.log(sum); 
      });
      cy.get('h3 strong').then(function(element) {
        const amount = element.text();
        var res = amount.split(" ");
        var total = res[1].trim();
        expect(Number(total)).to.equal(sum);
      });
      cy.contains('Checkout').click();
      cy.get('#country').type('India');
      cy.get('.suggestions > ul > li > a').click();
      cy.get('#checkbox2').click({force: true});
      cy.get('input[type="submit"]').click();
      /* cy.get('.alert').should('have.text', 
            'Success! Thank you! Your order will be delivered in next few weeks :-).'); */
            //OR (IF YOU ARE NOT SURE ABOUT COMPLETE SIMILARITY OF THE TEXTS, E.G. HIDDEN ELEMENTS):
            cy.get('.alert').then(function(element){
              const actualText = element.text();
              
              expect(actualText.includes("Success")).to.be.true;
            });
    })
     
  })
  