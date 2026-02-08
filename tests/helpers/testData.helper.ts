export class TestDataHelper {
  static generateUniqueEmail(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `testuser_${timestamp}_${random}@testmail.com`;
  }

  static generateUsername(): string {
    const timestamp = Date.now();
    return `TestUser${timestamp}`;
  }

  static getTestCredentials() {
    return {
      email: process.env.TEST_USER_EMAIL || 'testuser@example.com',
      password: process.env.TEST_USER_PASSWORD || 'Test@123',
      name: process.env.TEST_USER_NAME || 'Test User'
    };
  }

  static generateTestUser() {
    return {
      name: this.generateUsername(),
      email: this.generateUniqueEmail(),
      password: 'Test@12345',
      title: 'Mr',
      dateOfBirth: {
        day: '15',
        month: '5',
        year: '1990'
      },
      firstName: 'John',
      lastName: 'Doe',
      company: 'Test Company',
      address: '123 Test Street',
      address2: 'Apt 4B',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobileNumber: '+1234567890'
    };
  }
}
