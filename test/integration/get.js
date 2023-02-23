const get = require('../../src/functions/get')
const eventGenerator = require('./eventGenerator')

module.exports.getTest = () =>{

    describe('should get all items in table', () => {

        test('body should be defined', async () => {
            const event = eventGenerator({
                pathParametersObject: {
                    id: "1"
                }
            });
            const res = await get.get(event)
            expect(res).toBeDefined()
        })
    
        test('if success, return status code 200', async () => {
            const event = eventGenerator({
                pathParametersObject: {
                    id: "1"
                }
            });
            const res = await get.get(event)
            expect(res.statusCode).toBe(200)
        })
    
        test('if id not found, return status code 404', async () => {
            const event = eventGenerator({
                pathParametersObject: {
                    id: '2'
                }
            });
            const res = await get.get(event)
            expect(res.statusCode).toBe(404)
        })
    
    });
}
