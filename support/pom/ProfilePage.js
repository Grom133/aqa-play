import BasePage from "./BasePage";

class ProfilePage extends BasePage {
    constructor(page) {
        super(page, "/panel/profile", page.locator("p.profile_name"));
        this.profileName = this.pivotElement;
    }

    async getDisplayedFullName() {
        return (await this.profileName.textContent()).trim();
    }
}

export default ProfilePage;
