import { test, expect } from '@playwright/test'

test('Mock de una fruta que no viene en la API real', async ({ page }) => {
  // creando el mock (interceptando la llamada a la API y reescribiendo la respuesta)
  // https://demo.playwright.dev/api-mocking/api/v1/fruits
  await page.route('*/**/api/v1/fruits', async (route) => {
    const json = [{ name: 'Melocotón', id: 123 }]
    await route.fulfill({ json })
  })

  await page.goto('https://demo.playwright.dev/api-mocking/')
  await expect(page.getByText('Melocotón')).toBeVisible()
})

test('Obtener la respuesta de la API y agregando algo no real', async ({ page }) => {
  await page.route('*/**/api/v1/fruits', async (route) => {
    const response = await route.fetch()
    const json = await response.json()
    json.push({ name: 'Otra fruta', id: 111 }) // agregando un elemento que no viene en la API real
    await route.fulfill({ response, json })
  })

  await page.goto('https://demo.playwright.dev/api-mocking/')
  await expect(page.getByText('Otra fruta')).toBeVisible()
})
