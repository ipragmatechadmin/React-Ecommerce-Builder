const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');
const bcrypt = require("bcrypt-nodejs");

describe('API :: get /api/shipping/', () => {
    let cookie;
    context('Get the shipping Address for loggedin user', () => {
      beforeEach(async function() {
        const signup = await request()
          .post('/api/signup')
          .send({
            name: 'New User',
            email: 'test@ipragmatech.com',
            password: '123456'
          }).catch(error =>{
            //We can ignore the duplicate exception
          });
        const {  header } = await request()
          .post(`/api/login`)
          .send({
            email: 'test@ipragmatech.com',
            password:'123456'
          }).expect(200);
          cookie = header['set-cookie'];
          const updateShippings = await request()
            .post('/api/shipping')
            .set('cookie', cookie)
            .send({
                "address1": "19, FF, East Avenue Market",
                "address2": "East Punjabi Bagh",
                "city": "New Delhi",
                "region": "Delhi",
                "postalCode": "110026",
                "country": "India",
                "shippingRegionId": 4
            });
      });
      it('Returns 200 with the shipping Address', async () => {
          const {body} = await request()
            .get('/api/shipping')
            .set('cookie', cookie)
            .expect(200);
            expect(body[0].customerId).to.equal(1);
            expect(body[0].address1).to.equal("19, FF, East Avenue Market");
      });
    });
    context('when there is no loggedin user and try to get shipping address', () => {
      it('return unauthored error with message ', async () => {
        const {body} = await request()
          .get('/api/shipping')
          .expect(401);
        expect(body.message).to.equal("User not authorized for this action");
      });
    });
});
