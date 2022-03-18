import { VPCConstruct as ExternalVpc } from '../../external-project/lib/vpc';
import { VPCConstruct as InternalVpc } from '../lib/vpc';
import * as cdk from 'aws-cdk-lib';

export class OneInternalOneExternal extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new InternalVpc(this, "internal-a"); // Has tags
    new ExternalVpc(this, "external-a"); // Does not have tags
  }
}

export default OneInternalOneExternal;
