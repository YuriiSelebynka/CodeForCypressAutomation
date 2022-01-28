/// <reference types="Cypress" />

describe('My First Test Suite', () => {
    it('My FirstTest case', () => {
        cy.request('POST', 'https://216.10.245.166/Library/Addbook.php', {
            "name": "Learn Appium Automation with Java",
            "isbn": "bcdsss",
            "aisle": "22s7",
            "author": "John Foe"
        
    }).then(function (response) {
        expect(response.body).to.have.property("Msg", "successfully added");
        expect(response.status).to.eq(200);
    })
})
});