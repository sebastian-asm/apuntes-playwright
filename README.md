# 2E2 Testing con Playwright

Hay herramientas que permiten probar de principio a fin los flujos de usuarios de manera rápida y robusta (por ejemplo, un login, checkout de un carrito, etc). **Playwright** permite testear todo en uno, desde la UX hasta la capa de integracion sin necesidad de herramientas externas.

### Beneficios

![Beneficios](public/images/beneficios.png)

### Desafíos

![Desafíos](public/images/desafios.png)

### Algunos comandos de Terminal

- `pnpm exec playwright test <archivo>`: ejecutar un archivo en particular.
- `pnpm exec playwright test <archivo> --project=chromium`: ejecutar un archivo solo en Chromium o en algún otro proyecto personalizado.
- `pnpm exec playwright test --ui`: modo UI.
- `pnpm exec playwright show-report`: mostrar un reporte.

### Crear test sin escribir código

Con las herramientas que nos da la [extensión](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), podemos hacer lo siguiente:

- **Record new**: abre una nueva instancia de Chrome y nos generará un archivo de test donde irá guardando todos los locators en donde se hizo click (no escribe los expect o validaciones).
- **Record at cursor**: similar a lo anterior, pero comienza a grabar en un archivo existente y donde este posicionado el cursor.
- `pnpm exec playwright codegen <url>`: abre un inspector de la url indicada en donde podremos ir viendo todo lo que se va generando.

## Locators (Selectores)

- `getByRole`: buscar por rol, ideal para botones, enlaces, encabezados y más.
- `getByText`: seleccionar un elemento web por su contenido textual (podría presentar problemas en tener texto repetido).
- `getByLabel`: busca elementos asociados a una etiqueta `<label>`.
- `getByPlaceholder`: busca por el placeholder en los elementos `<input>`. Tanto `getByLabel` como este son utiles para seleccionar campos de formularios.
- `getByAltText`: buscar por el atributo _alt_ en una imagen.
- `getByTitle`: buscar por el atributo _title_ en una etiqueta.
- `getByTestId`: enfocado directamente para el testing, permite buscar por el atributo _data-testid_ por ejemplo: `<button data-testid="botonDemoId">Botón</button>`
- `locator (css y xpath)`: es recomendable solo utilizar cuando PW no tiene la herramienta necesaria para obtener un elemento.

## Filtros

- `exact`: permite buscar una expresión de forma exacta, por ejemplo: `page.getByText('mensaje de prueba', { exact: true })`
- `.filter()`: filtrar varios elementos para que de ese filtrado obtener una específico, por ejemplo:

```js
page.getByRole('listitem).filter({ hasText: 'Producto 1' }).getByRole('button', { name: 'Agregar al carrito' }).click()
```

Tambíen, este filtro permite buscar por otro locator, por ejemplo:

```js
page.getByRole('listitem).filter({ has: page.getByRole('heading', { name: 'Título' }) }).getByRole('button', { name: 'Agregar al carrito' }).click()
```

## Interactuando con elementos

- `click`: simular un click en un elemento, puede recibir una propiedad force para forzar el click, por ejemplo: `click({ force: true })`, o también se le puede indicar que haga click derecho con `click({ button: 'right' })`. Existe su variante `dblclick()` de doble click.
- `hover`: posicionar el mouse sobre el elemento pero sin hacer click, quizas para activar efectos como tooltips.
- `fill`: ingresar texto en un campo input.
- `press`: simula una tecla presionada, por ejemplo: `press('Enter')` o también con combinaciones de teclas: `press('Shift+ArrowLeft)`.
- `check`: permite marca un checkbox o seleccionar un radio button, el cual tiene su contraparte `uncheck` (pero este no funciona con los radio buttons).
- `selectOption`: seleccionar un elemento de una lista Dropdown.
- `setInputFiles`: testear la subida de un archivo, por ejemplo: `setInputFiles('miArchiv.pdf)` y en caso de simular varios archivos: `setInputFiles(['archivo1.pdf', 'archivo2.pdf'])`.

## Assertions (verificaciones)

Es cuando se realiza una verificación final del elemento seleccionado, y si este retorna el resultado esperado. Por cada prueba solo se debería probar una sola cosa, esto permitirá saber en caso que falle el test, en donde se encuentra rápidamente el problema. Existen Assetions con [auto-retrying](https://playwright.dev/docs/test-assertions#auto-retrying-assertions) y [non-retrying](https://playwright.dev/docs/test-assertions#non-retrying-assertions), esto quiere decir que se reintentará hasta que se complete o alcance el tiempo esperado. Es recomendable utilizar principalmente las que sí permite reintentar.

Existen las **Soft Assertions** que son aserciones que fallan pero que no impiden el flujo total del test, por ejemplo: `expect.soft()`.

- `expect`: asegurarse que el elemento seleccionado tenga el estado esperado. Se le puede enviar como 2 argumento un mensaje personalizado en caso de error, por ejemplo: `expect(element, 'Error al marcar la opción')`.
  - `containsText`: matchea esa parte de texto
  - `haveText`: matchea todo el texto
  - `toBeVisible`: validando que un elemento sea visible
  - `toBeEditable`: que un campo sea editable
  - `toHaveValue`: obtener el valor de un input, existe también para obtener varios valores con `toHaveValues`
  - `toHaveText`: obtener el texto de un elemento

## Anotaciones

Nos permite manipular la ejecución de las pruebas, siempre van después de test, ejemplo: `test.skip()`.

- `skip`: saltarse un caso de prueba.
- `only`: ejecutar solo ese test.
- `info`: permite anotaciones personalizadaslas cuales se verán en el reporte, también permite capturar un screenshot.
- `fail`: indicar explícitamente que un test falle, quizas por estar incompleto en ese momento.
- `pnpm exec playwright test --grep <expresion>`: permite ejecutar test **agrupados** mediante una expresión desde la Terminal, por ejemplo: `pnpm exec playwright test --grep @Sandox` ejecutará todos aquellos test que tengan la expresión _@Sandbox_ dentro de `test`.
