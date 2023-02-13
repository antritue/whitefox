const list = require('../src/functions/list')
const eventGenerator = require('./eventGenerator')


module.exports.listTest = () =>{
    describe('should list all items in table', () => {

        test('body should be defined', async () => {
    
            const event = eventGenerator({});
    
            const res = await list.list(event)
            expect(res).toBeDefined()
        })
    
        test('if success, it should return status code 200', async () => {
            const event = eventGenerator({});
    
            const res = await list.list(event)
            expect(res.statusCode).toBe(200)
    
        })
    
    });
}
