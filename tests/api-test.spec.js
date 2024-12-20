const {test, expect} = require("@playwright/test");
const {Ajv} = require("ajv");

const ajv = new Ajv()

// // "Test Case.."" -> disebut parameter

// test.describe("Positive Test Case", () => {
//   test("Test Case 1", async ({ page }) => {
//     console.log("Dieksekusi dari test case 1");
//   });

//   test("Test Case 2", async ({ page }) => {
//     console.log("Dieksekusi dari test case 2");
//   });

//   test("Test Case 3", async ({ page }) => {
//     console.log("Dieksekusi dari test case 3");
//   });
// });

// test.describe("Positive Test Case", () => {
//   test("Test Case A", async ({ page }) => {
//     console.log("Dieksekusi dari test case A");
//   });

//   test("Test Case B", async ({ page }) => {
//     console.log("Dieksekusi dari test case B");
//   });

//   test("Test Case C", async ({ page }) => {
//     console.log("Dieksekusi dari test case C");
//   });

//   test.describe("Negative Case", () => {
//     test("Test Case AX", async ({ page }) => {
//       console.log("Dieksekusi dari test case AX");
//     });

//     test("Test Case XY", async ({ page }) => {
//       console.log("Dieksekusi dari test case XY");
//     });
//   });
// });


// --------------------------------------------------------------------- //

// test('Test GET API', async ({request}) => {
//     const response = await request.get('https://api.restful-api.dev/objects/4')
//     console.log(response.status());
//     console.log(await response.json());
// });


test('Test case 1 GET API', async ({request}) => {
    const response = await request.get('https://api.restful-api.dev/objects/7');
    expect(response.status()).toBe(200)

    const responseData = await response.json()
    
    expect(responseData.id).toBe("7")
    expect(responseData.name).toBe("Apple MacBook Pro 16")
    expect(responseData.data.year).toBe(2019)
    expect(responseData.data["CPU model"]).toBe("Intel Core i9")

    const valid = ajv.validate(require('./jsonschema/get-object-schema.json'), responseData)

    if (!valid) {
        console.error("Ajv validation errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);
});

test('Test case 2 POST API', async ({request}) => {

    const bodyData = {
        "name": "Macbook Pro M2 24GB",
        "data": {
           "year": 2019,
           "price": 1849.99,
           "CPU model": "Intel Core i9",
           "Hard disk size": "1 TB"
        }
     }
    const headerData = {
        Accept: 'application/json'
    }
    
    const response = await request.post('https://api.restful-api.dev/objects', {
        headers : headerData,
        data : bodyData
    });

    console.log(response.status());
    console.log(await response.json());
});

// test('Test Case 3', ({}) => {

// });

