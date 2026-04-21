import { test, expect } from '@playwright/test';
class BaseComponent {
    constructor(page, pivotElement) {
        this.page = page;
        this.pivotElement = pivotElement;
    }


    async assertIsVisible() {
        await expect(this.pivotElement).toBeVisible();        
    }

    async assertIsHidden() {
        await expect(this.pivotElement).toBeHidden();    
    }
}

export default BaseComponent;

