/* eslint-disable */
require('../constants');
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiAsPromised = require('chai-as-promised');
const request = require('supertest')
const rid = require('random-id')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const crypto = require('crypto');

const app = require('../../app')();
const server = require(__common + '/aa-web-api');
const logger = require(__common + '/logger')
const log = logger.getLogger('tests');

const api = require('./api-helper')(server)
const { rightPad } = require(__common + '/controller-dependencies')

// configure chai
chai.use(chaiHttp);
chai.use(chaiAsPromised);
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

// wait for the app to be fully bootstrapped
before(function (done) {
  this.timeout(99999999)
  app.eventEmitter.on(app.events.STARTED, () => {
    log.info('Application started. Running REST API Test Suite ...');
    done();
  });
});

const credentials = {
  username: rid(10, 'aA0'),
  firstName: 'firstname',
  lastName: 'lastname',
  password: 'IREALLYLOVEBOATS',
  email: `${rid(10, 'aA0')}@test.com`
}

const baduser = {
  username: 'Bob',
  password: 'Thisdoesntmatteryet'
}

const badcredentials = {
  wrong: 'field'
}

var token
var userData

describe('hex to string conversions', () => {
  it('Should convert hex to string', (done) => {
    const text1 = 'Test0 Contracts00!;'
    const emptyString = '';
    const spaces = '   ';
    const in_noPaddedHex = '41737369676e6565';
    const in_evenLeftPaddedHex = '00000041737369676e6565';
    const in_evenRightPaddedHex = '41737369676e6565000000';
    const in_oddLeftPaddedHex = '00041737369676e6565';
    const in_oddRightPaddedHex = '41737369676e6565000';
    const in_nullHex = '000000000000';
    const in_noPadMultiByteHex = '6964656e7469666963616369c3b36e';
    const in_paddedMultiByteHex = '62c3a472000000';
    const out_str_assignee = 'Assignee';
    const out_str_identification = 'identificación';
    const out_str_bear = 'bär';

    // plain old string to hex
    let hex_text1 = global.stringToHex(text1)
    hex_text1 = rightPad(hex_text1, 32)
    const conv_text1 = global.hexToString(hex_text1)
    expect(conv_text1).to.equal(text1)

    // expect null hex to match empty string
    expect(global.hexToString(in_nullHex)).to.equal(emptyString);

    // expect empty string to match empty hex
    expect(global.stringToHex(emptyString)).to.equal('');

    // expect spaces roundtrip to spaces to pass
    expect(global.hexToString(global.stringToHex(spaces))).to.equal(spaces);

    // expect no padded hex to match no padded string
    expect(global.hexToString(in_noPaddedHex)).to.equal(out_str_assignee);

    // expect even left padded hex to match string
    expect(global.hexToString(in_evenLeftPaddedHex)).to.equal(out_str_assignee);

    // expect even right padded hex to match string
    expect(global.hexToString(in_evenRightPaddedHex)).to.equal(out_str_assignee);

    // expect odd left padded hex to NOT match string
    expect(global.hexToString(in_oddLeftPaddedHex)).to.not.equal(out_str_assignee);

    // expect odd right padded hex to match string
    expect(global.hexToString(in_oddRightPaddedHex)).to.equal(out_str_assignee)

    // expect multibyte hex to match string
    expect(global.hexToString(in_noPadMultiByteHex)).to.equal(out_str_identification);

    // expect padded multibyte hex to match string
    expect(global.hexToString(in_paddedMultiByteHex)).to.equal(out_str_bear);

    done();
  });
});

/**
 * ######## USER REGISTRATION / LOGIN #########################################################################################
 */

describe('Registration/ Login', () => {
  it('Should register a new user', async () => {
    await api.registerUser(credentials);
  });

  it('Should fail to register an existing user', function (done) {
    // not using api helper here to check failed reponse details
    chai
      .request(server)
      .post('/users')
      .send(credentials)
      .end((err, res) => {
        res.should.have.status(422)
        done();
      });
  });

  it('Should fail if credentials not passed', (done) => {
    // not using api helper here to check failed reponse details
    chai
      .request(server)
      .post('/users')
      .send(badcredentials)
      .end((err, res) => {
        res.should.have.status(400)
        done();
      });
  });

  it('Should fail to login if user is not activated', (done) => {
    // not using api helper here to check failed reponse details
    chai
      .request(server)
      .put('/users/login')
      .send(credentials)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(401);
        done();
      });
  });

  it('Login as a user to obtain token', async () => {
    try {
      await api.activateUser(credentials);
    } catch (err) {
      throw err;
    }
    let loginResult = await api.loginUser(credentials);
    expect(loginResult.token).to.exist;
    userData = loginResult.loggedInUser;
    token = loginResult.token;
  }).timeout(5000);

  it('Should fail to login as non-existent user', (done) => {
    // not using api helper here to check failed reponse details
    chai
      .request(server)
      .put('/users/login')
      .send(baduser)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('Should fail if credentials not passed', (done) => {
    // not using api helper here to check failed reponse details
    chai
      .request(server)
      .put('/users/login')
      .send(badcredentials)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('GET all users', async () => {
    const users = await api.getUsers(token);
    expect(users).to.be.a('array');
  }).timeout(2000);

})

/**
 * ######## USER PROFILE #########################################################################################
 */

describe('User Profile', () => {
  const newProfileInfo = {
    firstName: 'Bobby',
    lastName: 'Tables',
    country: 'US',
    region: 'ABCDEF123ABCDEF123',
    isProducer: true,
    onboarding: false
  }

  it('Should update the logged in user\'s profile', async () => {
    const res = await api.updateProfile(token, newProfileInfo);
    res.should.be.a('object')
    res.address.toUpperCase().should.equal(userData.address)
  });

  it('Should retrieve the logged in user\'s profile', async () => {
    const profile = await api.getProfile(token);
    profile.should.be.a('object')
    profile.address.toUpperCase().should.equal(userData.address)
    profile.username.should.equal(credentials.username)
    profile.email.should.equal(credentials.email)
    profile.firstName.should.equal(newProfileInfo.firstName)
    profile.lastName.should.equal(newProfileInfo.lastName)
    profile.should.have.property('firstName')
    profile.should.have.property('lastName')
    profile.country.should.equal(newProfileInfo.country)
    profile.region.should.equal(newProfileInfo.region)
    profile.isProducer.should.equal(true)
    profile.onboarding.should.equal(false)
    profile.organizations.should.be.a('array')
    profile.createdAt.should.exist
  });

  /**
   * ######## ORGANIZATIONS #########################################################################################
   */

  describe('Organizations', () => {
    // Variables for each entity
    const acme = {
      name: 'ACME Corp',
    };
    const accounting = {
      name: 'Accounting Department',
    };
    const approver = {
      username: rid(10, 'aA0'),
      email: `${rid(10, 'aA0')}@test.com`,
      password: 'approver',
    };
    const accountant = {
      username: rid(10, 'aA0'),
      email: `${rid(10, 'aA0')}@test.com`,
      password: 'accountant',
    };
    const employee = {
      username: rid(10, 'aA0'),
      email: `${rid(10, 'aA0')}@test.com`,
      password: 'employee',
    };
    const nonEmployee = {
      username: rid(10, 'aA0'),
      email: `${rid(10, 'aA0')}@test.com`,
      password: 'nonemployee',
    };
    let orgTestToken;
    it('Should register new users and login approver', async function () {
      const approverRes = await api.registerUser(approver);
      const accountantRes = await api.registerUser(accountant);
      const employeeRes = await api.registerUser(employee);
      const nonEmployeeRes = await api.registerUser(nonEmployee);
      approver.address = approverRes.address;
      accountant.address = accountantRes.address;
      employee.address = employeeRes.address;
      nonEmployee.address = nonEmployeeRes.address;
      await api.activateUser(approver);
      const loginRes = await api.loginUser(approver);
      orgTestToken = loginRes.token;
    });

    it('POST a new organization', async () => {
      let res = await api.createOrganization(orgTestToken, acme);
      res.address.should.exist;
      res.address.should.match(/[0-9A-Fa-f]{40}/); // match for 20 byte hex
      res.name.should.exist;
      acme.address = res.address;
      res = await api.getOrganizations(orgTestToken);
      res.should.be.a('array');
      const resAcme = res.find(({ address }) => address === acme.address);
      resAcme.should.exist;
    }).timeout(5000);

    it('Should NOT allow duplicate organization names in POST', async () => {
      await assert.isRejected(api.createOrganization(orgTestToken, acme));
    }).timeout(5000);
    
    it('PUT users Approver, Accountant, and Employee to organization', async () => {
      await api.addOrganizationUsers(orgTestToken, acme.address, [approver.address, accountant.address, employee.address]);
      // verify users on this organization
      const { users } = await api.getOrganization(orgTestToken, acme.address);
      users.should.be.a('array');
      users.should.have.length(3);
      users.find(({ address }) => address === approver.address).should.not.be.undefined;
      users.find(({ address }) => address === accountant.address).should.not.be.undefined;
      users.find(({ address }) => address === employee.address).should.not.be.undefined;
    }).timeout(10000);

    it('Should allow organization approver to change organization name', async () => {
      await api.updateOrganization(orgTestToken, acme.address, { name: 'NEW NAME' });
    }).timeout(5000);

    it('Should NOT allow a non-approver to change organization name', async () => {
      const accountantLogin = await api.loginUser(accountant);
      await assert.isRejected(api.updateOrganization(accountantLogin.token, acme.address, { name: 'NEW NEW NAME' }));
    }).timeout(5000);

    it('Should NOT allow duplicate organization names in PUT', async () => {
      await api.createOrganization(orgTestToken, { name: 'NEW NEW NAME' });
      await assert.isRejected(api.updateOrganization(orgTestToken, acme.address, { name: 'NEW NEW NAME' }));
    }).timeout(5000);

    it('Should NOT allow update to empty name', async () => {
      await assert.isRejected(api.updateOrganization(orgTestToken, acme.address, { name: '' }));
      await assert.isRejected(api.updateOrganization(orgTestToken, acme.address, { name: null }));
      await assert.isRejected(api.updateOrganization(orgTestToken, acme.address, {}));
    }).timeout(5000);

    it('DELETE a User Employee from organization', async () => {
      await api.removeOrganizationUser(orgTestToken, acme.address, employee.address);
      // verify users on this organization
      const { users } = await api.getOrganization(orgTestToken, acme.address);
      users.should.have.length(2);
      users.find(({ address }) => address === approver.address).should.not.be.undefined;
      users.find(({ address }) => address === accountant.address).should.not.be.undefined;
      expect(users.find(({ address }) => address === employee.address)).to.be.undefined;
    }).timeout(10000);

    it('PUT accounting department to organization', async () => {
      const { id } = await api.addOrganizationDepartment(orgTestToken, acme.address, accounting);
      id.should.be.a('string');
      accounting.id = id;
      const res = await api.getOrganization(orgTestToken, acme.address);
      // verify departments on this organization
      res.departments.should.be.a('array');
      // Length should be 2 now because the default department should have been created upon organization creation
      res.departments.should.have.length(2);
      const acctDep = res.departments.find(({ id }) => id === accounting.id);
      acctDep.should.be.a('object');
      acctDep.name.should.equal(accounting.name);
      acctDep.users.should.be.a('array');
    }).timeout(10000);

    it('PUT users to accounting department in organization', (done) => {
      chai
        .request(server)
        .put(`/organizations/${acme.address}/departments/${accounting.id}/users`)
        .send({ users: [accountant.address] })
        .set('Cookie', [`access_token=${orgTestToken}`])
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          done();
        });
    }).timeout(10000);

    it('should include users in each department in GET organization', async () => {
      const res = await api.getOrganization(orgTestToken, acme.address);
      const acctDep = res.departments.find(({ id }) => id === accounting.id);
      acctDep.users[0].should.equal(accountant.address);
    }).timeout(10000);

    it('DELETE user from accounting department in organization', (done) => {
      chai
        .request(server)
        .delete(`/organizations/${acme.address}/departments/${accounting.id}/users/${accountant.address}`)
        .set('Cookie', [`access_token=${orgTestToken}`])
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          done();
        });
    }).timeout(10000);

    it('GET organizations even for non-member', async () => {
      await api.activateUser(nonEmployee);
      let loginResult = await api.loginUser(nonEmployee);
      const res = await api.getOrganizations(loginResult.token);
      res.should.be.a('array');
      res.should.not.have.length(0);
    });

    it('Should not allow GET organization if user is not member or approver', async () => {
      let loginResult = await api.loginUser(nonEmployee);
      await assert.isRejected(api.getOrganization(loginResult.token, acme.address));
    });

    it('Should not allow non-approver to add organization approver', async () => {
      await api.activateUser(accountant);
      let loginResult = await api.loginUser(accountant);
      await assert.isRejected(api.addOrganizationApprovers(loginResult.token, acme.address, [accountant.address]));
    });

    it('Should not allow adding duplicate organization approver', async () => {
      await assert.isRejected(api.addOrganizationApprovers(orgTestToken, acme.address, [approver.address]));
    });

    it('Should add organization approvers', async () => {
      await api.addOrganizationApprovers(orgTestToken, acme.address, [accountant.address])
      const res = await api.getOrganization(orgTestToken, acme.address);
      res.approvers.length.should.equal(2);
      res.approvers.find(({ address }) => address === approver.address).should.be.a('object');
      res.approvers.find(({ address }) => address === accountant.address).should.be.a('object');
    });

    it('Should not allow deleting non-existing organization approver', async () => {
      await assert.isRejected(api.removeOrganizationApprover(orgTestToken, acme.address, employee.address));
    });

    it('Should not allow non-approver to delete organization approver', async () => {
      await api.activateUser(employee);
      let loginResult = await api.loginUser(employee);
      await assert.isRejected(api.removeOrganizationApprover(loginResult.token, acme.address, accountant.address));
    });

    it('Should not allow deleting non-existing organization approver', async () => {
      await assert.isRejected(api.removeOrganizationApprover(orgTestToken, acme.address, employee.address));
    });

    it('Should delete organization approvers', async () => {
      await api.removeOrganizationApprover(orgTestToken, acme.address, accountant.address)
      const res = await api.getOrganization(orgTestToken, acme.address);
      res.approvers.length.should.equal(1);
      res.approvers.find(({ address }) => address === approver.address).should.be.a('object');
    });

    it('Should not allow deleting the only organization approver', async () => {
      await assert.isRejected(api.removeOrganizationApprover(orgTestToken, acme.address, approver.address));
    });
  });
});
