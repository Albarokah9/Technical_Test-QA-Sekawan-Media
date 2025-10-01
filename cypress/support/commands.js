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
// cypress/support/commands.js

import PenambahanPage from '../support/page_objects/penambahanPage'; // Sesuaikan path jika perlu

/**
 * Command: cy.selectDate(fieldSelector, tahun, bulanSingkat, hari)
 * Memilih tanggal di datepicker menggunakan navigasi UI yang kompleks.
 */
Cypress.Commands.add(
    'selectDate',
    (fieldSelector, tahun, bulanSingkat, hari) => {
        // Logika perhitungan berapa kali harus mundur (fleksibel)
        const CURRENT_YEAR = 2025;
        const targetYear = parseInt(tahun);
        const decadeDiff = Math.max(
            0,
            Math.floor((CURRENT_YEAR - targetYear) / 10)
        );

        cy.log(
            `Memilih tanggal ${hari}/${bulanSingkat}/${tahun} via Custom Command`
        );

        // 1. Buka Datepicker
        cy.get(fieldSelector).click();

        // 2. Navigasi ke Tampilan Dekade (Tahun)
        const dpSwitch = PenambahanPage.getDPHeaderSwitchSelector();

        // Perbaikan visibility dan targeting (Hari -> Bulan -> Tahun)
        cy.get('.datepicker-days ' + dpSwitch)
            .should('be.visible')
            .click();
        cy.get('.datepicker-months ' + dpSwitch)
            .should('be.visible')
            .click();

        // 3. Navigasi ke Rentang Tahun
        if (decadeDiff > 0) {
            const dpPrev = PenambahanPage.getDPPrevButtonSelector();
            cy.log(`Mundur ${decadeDiff} kali.`);
            for (let i = 0; i < decadeDiff; i++) {
                cy.get('.datepicker-years ' + dpPrev)
                    .should('be.visible')
                    .click();
            }
        }

        // 4. Pilih Tahun, Bulan, dan Hari
        cy.get(PenambahanPage.getDPYearSelector()).contains(tahun).click();
        cy.get(PenambahanPage.getDPMonthSelector())
            .contains(bulanSingkat)
            .click();
        cy.get(PenambahanPage.getDPDaySelector()).contains(hari).click();

        // 5. Assertion & Bersihkan Fokus
        const expectedValue = `${hari.padStart(2, '0')}${bulanSingkat === 'Apr' ? '04' : ''}${tahun}`;
        cy.get(fieldSelector).should('have.value', expectedValue);
        cy.get('body').click(0, 0);
    }
);
Cypress.Commands.add('Login', () => {
    // Login dengan fixtures data
    cy.fixture('account.json').then((f) => {
        const { username, password } = f.account;
        cy.on('uncaught:exception', () => false);
        // Visit base URL
        cy.visit('/');
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('#kt_login_signin_submit').click();
        // Assertion login
        cy.get('#kt_quick_user_toggle')
            .should('contain.text', 'Selamat Datang,')
            .and('contain.text', 'Candidate');
        // Klik Pemilihan Tetap
        cy.contains('span.menu-text', /^Pemilih Tetap$/) // hanya span yg teksnya persis ini
            .should('be.visible')
            .and('have.text', 'Pemilih Tetap')
            .click();
    });
});
