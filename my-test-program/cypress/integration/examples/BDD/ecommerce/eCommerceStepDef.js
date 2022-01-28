/// <reference types="Cypress" />

import HomePage from '../../../../support/pageObjects/HomePage';
import ProductPage from '../../../../support/pageObjects/ProductPage';
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
//node_modules\.bin\cypress run --spec D:\AngularProjects\my-test-program\cypress\integration\examples\BDD\*.feature --headed --browser firefox
//npx cypress-tags run -e TAGS="@Regression" --headed --browser firefox
//add cucumber report options in package.json ->output.json
//use html report plugin /create js file (pass the details of output.json)
//run js file
const homePage = new HomePage();
const productPage = new ProductPage();
//let name = dataTable.rawTable[1][0];

//const url = 'https://rahulshettyacademy.com/angularpractice/'
Given('I open Ecommerce Page', () => {
    cy.visit(Cypress.env('url') + 'angularpractice/');
})
//When I add items to Cart
When('I add items to Cart', function() {
    homePage.getShopTab().click();
    
      this.data.productName.forEach(function(element) {
        cy.selectProduct(element)
      });
      productPage.checkOutButton().click();
})
//And Validate the total prices 
And('Validate the total prices', () => {
    //productPage.checkOutButton().click();
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
})
//Then select the country submit and verify Thankyou
Then('select the country submit and verify Thankyou', () => {
      cy.contains('Checkout').click();
      cy.get('#country').type('India');
      cy.get('.suggestions > ul > li > a').click();
      cy.get('#checkbox2').click({force: true});
      cy.get('input[type="submit"]').click();
      cy.get('.alert').then(function(element){
        const actualText = element.text();
        expect(actualText.includes("Success")).to.be.true;
    });
})

//When I fill the form details
When('I fill the form details', function(dataTable) {
  //[name, gender], [Yurii, male   ]
  name = dataTable.rawTable[1][0];
  homePage.getEditBox().type(dataTable.rawTable[1][0]);
  homePage.getGender().select(dataTable.rawTable[1][1]);
})

//Then validate the forms behaviour
Then('validate the forms behaviour', function(dataTable) {
  /* homePage.getTwoWayDataBinding().should('have.value', name); */ //OR:
  homePage.getTwoWayDataBinding().should('have.value', dataTable.rawTable[1][0]);
  homePage.getEditBox().should('have.attr', 'minlength', '2'); 
  homePage.getEntrepreneaur().should('be.disabled');
  Cypress.config('defaultCommandTimeout', 8000);
})
//And select the Shop Page
And('select the Shop Page', () => {
  homePage.getShopTab().click();
})