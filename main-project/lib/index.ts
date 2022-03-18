import OneInternalOneExternal from './one-internal-one-external';
import * as cdk from 'aws-cdk-lib';

const appA = new cdk.App();
new OneInternalOneExternal(appA, 'one-internal-one-external');
