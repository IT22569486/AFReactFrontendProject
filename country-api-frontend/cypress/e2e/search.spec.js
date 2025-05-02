describe('Search Functionality', () => {
    beforeEach(() => {
      // Visit the search page with increased timeout
      cy.visit('/countries', { timeout: 30000 });
      // Ensure search input is loaded
      cy.get('input.form-control').should('be.visible');
    });
  
    it('should display search results for valid query', () => {
      // Mock the REST Countries API response
      cy.intercept('GET', 'https://restcountries.eu/rest/v3.1/name/Canada*', {
        statusCode: 200,
        body: [
          {
            name: 'Canada',
            capital: 'Ottawa',
            population: 37742154
          }
        ]
      }).as('searchCountries');
  
      // Arrange: Enter a valid query
      cy.get('input.form-control').type('Canada');
  
      // Act: Wait for the API response
      cy.wait('@searchCountries', { timeout: 10000 });
  
      // Assert: Verify search results
      cy.get('.search-results').should('contain', 'Canada');
      cy.get('.search-results').find('.country-item').should('have.length', 1);
      cy.screenshot('tc04-search-results');
    });
  });