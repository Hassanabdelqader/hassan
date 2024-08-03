/**
 * @jest-environment node
 */
import { POST } from './route';

describe('POST /route', () => {
    
    it('should return data with status 201 and correct email', async () => {
        const randomNumber = Math.floor(Math.random() * 10000000);

        const userObj = {
            email: `asdasdas${randomNumber}@gmail.com`,
            password: "h@gmail.com",
            username: "123"
        };

        const requestObj = {
            json: async () => (userObj),
        } as any;

        const response = await POST(requestObj);
        const statusCode = response.status;
        const body = await response.json();

        expect(statusCode).toBe(201);
        expect(body?.user.email).toBe(userObj.email);
    });

   
    it('should return status 400 when email is missing', async () => {
        const userObj = {
            password: "h@gmail.com",
            username: "123"
        };

        const requestObj = {
            json: async () => (userObj),
        } as any;

        const response = await POST(requestObj);
        const statusCode = response.status;
        const body = await response.json();

        expect(statusCode).toBe(400);  
    });

    it('should return status 400 when username is missing', async () => {
        const randomNumber = Math.floor(Math.random() * 10000000);

        const userObj = {
            email: `asdasdas${randomNumber}@gmail.com`,
            password: "h@gmail.com"
        };

        const requestObj = {
            json: async () => (userObj),
        } as any;

        const response = await POST(requestObj);
        const statusCode = response.status;
        const body = await response.json();

        expect(statusCode).toBe(400);  
    });

    it('should return status 400 when password is missing', async () => {
      const randomNumber = Math.floor(Math.random() * 10000000);

      const userObj = {
          email: `asdasdas${randomNumber}@gmail.com`,
          username: "123"
      };

      const requestObj = {
          json: async () => (userObj),
      } as any;

      const response = await POST(requestObj);
      const statusCode = response.status;
      const body = await response.json();

      expect(statusCode).toBe(400);  
  });

});
