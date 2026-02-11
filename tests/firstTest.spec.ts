import {test, expect} from '@playwright/test'


test.describe('test suite', () => {

    test.beforeEach('first test', async ({page}) => { 
        await page.goto('https://testpages.eviltester.com/pages/css/styled-controls/')
    })

    test('first test', async ({page}) => { 
        await page.getByText('I\'m a para').click()
    })

    test('2nd test', async ({page}) => {
        await page.getByText("I\'m an input element").click()
    })

    test('3rd test', async ({page}) => {
        await page.getByText('I\'m an anchor').click()
    })

})



test('Locator syntax rules', async ({ page }) => {

  // by Tag name
  await page.goto('https://testpages.eviltester.com/pages/css/styled-controls/')
  page.locator('input')

  // by ID with #
  page.locator('#inputEmail1')

  // by Class value with .
  page.locator('.shape-rectangle')

  // by attribute in []
  page.locator('[placeholder="Email"]')

  // by Class value (full)
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  )

  // combine different selectors
  page.locator('input[placeholder="Email"][nbinput]')

  // by XPath (NOT RECOMMENDED)
  page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')

})

test('User facing locators', async ({ page }) => {
  // Localise un élément par son rôle ARIA (ici un champ de saisie) avec un nom accessible spécifique
  await page.getByRole('textbox', { name: "Email" }).first().click()
  
  // Localise un bouton par son texte affiché ou son attribut aria-label
  await page.getByRole('button', { name: "Sign in" }).first().click()

  // Localise un champ de formulaire en utilisant le texte de l'étiquette (<label>) associée
  await page.getByLabel('Email').first().click()

  // Localise un élément d'entrée par son texte d'indice (placeholder)
  await page.getByPlaceholder('Jane Doe').click()

  // Localise un élément par le texte exact ou partiel qu'il contient
  await page.getByText('Using the Grid').click()

  // Localise un élément via l'attribut 'data-testid' (utile pour les tests quand les autres attributs changent)
  await page.getByTestId('')

  // Localise un élément par son attribut 'title' (souvent utilisé pour les infobulles)
  await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async ({ page }) => {

 await page.goto('https://testpages.eviltester.com/pages/forms/html-form/')

  // Utilise un sélecteur CSS combiné pour trouver un bouton radio avec un texte spécifique à l'intérieur d'une carte

  // REcommende par playwright child element
  await page.locator('select[multiple]').selectOption({ label: 'Selection Item 2' })

// REcommende par playwright parent element with parent
  await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()
  await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()
})

test('Reusing the locators', async ({ page }) => {
     await page.goto('https://testpages.eviltester.com/pages/forms/text-inputs/')
  // Localiser le formulaire parent par son ID
  const textInputsForm = page.locator('form#ajax-submitted-form')
  
  // OU par le div parent qui contient le titre
  // const textInputsForm = page.locator('div#text-controls')
  
  // Localiser les champs individuels en utilisant le formulaire parent
  const textField = textInputsForm.getByRole('textbox', { name: "Text", exact: true })
  const searchField = textInputsForm.locator('input[name="search"]')
  const passwordField = textInputsForm.getByRole('textbox', { name: "Password" })
  const emailField = textInputsForm.locator('input#text-input')
  
  // Boutons
  const resetButton = textInputsForm.getByRole('button', { name: "reset" })
  const submitButton = textInputsForm.getByRole('button', { name: "submit" })
  
  // Utilisation des locators
  await resetButton.click()
  await textField.fill('Mon texte')
  await searchField.fill('recherche')
  await passwordField.fill('MotDePasse123')
   await expect (passwordField).toHaveValue('MotDePasse123')
  await emailField.fill('test@example.com')
  await expect (emailField).toHaveValue('test@example.com')
  await submitButton.click()
  

})

test.only('extracting values', async ({ page }) => {

  await page.goto('https://testpages.eviltester.com/pages/forms/text-inputs/')

  // single test value
  const basicForm = page.locator('#multi-select-input').filter({ hasText: "Multiple Select" })
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  // all text values
  const allRadioButtonsLabels = await page.locator('#multi-select-input').allTextContents()
  expect(allRadioButtonsLabels).toContain("Option 1")

  // input value
  const emailField = basicForm.getByRole('textbox', { name: "Text Area" })
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com')

  // const placeholderValue = await emailField.getAttribute('placeholder')
  // expect(placeholderValue).toEqual('Email')

})
