const {createTest} = require('./create');
const {listTest} = require('./list');
const {getTest} = require('./get');

describe('Create record', createTest);
describe('List record', listTest);
describe('Get record', getTest);