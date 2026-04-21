import BaseComponent from "./BaseComponent";
import { test, expect } from '@playwright/test';

class RegistrationComponent extends BaseComponent {
    constructor(page) {
        super(page, page.locator("app-signup-modal"));
        this.nameInput = this.pivotElement.locator("#signupName");
        this.lastNameInput = this.pivotElement.locator("#signupLastName");
        this.emailInput = this.pivotElement.locator("#signupEmail");
        this.passwordInput = this.pivotElement.locator("#signupPassword");
        this.confirmPasswordInput = this.pivotElement.locator("#signupRepeatPassword");
        this.registerButton = this.pivotElement.getByRole("button", { name: "Register"});

        this.nameError = this.pivotElement.getByText("Name required", { exact: true });
        this.lastNameError = this.pivotElement.getByText("Last name required");
        this.emailError = this.pivotElement.getByText("Email required");
        this.passwordError = this.pivotElement.getByText(/^Password required$/, { exact: true });
        this.repeatPasswordError = this.pivotElement.getByText(/^Re-enter password required$/, { exact: true });
    }

    async register(name, lastName, email, password, repassword) {
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(repassword);
    }

    async submit() {
        await this.registerButton.click();
    }

}

export default RegistrationComponent;