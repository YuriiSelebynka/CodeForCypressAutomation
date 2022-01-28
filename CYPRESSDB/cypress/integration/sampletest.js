/// <reference types="cypress" />

describe('Logging In - Single Sign on', function () {

    it('can authenticate with cy.request', function () {

        cy.visit("http://localhost:7074/dashboard")
    })
})