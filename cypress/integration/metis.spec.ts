import { MetisPage } from "../pages/metis.page"


const NIKE_TEXT = 'In ancient Greek civilization, Nike was a goddess who personified victory. Her Roman equivalent was Victoria.'
describe('Table of contents', () => {
    // I combined examples A and B here, but I'd understand seperating them into different tests
    it('Has accurate, clickable section titles', () => {
        cy.fixture('base.json').then(fixture => {
            const page = new MetisPage(fixture.baseUrl)
            cy.visit(page.url)
                .then(() => {
                    cy.get(page.tocEntries).then(titles => {
                        for (let i = 0; i < titles.length; i++) {
                            const title = titles[i]
                            let element = cy.get(page.sectionHeader)
                                .contains(title.textContent)
                            element.should('be.visible')
                            title.click()
                            isInViewport(element)
                        }
                    })

                })
        })
    })
    it('Personified concepts has hover text and link', () => {
        cy.fixture('base.json').then(fixture => {
            const page = new MetisPage(fixture.baseUrl)
            cy.visit(page.url)
                .then(() => {
                    cy.get('a').contains("Personified concepts").click()
                        .then(() => {
                            cy.get('a[href="/wiki/Nike_(mythology)"]')
                                .filter(":visible")
                                .contains('Nike')
                                // this should check the pop-up but does not, wikipedia is not picking up the events from cypress
                                // 
                                // .focus() //I can SEE it get focus and still no pop-up shows
                                // .trigger('mouseover')
                                // .realHover()
                                // .then(()=>
                                //  {
                                //     cy.get('.mwe-popups-extract > p')
                                //         .should('be.visible')
                                //         .should(
                                //             'have.text',
                                //             NIKE_TEXT
                                //         )
                                // })
                                // continuing with the rest of the test in the meantime
                                .click()
                                .then(() => {
                                    cy.get('span#Family_tree')
                                    .should('be.visible')
                                })
                            
                        })

                })

        })
    })

})
// For the sake of time I am pulling this from https://github.com/cypress-io/cypress/issues/877#issuecomment-490504922
// cypress is designed to auto scroll for visibilty checks so we have to check the bounding box
// for some reason in commands this does not work. I'm with effort it could but for the 
// sake of time I'm just adding it as a utility funciton here
function isInViewport(element) {
    element.then($el => {
        //@ts-ignore
        const bottom = Cypress.$(cy.state('window')).height()
        const rect = $el[0].getBoundingClientRect()

        expect(rect.top).not.to.be.greaterThan(bottom)
        expect(rect.bottom).not.to.be.greaterThan(bottom)
        expect(rect.top).not.to.be.greaterThan(bottom)
        expect(rect.bottom).not.to.be.greaterThan(bottom)
    })
}
