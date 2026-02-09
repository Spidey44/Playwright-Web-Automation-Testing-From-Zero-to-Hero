import {test} from '@playwright/test'


test.describe('test suite 2', () => {

    test('first test', async ({page}) => { 
        await page.goto('https://testpages.eviltester.com/pages/basics/basic-web-page/')
        await page.getByText('Click Me').click()
    })

    test('2nd test', () => { 

    })

    test('3rd test', () => { 

    })

})


