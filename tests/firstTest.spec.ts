import {test} from '@playwright/test'


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

