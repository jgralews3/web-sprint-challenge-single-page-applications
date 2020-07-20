describe("form test", ()=>{
    it("testing pizza inputs", ()=>{
        cy.visit("/")

        cy.get('button')
        .click()
        
        cy.get('[for=name]>input')
        .type("Joshua")
        .should('have.value', 'Joshua')

        cy.get('[for=size]>select')
        .select('Medium')
        .should('have.value', 'Medium')

        cy.get ('input#pep')
        .click()
        .should('have.checked', 'true')

        cy.get ('input#corn')
        .click()
        .should('have.checked', 'true')

        cy.get ('[for=specs]>input')
        .type ('No Sauce')
        .should('have.value', 'No Sauce')

        cy.get('button')
        .click()

        cy.get('p#outputname')
        .contains('Joshua')
    })
})
