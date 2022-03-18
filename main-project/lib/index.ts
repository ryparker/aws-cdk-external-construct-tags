import OneInternalOneExternal from './one-internal-one-external';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();
new OneInternalOneExternal(app, "one-internal-one-external");
