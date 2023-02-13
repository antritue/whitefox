const create = require('../src/functions/create')
const eventGenerator = require('./eventGenerator')

module.exports.createTest = () => {
  describe('should insert item into table', () => {

    test('body should be defined', async () => {

      const event = eventGenerator({
        body: {
          id: '1',
          deviceModel: "Model 3",
          name: "Sensor",
          note: "Testing a sensor.",
          serial: "A0400102"
        }
      });

      const res = await create.create(event)
      expect(res).toBeDefined()
    })

    test('if success, return status code 201', async () => {
      const event = eventGenerator({
        body: {
          id: "1",
          deviceModel: "Model 3",
          name: "Sensor",
          note: "Testing a sensor.",
          serial: "A0400102"
        }
      });

      const res = await create.create(event)
      expect(res.statusCode).toBe(201)
      expect(JSON.parse(res.body)).toStrictEqual({
        "message": "Successfully created device.",
        "data": {
          "id": "1",
          "deviceModel": "Model 3",
          "name": "Sensor",
          "note": "Testing a sensor.",
          "serial": "A0400102"
        }
      })
    })

    test('if deviceModel field is empty, return status code 400', async () => {
      const event = eventGenerator({
        body: {
          deviceModel: "",
          name: "Sensor",
          note: "Testing a sensor.",
          serial: "A0400102"
        }
      });

      const res = await create.create(event)
      expect(res.statusCode).toBe(400)
      expect(JSON.parse(res.body)).toStrictEqual({
        "error": "\"deviceModel\" is not allowed to be empty"
      })
    })

    test('if name field is empty, return status code 400', async () => {
      const event = eventGenerator({
        body: {
          deviceModel: "Model",
          name: "",
          note: "Testing a sensor.",
          serial: "A0400102"
        }
      });

      const res = await create.create(event)
      expect(res.statusCode).toBe(400)
      expect(JSON.parse(res.body)).toStrictEqual({
        "error": "\"name\" is not allowed to be empty"
      })
    })

    test('if note field is empty, return status code 400', async () => {
      const event = eventGenerator({
        body: {
          deviceModel: "Model",
          name: "Sensor",
          note: "",
          serial: "A0400102"
        }
      });

      const res = await create.create(event)
      expect(res.statusCode).toBe(400)
      expect(JSON.parse(res.body)).toStrictEqual({
        "error": "\"note\" is not allowed to be empty"
      })
    })

    test('if serial field is empty, return status code 400', async () => {
      const event = eventGenerator({
        body: {
          deviceModel: "Model",
          name: "Sensor",
          note: "Note",
          serial: ""
        }
      });

      const res = await create.create(event)
      expect(res.statusCode).toBe(400)
      expect(JSON.parse(res.body)).toStrictEqual({
        "error": "\"serial\" is not allowed to be empty"
      })
    })

    test('if deviceModel field is missing, return status code 400', async () => {
      const event = eventGenerator({
        body: {
          name: "Sensor",
          note: "Note",
          serial: "A0400102"
        }
      });

      const res = await create.create(event)
      expect(res.statusCode).toBe(400)
      expect(JSON.parse(res.body)).toStrictEqual({
        "error": "\"deviceModel\" is required"
      })
    })

    test('if name field is missing, return status code 400', async () => {
      const event = eventGenerator({
        body: {
          deviceModel: "Model",
          note: "Note",
          serial: "A0400102"
        }
      });

      const res = await create.create(event)
      expect(res.statusCode).toBe(400)
      expect(JSON.parse(res.body)).toStrictEqual({
        "error": "\"name\" is required"
      })
    })

    test('if note field is missing, return status code 400', async () => {
      const event = eventGenerator({
        body: {
          deviceModel: "Model",
          name: "Name",
          serial: "A0400102"
        }
      });

      const res = await create.create(event)
      expect(res.statusCode).toBe(400)
      expect(JSON.parse(res.body)).toStrictEqual({
        "error": "\"note\" is required"
      })
    })

    test('if serial field is missing, return status code 400', async () => {
      const event = eventGenerator({
        body: {
          deviceModel: "Model",
          name: "Name",
          note: "Note"
        }
      });

      const res = await create.create(event)
      expect(res.statusCode).toBe(400)
      expect(JSON.parse(res.body)).toStrictEqual({
        "error": "\"serial\" is required"
      })
    })

  });
}