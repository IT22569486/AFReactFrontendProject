describe('Sidebar Navigation', () => {
    beforeEach(() => {
      // Visit the homepage with increased timeout
      cy.visit('/', { timeout: 30000 });
      // Ensure sidebar is loaded
      cy.get('aside#sidebar').should('be.visible');
    });
  
    context('When user is not authenticated', () => {
      it('should display sidebar with Register and Login links', () => {
        // Assert: Verify sidebar visibility and unauthenticated links
        cy.get('aside#sidebar').should('be.visible');
        cy.get('aside#sidebar .nav-link').contains('Dashboard').should('be.visible');
        cy.get('aside#sidebar .nav-link').contains('Register').should('be.visible');
        cy.get('aside#sidebar .nav-link').contains('Login').should('be.visible');
        cy.get('aside#sidebar .nav-link').contains('Countries').should('not.exist');
        cy.get('aside#sidebar .nav-link').contains('Profile').should('not.exist');
        cy.get('aside#sidebar button').contains('Logout').should('not.exist');
        cy.screenshot('tc03-sidebar-unauthenticated');
      });
    });
  
    context('When user is authenticated', () => {
      beforeEach(() => {
        // Mock login to simulate authenticated state
        cy.request('POST', 'http://localhost:3000/api/auth/login', {
          email: 'rrr@gmail.com',
          password: '12345678'
        }).then((response) => {
          // Store token in localStorage (assumes AuthContext uses it)
          window.localStorage.setItem('token', response.body.token);
        });
        // Reload homepage to reflect authenticated state
        cy.visit('/', { timeout: 30000 });
        cy.get('aside#sidebar').should('be.visible');
      });
  
      it('should display sidebar with Countries, Profile, and Logout links', () => {
        // Assert: Verify sidebar visibility and authenticated links
        cy.get('aside#sidebar').should('be.visible');
        cy.get('aside#sidebar .nav-link').contains('Dashboard').should('be.visible');
        cy.get('aside#sidebar .nav-link').contains('Countries').should('be.visible');
        cy.get('aside#sidebar .nav-link').contains('Profile').should('be.visible');
        cy.get('aside#sidebar button').contains('Logout').should('be.visible');
        cy.get('aside#sidebar .nav-link').contains('Register').should('not.exist');
        cy.get('aside#sidebar .nav-link').contains('Login').should('not.exist');
        cy.screenshot('tc03-sidebar-authenticated');
      });
    });
  });