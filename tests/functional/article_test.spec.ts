import { test } from '@japa/runner'

test.group('Article test', () => {
  // Write your test here
  test('Get List Article Data',async ({client})=>{
    const response = await client.get('/api/article')
    
    response.hasBody()
  })
})
