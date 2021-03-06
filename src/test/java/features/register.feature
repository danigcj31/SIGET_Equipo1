#Author: your.email@your.domain.com
#Keywords Summary :
#Feature: List of scenarios.
#Scenario: Business rule through list of steps with arguments.
#Given: Some precondition step
#When: Some key actions
#Then: To observe outcomes or validation
#And,But: To enumerate more Given,When,Then steps
#Scenario Outline: List of steps for data-driven as an Examples and "placeholder"
#Examples: Container for s table
#Background: List of steps run before each of the scenarios
#""" (Doc Strings)
#| (Data Tables)
#@ (Tags/Labels):To group Scenarios
#"" (placeholder)
#""
## (Comments)
#Sample Feature Definition Template
@tag
Feature: Registrarse

  @tag1
  Scenario: Registro correcto
    Given "nombre","email","password", "confirmacionPassword" y "rol"
    Then Crea un usuario "nombre"
    
  @tag2
  Scenario: Registro con password distintas
    Given "nombre","email","password", "confirmacionPassword" y "rol" distintas
    When "password" y "confirmacionPassword" son distintas
    Then se lanza la excepcion DiferentesContrasenas
