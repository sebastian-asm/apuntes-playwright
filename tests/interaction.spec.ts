import { test, expect } from '@playwright/test'

test.describe('Acciones en el Automation Sandbox', () => {
  test('Click en botón ID dinámico', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
    })

    await test.step('Hacer click en el botón con Id dinámico', async () => {
      // forma 1
      // const btnIdDinamico = page.getByRole('button', {
      //   name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto'
      // })
      // await btnIdDinamico.click()

      // forma 2
      await page
        .getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' })
        .click()
    })
  })

  test('Llenar un campo de textp', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
    })
    await test.step('Ingresar texto en el campo', async () => {
      await page.getByPlaceholder('Ingresá texto').fill('Mensaje de prueba')
    })
  })

  test('Seleccionar checkbox', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
    })
    await test.step('Seleccionar el checkbox', async () => {
      await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check()
    })
  })

  test('Seleccionar un radio button', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
    })
    await test.step('Seleccionar el radio button', async () => {
      await page.getByRole('radio', { name: 'Si' }).check()
    })
  })

  test('Seleccionar un item del Dropdown', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
    })
    await test.step('Seleccionar un item', async () => {
      await page.getByLabel('Dropdown').selectOption('Tennis')
    })
  })

  test('Seleccionar un item del Dropdown "Día de la semana"', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
    })
    await test.step('Seleccionar un item', async () => {
      await page.getByRole('button', { name: 'Día de la semana' }).click()
      await page.getByRole('link', { name: 'Lunes' }).click()
    })
  })
})
