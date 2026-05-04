import BasePage from "./BasePage";

class GaragePage extends BasePage {
    constructor(page) {
        super(page, "/panel/garage", page.getByRole("button", {name: "Add car"}));
        this.addCarButton = this.pivotElement;
    }
}

export default GaragePage;
