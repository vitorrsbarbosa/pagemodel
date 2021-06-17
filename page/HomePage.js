import { Selector, t } from 'testcafe';

class HomePage {
	construtor() {
		this.subtitleHeader = Selector('h2').withText('Welcome to our store');
		this.registerLink = Selector('a').withText('Register');
		this.loginLink = Selector('a').withText('Log in');
		this.logoutLink = Selector('a').withText('Log out');
		this.shoppingCartLink = Selector('a').withText('Shopping cart');
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

	async changeCurrency(curreny) {
		await t
			.click(this.currencyList)
			.click(Selector('option', { text: curreny }));
	}
}
export default new HomePage;