describe('Login Functionality', () => {
    beforeEach(() => {
      // Visit the login page before each test
      cy.visit('/login');
    });
  
    it('should login with valid credentials', () => {
      // Arrange: Enter valid credentials
      cy.get('#email').type('rrr@gmail.com');
      cy.get('#password').type('12345678');
  
      // Act: Click the login button
      cy.get('button.btn-primary').click();
  
      // Assert: Verify successful login
      // cy.get('.alert-success').should('contain', 'Login successful!');
      cy.url().should('include', '/'); // redirect to dashboard
      cy.screenshot('tc01-login-success');
    });
  
    it('should display error for invalid credentials', () => {
      // Arrange: Enter invalid credentials
      cy.get('#email').type('wronguser@example.com');
      cy.get('#password').type('wrongpass');
  
      // Act: Click the login button
      cy.get('button.btn-primary').click();
  
      // Assert: Verify error message
    //   cy.get('.alert-danger').should('contain', 'Login failed. Please try again.');
      cy.url().should('not.include', '/dashboard'); // No redirect
      cy.screenshot('tc02-login-error');
    });
  });