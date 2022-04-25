//authenticatedScenarios.spec.js

describe('Scenarios where authentication is a pre-requeriment', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.login()
    it('logs out', {
      tags: '@desktop-and-tablet'
    }, () => {
      cy.visit('/')
      cy.wait(2000)

      /* ==== Test Created with Cypress Studio ==== */
      it('Ramon Test', function () {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.nav > :nth-child(2) > a').click()
        cy.get('#email').should('be.visible')
        /* ==== End Cypress Studio ==== */
      })
    })
  })

  it('CRUDs a note', () => {
    const faker = require('faker')
    const noteDescription = faker.lorem.words(4)

    cy.intercept('GET', '**/notes').as('getNotes')
    cy.login()

    cy.createNote(noteDescription)
    cy.wait('@getNotes')

    const updatedNoteDescription = faker.lorem.words(4)
    const attachFile = true

    cy.editNote(noteDescription, updatedNoteDescription, attachFile)
    cy.wait('@getNotes')

    cy.deleteNote(updatedNoteDescription)
    cy.wait('@getNotes')
  })

  it('successfully submits the form', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')

    cy.fillSettingsFormAndSubmit()

    cy.wait('@getNotes')
    cy.wait('@paymentRequest').then(response => {
      expect(response.state).to.equal('Complete')
    })
  })
})