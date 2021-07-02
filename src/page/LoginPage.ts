import { Selector } from 'testcafe'

class LoginPage {
	emailInput: Selector;
	passwordInput: Selector;
	submitButton: Selector;
	accountHeader: Selector;
	constructor() {
		this.emailInput = Selector('#Email');
		this.passwordInput = Selector('#Password');
		this.submitButton = Selector('button[class*="button-1 login-button"]');
		this.accountHeader = Selector('strong').withText('Returning Customer');
	}
}
export default new LoginPage();