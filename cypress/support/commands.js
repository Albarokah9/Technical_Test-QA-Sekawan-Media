// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('Login', () => {
    cy.fixture('account.json').then((f) => {
        const { username, password } = f.account;
        cy.on('uncaught:exception', () => false);
        cy.visit('/');
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('#kt_login_signin_submit').click();
        cy.get('#kt_quick_user_toggle')
  .should('contain.text', 'Selamat Datang,')
  .and('contain.text', 'Candidate');

        cy.contains('span.menu-text', /^Pemilih Tetap$/) // hanya span yg teksnya persis ini
  .should('be.visible')
  .and('have.text', 'Pemilih Tetap').click();


        //
    //  cy.get('.swal2-confirm').click();
    });
});