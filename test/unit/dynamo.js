const db = require("../../src/utils/db")
const { ScanCommand, PutItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

module.exports.unitTest = () => {
    test("Dynamo db is an object", () => {
        expect(typeof db).toBe('object');
    });

    const mockData = {
        id: '1',
        deviceModel: "Model 3",
        name: "Sensor",
        note: "Testing a sensor.",
        serial: "A0400102"
    }

    test('Create function', async () => {
        const res = await db.send(new PutItemCommand({
            TableName: process.env.TABLE_NAME,
            Item: marshall(mockData),
        }));
        expect(res['$metadata'].httpStatusCode).toBe(200)
    })

    test('Get list function', async () => {
        const { Items } = await db.send(new ScanCommand({ TableName: process.env.TABLE_NAME }));
        expect(Items).toEqual([marshall(mockData)])
    })

    test('Get by id function', async () => {
        const { Item } = await db.send(new GetItemCommand({ TableName: process.env.TABLE_NAME, Key: marshall({ id: '1' }) }));
        console.log(Item);
        expect(Item).toEqual(marshall(mockData))
    })
}