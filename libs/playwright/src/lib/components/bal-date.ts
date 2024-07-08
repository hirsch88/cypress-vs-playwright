import { E2EAdapter, E2EAdapterElement } from "../adapter/base.adapter";

export class E2EBalDate {
  private el?: E2EAdapterElement

  constructor(private e2e: E2EAdapter) {

  }

  async getByTestId(testId: string) {
    this.el = await this.e2e.getByTestId(testId)
    return this.el
  }

  async getByLabel(text: string) {
    this.el = await this.e2e.getByLabel(text)
    return this.el
  }

  async setValue(date: string) {
    if (this.el) {
      await this.el.focus()
      await this.el.type(date)
      await this.el.press('Escape')
      await this.el.blur()
    } else {
      this.e2e.fail('No element located')
    }
    return this.el
  }

  async expectToHaveValue(value: string) {
    if (this.el) {
      return this.el.expectToHaveValue(value)
    } else {
      this.e2e.fail('No element located')
    }
  }

  async expectVisual(name: string) {
    if (this.el) {
      return this.el.expectVisual(name)
    } else {
      this.e2e.fail('No element located')
    }
  }

}
