const { name, description, version } = require('../package.json');
const { accessKeyId, secretAccessKey } = require('./secret.json');

export default {
  accessKeyId,
  secretAccessKey,
  role: 'arn:aws:iam::105181927417:role/lambda_basic_execution',
  functionName: name,
  description: `${description} (version ${version})`,
  region: 'us-east-1',
  handler: 'index.handler'
};
