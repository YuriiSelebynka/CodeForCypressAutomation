Feature: End to end Ecommerce validation

    application Regression
    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce Page
    When I add items to Cart
    And Validate the total prices 
    Then select the country submit and verify Thankyou 

    @Smoke
    Scenario: Filling the form to shop
    Given I open Ecommerce Page
    When I fill the form details
    |name | gender |
    |Yurii| Male   |
    Then validate the forms behaviour
    |name | gender |
    |Yurii| Male   |
    And select the Shop Page