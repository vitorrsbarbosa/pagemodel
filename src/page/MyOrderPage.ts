import { Selector } from "testcafe";

class MyOrderPage {
	orders: Selector;
	constructor() {
		this.orders = Selector('a').withText('Orders');
	}
}

export default new MyOrderPage();