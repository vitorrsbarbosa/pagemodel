import { Selector } from 'testcafe';

class SearchResultPage {
	productItem: Selector;
	productTitle: Selector;

	constructor() {
		this.productItem = Selector('div.product-item')
		this.productTitle = Selector('a').withText('Apple MacBook Pro 13-inch')
	}
}

export default new SearchResultPage();