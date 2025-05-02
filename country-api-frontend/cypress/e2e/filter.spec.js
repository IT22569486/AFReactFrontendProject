describe('Filter Functionality', () => {
    beforeEach(() => {
      // Visit the countries page with increased timeout
      cy.visit('/countries', { timeout: 30000 });
      // Ensure filter select is loaded
      cy.get('select.form-select').should('be.visible');
    });
  
    it('should display filter results for a valid region', () => {
      // Mock the REST Countries API response for Africa
      cy.intercept('GET', 'https://restcountries.com/v3.1/region/Africa*', {
        statusCode: 200,
        body: [
          {
            name: { common: 'Nigeria' },
            capital: ['Abuja'],
            population: 206139587
          },
          {
            name: { common: 'Kenya' },
            capital: ['Nairobi'],
            population: 53771300
          }
        ]
      }).as('filterRegion');
  
      // Arrange: Select the Africa region
      cy.get('select.form-select').select('Africa');
  
      // Act: Wait for the API response
      cy.wait('@filterRegion', { timeout: 10000 });
  
      // Assert: Verify filter results
      cy.get('.filter-results').should('contain', 'Nigeria');
      cy.get('.filter-results').should('contain', 'Kenya');
      cy.get('.filter-results').find('.country-item').should('have.length', 2);
      cy.screenshot('tc04-filter-results');
    });
  
    it('should display alert for empty region selection', () => {
      // Arrange: Select the empty option
      cy.get('select.form-select').select('');
  
      // Assert: Verify alert is triggered
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Please select a valid region to filter by.');
      });
      cy.get('.filter-results').should('not.exist'); // No results should appear
      cy.screenshot('tc04-filter-empty');
    });
  });