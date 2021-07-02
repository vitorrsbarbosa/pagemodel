
import { ClientFunction } from 'testcafe';
import homepage from '../page/HomePage';
import registerpage from '../page/RegisterPage';
import searchresults from '../page/SearchResultPage'
import productdetails from '../page/ProductDetailsPage'
import cartpage from '../page/CartPage'
import checkoutpage from '../page/CheckoutPage'
import myorderpage from '../page/MyOrderPage'
import RegisterPage from '../page/RegisterPage';

const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var userEmail = 'moataz' + randomNumber + '@nabil.com';

fixture('E2E Fixture').meta('fixture','e2e')
	.page(URL);

test('Assert home page', async t => {
	await t
		.expect(getURL()).eql(URL)
		.takeScreenshot()
		.expect(homepage.subtitleHeader.exists).ok()
});

test.meta('test','01')('Place Order E2E Tests', async (t) => {
	await t
		.maximizeWindow()
		.click(homepage.registerLink)
		.expect(getURL()).contains('register')
		.click(registerpage.genderMaleOption)
		.typeText(registerpage.firstName, 'Moataz')
		.typeText(registerpage.lastName, 'Nabil')
		.typeText(registerpage.email, userEmail)
		.typeText(registerpage.password, '123456')
		.typeText(registerpage.confirmPassword, '123456')
		.click(registerpage.registerButton)
		.expect(registerpage.successfullMessage.exists).ok();
	await homepage.search('Apple MacBook Pro 13-inch');
	await t
		.click(searchresults.productTitle)
		.expect(getURL()).contains('apple-macbook-pro-13-inch')
		.expect(productdetails.productPrice.exists).ok()
		.selectText(productdetails.prductQuantity).pressKey('delete')
		.typeText(productdetails.prductQuantity, '3')
		.click(productdetails.addToCart)
		.expect(productdetails.successMessage.exists).ok()
		.wait(3000)
		.click(homepage.cartLink)
		.click(cartpage.termsLabel)
		.click(cartpage.checkoutBtn);
	await t
		.expect(getURL()).contains('checkout');
	await checkoutpage.selectCountry('Germany');
	await t
		.takeScreenshot()
		.typeText(checkoutpage.cityTxt, 'Berlin')
		.typeText(checkoutpage.addressTxt, '108 ddd test')
		.typeText(checkoutpage.zipTxt, '123456')
		.typeText(checkoutpage.phoneTxt, '332434345')
		.click(checkoutpage.continueBtn);
	await t
		.click(checkoutpage.nextDayOption)
		.click(checkoutpage.nextShippingBtn);
	await t
		.click(checkoutpage.nextPaymentBtn)
		.click(checkoutpage.nextConfirmBtn)
		.click(checkoutpage.confirmOrderBtn)
		.expect(checkoutpage.orderConfirmationMessage.exists).ok()
		.click(checkoutpage.viewOrderDetailsLink)
		.click(homepage.myAccountLink)
		.click(myorderpage.orders);
});

test.meta('test','02').skip('Change Currency Test', async (t) => {
	await homepage.changeCurrency('Euro');
});