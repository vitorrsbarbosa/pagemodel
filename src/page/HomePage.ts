import { Selector, t } from 'testcafe';

class HomePage {
	subtitleHeader: Selector;
	registerLink: Selector;
	loginLink: Selector;
	logoutLink: Selector;
	wishlist: Selector;
	cartLink: Selector;
	myAccountLink: Selector;
	currencyList: Selector;

	constructor() {
		this.subtitleHeader = Selector('h2').withText(
			'Welcome to our store'
		);
		this.registerLink = Selector('a.ico-register');
		this.loginLink = Selector('a.ico-login');
        this.logoutLink = Selector('a.ico-logout');
		this.wishlist = Selector('a.wishlist-label');
		this.cartLink = Selector('a.ico-cart')
		this.myAccountLink = Selector('a').withText('My account');

		this.currencyList = Selector('select#customerCurrency')
	}

	get productSearch() {
		return Selector("input[id='small-searchterms']");
	}

	async search(product) {
		await t
			.typeText(this.productSearch, product)
			.wait(3000)
			.pressKey('enter');
	}

	async changeCurrency(currency) {
		await t
			.click(this.currencyList)
			.click(Selector('option', currency));
	}
}
export default new HomePage();