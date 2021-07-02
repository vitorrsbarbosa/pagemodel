import { Selector, t } from 'testcafe'

class CustomerPage {
	ordersLink: Selector;
	noOrdersLabel: Selector;
	constructor() {
		this.ordersLink = Selector('a').withText('Orders');
		this.noOrdersLabel = Selector('div.no-data').withText('No orders');
	}
}
export default new CustomerPage();