export interface E2EAdapter {
  fail(message: string): Promise<void>
  goto(url: string): Promise<void>

  getByLabel(text: string): Promise<E2EAdapterElement>
  getByTestId(testId: string): Promise<E2EAdapterElement>

  expectA11y(): Promise<void>
  expectVisual(name: string): Promise<void>
}

export interface E2EAdapterElement {
  focus(): Promise<void>
  blur(): Promise<void>
  type(value: string): Promise<void>
  press(key: 'Escape' | 'Enter'): Promise<void>

  expectVisual(name: string): Promise<void>
  expectToHaveValue(value: string): Promise<void>
}
