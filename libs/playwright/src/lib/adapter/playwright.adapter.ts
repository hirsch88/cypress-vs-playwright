import { Locator, expect } from "@playwright/test";
import AxeBuilder from '@axe-core/playwright';
import { E2EPage } from "../playwright-declarations";
import { E2EAdapter, E2EAdapterElement } from "./base.adapter";

export class E2EAdapterPlaywright implements E2EAdapter {
  constructor(private page: E2EPage) {

  }

  async fail(message: string) {
    expect(true, { message }).toBeFalsy()
  }

  async getByTestId(testId: string): Promise<E2EAdapterElement> {
    const locator = this.page.getByTestId(testId)
    return new E2EAdapterElementPlaywright(this.page, locator)
  }

  async getByLabel(text: string): Promise<E2EAdapterElement> {
    const locator = this.page.getByLabel(text)
    return new E2EAdapterElementPlaywright(this.page, locator)
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url)
  }

  async expectA11y() {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  }

  async expectVisual(name: string) {
    await expect(this.page).toHaveScreenshot(`${name}.png`);
  }

}

export class E2EAdapterElementPlaywright implements E2EAdapterElement {
  constructor(private page: E2EPage, private locator: Locator) {

  }

  async focus() {
    await this.locator.focus()
  }

  async blur() {
    await this.locator.blur()
  }

  async type(value: string) {
    await this.locator.focus()
    await this.page.keyboard.type(value)
    await this.locator.blur()
  }

  async press(key: string) {
    await this.locator.focus()
    await this.page.keyboard.press(key)
    await this.locator.blur()
  }

  async expectToHaveValue(value: string) {
    expect(this.locator).toHaveValue(value)
  }

  async expectVisual(name: string) {
    await expect(this.locator).toHaveScreenshot(`${name}.png`)
  }

}
