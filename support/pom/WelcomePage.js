import BasePage from "./BasePage";
import LoginComponent from "../component/LoginComponent";
import RegistrationComponent from "../component/RegistrationComponent";

class WelcomePage extends BasePage {
    constructor(page) {
        super(page, "/", page.locator('app-guest-layout'));
        this.loginModal = new LoginComponent(page);
        this.signUpModal = new RegistrationComponent(page);
        this.signUpButton = this.page.getByRole("button", {name: "Sign up"});
    }

    async openSignUp() {
        await this.signUpButton.click();
    }
}

export default WelcomePage;