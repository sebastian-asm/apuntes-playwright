import { test, expect } from '@playwright/test'

test.describe('Acciones en el Automation Sandbox', () => {
  test('Click en botón ID dinámico', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
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
      await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible()
    })
  })

  test('Llenar un campo de texto', async ({ page }) => {
    const message = 'Mensaje de prueba'
    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
    })
    await test.step('Ingresar texto en el campo', async () => {
      await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no es editable').toBeEditable()
      await page.getByPlaceholder('Ingresá texto').fill(message)
      await expect(page.getByPlaceholder('Ingresá texto')).toHaveValue(message)
    })
  })

  test('Seleccionar y deseleccionar checkbox', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
    })
    await test.step('Seleccionar el checkbox', async () => {
      const checkbox = page.getByRole('checkbox', { name: 'Pasta 🍝' })
      await checkbox.check()
      await expect(checkbox).toBeChecked()
    })
    await test.step('Deseleccionar el checkbox', async () => {
      const checkbox = page.getByRole('checkbox', { name: 'Pasta 🍝' })
      await checkbox.uncheck()
      await expect(checkbox).not.toBeChecked()
      // mensaje de error personalizado en el expect
      // await expect(checkbox, 'El checkbox no estaba desmarcado').toBeChecked()
    })
    await test.step('Validando que los elementos del checkbox son correctos', async () => {
      await expect.soft(page.getByText('Pizza123 🍕'), 'No se encontró el texto Pizza 🍕').toBeVisible()
      await expect.soft(page.getByText('Hamburguesa 🍔')).toBeVisible()
      await expect.soft(page.getByText('Pasta 🍝')).toBeVisible()
      await expect.soft(page.getByText('Helado456 🍧'), 'No se encontró el texto Helado 🍧').toBeVisible()
      await expect.soft(page.getByText('Torta 🍰')).toBeVisible()
    })
  })

  test('Seleccionar un radio button', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
    })
    await test.step('Seleccionar el radio button', async () => {
      await page.getByRole('radio', { name: 'Si' }).check()
    })
  })

  test('Seleccionar un item del Dropdown', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
    })
    await test.step('Seleccionar un item', async () => {
      await page.getByLabel('Dropdown').selectOption('Tennis')
    })
  })

  test('Los items del Dropdown son los esperados', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
    })
    await test.step('Validando la lista de items', async () => {
      const options = ['Fútbol', 'Tennis', 'Basketball']
      for (const option of options) {
        const element = await page.$(`select#formBasicSelect option:is(:text("${option}"))`)
        if (element) console.log(`El elemento ${option} existe`)
        else throw new Error(`El elemento ${option} no existe`)
      }
      // const locator = page.locator('formBasicSelect')
      // await expect(locator).toHaveValues(['Fútbol', 'Tennis', 'Basketball'])
    })
  })

  test('Seleccionar un item del Dropdown "Día de la semana"', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
    })
    await test.step('Seleccionar un item', async () => {
      await page.getByRole('button', { name: 'Día de la semana' }).click()
      await page.getByRole('link', { name: 'Lunes' }).click()
    })
  })

  test('Validando la columna "Nombre" en la tabla estática', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
    })
    await test.step('Validar los elementos de la columna', async () => {
      const columnValues = await page.$$eval(
        'h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)',
        (elements) => elements.map((element) => element.textContent)
      )
      const expectNames = ['Messi', 'Ronaldo', 'Mbappe']
      expect(columnValues).toEqual(expectNames)
    })
  })

  test('Validando los valores de la tabla dinámica', async ({ page }) => {
    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
    })
    await test.step('Validando que los valores cambiaron después de un reload', async () => {
      const tableValues = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', (elements) =>
        elements.map((element) => element.textContent)
      )
      await page.reload()
      const tableValuesReloaded = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', (elements) =>
        elements.map((element) => element.textContent)
      )
      expect(tableValues).not.toEqual(tableValuesReloaded)
    })
  })

  test.only('Validando dentro del popup', async ({ page, browserName }) => {
    // saltar el test bajo una condición
    // test.skip(browserName === 'chromium', 'Aún no se puede ejecutar en Chromiun')
    test.info().annotations.push({ type: 'issue', description: 'Prueba de issue' })

    // obtener un screenshot
    await test.info().attach('screenshot', {
      body: await page.screenshot(),
      contentType: 'image/png'
    })

    await test.step('Navegar al sitio web', async () => {
      await page.goto('')
    })
    await test.step('Hacer click en el botón para abrir el popup', async () => {
      await page.getByRole('button', { name: 'Mostrar popup' }).click()
    })
    await test.step('Validando un elemento dentro del popup', async () => {
      await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!')
      // obtener un screenshot
      await test.info().attach('screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png'
      })
      await page.getByRole('button', { name: 'Close' }).click()
    })
  })
})
