/// <reference types="cypress" />
const link = 'http://127.0.0.1:8080'

describe('Pruebas pagina de divisas:', () => {
    before(()=>{
        cy.visit(link)
    })

it('Prueba ingreso de divisa:', () => {
    cy.get('#tipo').type('ARS');
    cy.get('#mostrar').click();
    cy.get('ul').should('have.length',1)
    cy.get('li').should('include.text','ARS');
})

it('Prueba que funcione el mensaje en caso de error con numeros.', () => {
    cy.visit(link)
    cy.get('#tipo').type('123');
    cy.get('#mostrar').click();
    cy.get('p').should('have.text', 'Recuerde que el tipo de moneda SOLO DEBE TENER LETRAS!');
})

it('Prueba que funcione el error cuando se ponen mas o menos de 3 letras:',() => {
    cy.visit(link);
    cy.get('#tipo').type('ABCD');
    cy.get('#mostrar').click();
    cy.get('p').should('have.text', 'Recuerde que el tipo de moneda debe tener 3 letras!');
})

});
