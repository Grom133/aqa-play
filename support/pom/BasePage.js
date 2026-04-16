class BasePage {
    constructor(page, url, pivotElement) {
        this.page = page;
        this.url = url;
        this.pivotElement = pivotElement;
    }

    async visit() {
        await this.page.goto(this.url);
    }
}

export default BasePage;