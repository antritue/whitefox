const {createTest} = require('./integration/create');
const {listTest} = require('./integration/list');
const {getTest} = require('./integration/get');
const {unitTest} = require('./unit/dynamo');


describe('Create record', createTest);
describe('List record', listTest);
describe('Get record', getTest);

describe('Unit test record', unitTest);