# 2E2 Testing con Playwright

Hay herramientas que permiten probar de principio a fin los flujos de usuarios de manera rápida y robusta (por ejemplo, un login, checkout de un carrito, etc). **Playwright** permite testear todo en uno, desde la UX hasta la capa de integracion sin necesidad de herramientas externas.

### Beneficios

![Beneficios](public/images/beneficios.png)

### Desafíos

![Desafíos](public/images/desafios.png)

## Locators (Selectores)

- `getByRole`: buscar por rol, ideal para botones, enlaces, encabezados y más.
- `getByText`: seleccionar un elemento web por su contenido textual (podría presentar problemas en tener texto repetido).
- `getByLabel`: busca elementos asociados a una etiqueta `<label>`.
- `getByPlaceholder`: busca por el placeholder en los elementos `<input>`. Tanto `getByLabel` como este son utiles para seleccionar campos de formularios.
- `getByAltText`: buscar por el atributo _alt_ en una imagen.
- `getByTitle`: buscar por el atributo _title_ en una etiqueta.
- `getByTestId`: enfocado directamente para el testing, permite buscar por el atributo _data-testid_ por ejemplo: `<button data-testid="botonDemoId">Botón</button>`
- `locator (css y xpath)`: selector no recomendado.

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
