import { ClientFunction } from 'testcafe';
import homepage from '../page/HomePage'
import registerpage from '../page/RegisterPage';
import loginpage from '../page/LoginPage';
import customerpage from '../page/CustomerPage';
// import dataSet from '../resources/data.json';
let dataSet = require('../resources/data.json');

const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);

// const firstName = 'vitor';
// const lastName = 'barbosa';
// const birthDay = '8';
// const bitrhMonth = 'March';
// const birthYear = '1994';
// const password = '123456';

fixture("Registration Fixture").meta('fixture', 'registration')
.page(URL);

test.meta('test', '01')('Assert home page', async t => {
	await t
	.expect(getURL()).eql(URL)
	.expect(homepage.subtitleHeader.innerText).contains('Welcome to our store')
});

dataSet.forEach(data => {
	const email = data.email + randomNumber + '@test.com';
	test.meta('test', '02')("User registration works", async (t) => {

		await t
			.click(homepage.registerLink)
			.expect(getURL()).contains('register');
		await t
			.click(registerpage.genderMaleOption)
			.typeText(registerpage.firstName, data.firstname)
			.typeText(registerpage.lastName, data.lastname);
		await registerpage.selectDay(data.birthday);
		await registerpage.selectMonth(data.birthmonth);
		await registerpage.selectYear(data.birthyear);
		await t
			.typeText(registerpage.email, email)
			.typeText(registerpage.password, data.password)
			.typeText(registerpage.confirmPassword, data.password)
			.click(registerpage.registerButton)
			.expect(registerpage.successfullMessage.exists).ok();

		await t
			.click(homepage.logoutLink)
			.click(homepage.loginLink)
			.expect(loginpage.accountHeader.exists).ok()
			.typeText(loginpage.emailInput, email)
			.typeText(loginpage.passwordInput, data.password)
			.click(loginpage.submitButton)
			.click(homepage.myAccountLink)
			.expect(customerpage.ordersLink.exists).ok();
		await t
			.click(customerpage.ordersLink)
			.expect(customerpage.noOrdersLabel.exists).ok()
	});
})