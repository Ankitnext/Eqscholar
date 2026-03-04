import { test, expect } from '@playwright/test';

test('user registration and login flow', async ({ page }) => {
  const testUser = {
    email: `test_e2e_${Date.now()}@example.com`,
    password: 'password123',
    username: `user_${Date.now()}`,
    firstName: 'E2E',
    lastName: 'Test',
  };

  test.step('Navigate to register', async () => {
    await page.goto('http://localhost:3000/auth/register');
    await expect(page.locator('h1:has-text("Create an Account")')).toBeVisible();
  });

  test.step('Fill registration form', async () => {
    await page.fill('input[name="email"]', testUser.email);
    await page.fill('input[name="username"]', testUser.username);
    await page.fill('input[name="password"]', testUser.password);
    await page.fill('input[name="firstName"]', testUser.firstName);
    await page.fill('input[name="lastName"]', testUser.lastName);
    
    // intercept the API request to see if it succeeds
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/api/auth/register') && response.status() === 201
    );
    
    await page.click('button[type="submit"]');
    
    try {
      await responsePromise;
    } catch (e) {
      console.error('Registration API request failed or timed out.');
      // Keep going to see UI error state
    }
  });

  test.step('Verify redirection or successful login', async () => {
    // Wait for either the dashboard, home page, or login page redirection
    await page.waitForURL(/.*(dashboard|login|\/)$/, { timeout: 10000 });
    
    if (page.url().includes('login')) {
      // If redirected to login, perform login
      await page.fill('input[name="email"]', testUser.email);
      await page.fill('input[name="password"]', testUser.password);
      await page.click('button[type="submit"]');
      await page.waitForURL(/.*(dashboard|\/)$/, { timeout: 10000 });
    }
    
    // Check for some indicator of being logged in, e.g. a profile button or logout button
    const isLoggedIn = await page.locator('text=Logout').isVisible() || 
                       await page.locator('text=Dashboard').isVisible();
                       
    expect(isLoggedIn).toBeTruthy();
  });
});
