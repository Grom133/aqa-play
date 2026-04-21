import BaseComponent from "./BaseComponent";

class LoginComponent extends BaseComponent {
    constructor(page){
        super(page, page.locator("app-signin-modal"));
        this.emailInput = this.page.locator("input[type='email']");
        this.passwordInput = this.page.locator("input[type='password']");
        this.loginButton = this.page.locator("button[type='submit']");
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}

export default LoginComponent;