/// <reference types="Cypress" />

describe('My First Test Suite', () => {

/*****************************************************************************/    
    it('My FirstTest case', () => {
        // test step
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
      cy.get('.search-keyword').type('ca');
      cy.wait(2000);
      //selenium get hit url in browser, cypress get acts like findElement of selenium
      cy.get('.product').should('have.length',5);
      cy.get('.product:visible').should('have.length',4);
      //Parent child chaining
      cy.get('.products').as('productLocator');
      cy.get('@productLocator').find('.product').should('have.length',4);
      cy.get(':nth-child(3) > .product-action > button').click(); //OR - ideal way:
      cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()
          .then(function(){
            console.log('Ahoj');
          });
      //cy.contains('ADD TO CART'); // - bad syntax 
      console.log('hello');
      cy.get('.products').find('.product').each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text();
          if(textVeg.includes('Cashews')) {
            cy.wrap($el).find('button').click();
          }
      })
      //assert if logo text is corectly displayed
      cy.get('.brand').should('have.text', 'GREENKART');

      // this is to print in logs
      cy.get('.brand').then(function(logoelement){
        cy.log(logoelement.text())
      });
      //DOES NOT WORK:
      // cy.get('.brend').text()
      // cy.log(logo.text())


      //fixture
    })

/*****************************************************************************/     
    it('My SecondTest case', () => {
        // test step
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
      cy.get('.search-keyword').type('ca');
      cy.wait(2000);
      //selenium get hit url in browser, cypress get acts like findElement of selenium
     
      //Parent child chaining
      cy.get('.products').as('productLocator');
      cy.get('@productLocator').find('.product').each(($el, index, $list) => {
        
        const textVeg = $el.find('h4.product-name').text();
          if(textVeg.includes('Cashews')) {
            cy.wrap($el).find('button').click();
          }
      })
      cy.get('.cart-icon > img').click();
      cy.contains('PROCEED TO CHECKOUT').click();
      cy.contains('Place Order').click();


      //fixture
    })

/*****************************************************************************/     
    it('My ThirdTest case', () => {
        //Check boxes
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get('#checkBoxOption1').check().should('be.checked')
            .and('have.value', 'option1');
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
        cy.get('input[type="checkbox"]').check(['option2', 'option3']);
  
        //Static Dropdown
        cy.get('select').select('option2').should('have.value', 'option2');
  
        //Dynamic dropdowns
        cy.get('#autocomplete').type('ind');
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
          if($el.text()==="India") {
            cy.wrap($el).click();
          }
        })
        //autocomplete
        cy.get('#autocomplete').should('have.value', 'India');
        //visible invisible
        cy.get('#displayed-text').should('be.visible');
        cy.get('#hide-textbox').click();
        cy.get('#displayed-text').should('not.be.visible');
        cy.get('#show-textbox').click();
        cy.get('#displayed-text').should('be.visible');
        
        //radio buttons
        cy.get('[value="radio2"]').check().should('be.checked');
      })

/*****************************************************************************/ 
    it('My FourthTest case', () => {
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

/*****************************************************************************/ 
    it('My FifthTest case', () => {
        //Handling Web tables
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
          const text = $el.text();
          if(text.includes("Python")) {
            cy.get('tr td:nth-child(2)').eq(index).next().then(function(price) {
              const priceText = price.text();
              expect(priceText).to.equal('25');
            });
          }
        })
      }) 

/*****************************************************************************/     
    it('My SixthTest case', () => {
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

/*****************************************************************************/ 
    it('My SeventhTest case', () => {
        //Handling child windows
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get('#opentab').then(function(el){
          const url = el.prop('href');
          cy.log(url);
          //CAN NOT USE VISIT METHOD FOR MULTIPLE DOMAINS!
          cy.visit(url);
        });
      })

 /*****************************************************************************/ 
    it('My EigthTest case', () => {
        //Handling frames with Cypress using real time
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.frameLoaded('#courses-iframe');
        cy.iframe().find("a[href*='mentorship']").eq(0).click();
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2);
      })   
      
      before(function() {
        // runs once before all tests in the block
        cy.fixture('example.json').then(function(data) {
          this.data = data 
        })
      })

/*****************************************************************************/ 
    it('My NinthTest case', function() { 
        
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
  