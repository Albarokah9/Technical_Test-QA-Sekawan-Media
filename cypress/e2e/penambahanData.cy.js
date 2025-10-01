/// <reference types="cypress" />
import PenambahanPage from '../support/page_objects/penambahanPage';

describe('Penambahan Data Pemilih', () => {
    
    beforeEach(() => {
        cy.Login();
        cy.fixture('data_KKdanNIK').as('dataKKNIK');
    });

    it('TC-PD-001 - Penambahan Data Pemilih Baru dengan Input Data Lengkap', () => {
        cy.get('@dataKKNIK').then(({ valid }) => {
            const { noKK, noNIK } = valid;
        PenambahanPage.klikButtonTambah()
            .assertFormInputPemilih()
            .inputNoKK(noKK)
            .inputNoNIK(noNIK)
            .inputNama()
            .inputAlamat()
            .inputRT()
            .inputRW()
            .searchKelurahan()
            .pilihKelurahan()
            .inputTempatLahir();
        cy.selectDate(
            PenambahanPage.getFieldTanggalLahirSelector(),
            '2002','Apr','9');
        PenambahanPage.piliJenisKelamin()
            .pilihStatusKawin()
            .pilihCaleg()
            .pilihTPS()
            .pilihStatusKawin()
            .pilihStatus()
            .klikButtonSimpan();
    });
});

it('TC-PD-002 - Memverifikasi validasi minimum length pada No. KK dan No. NIK.', () => {
    cy.get('@dataKKNIK').then(({ invalid }) => {
            const { noKK, noNIK } = invalid;
        PenambahanPage.klikButtonTambah()
            .assertFormInputPemilih()
            .inputNoKK(noKK)
            .asserErrorNoKKharus16()
            .inputNoNIK(noNIK) 
    });
});

    afterEach(() => {
        cy.clearCookies();
    });
});
