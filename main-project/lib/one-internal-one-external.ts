import { VPCConstruct as ExternalVpc } from '../../external-project/lib/vpc';
import { VPCConstruct as InternalVpc } from '../lib/vpc';
import * as cdk from 'aws-cdk-lib';

// Internal VPC has tags, external VPC does not
export class OneInternalOneExternal extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const internalA = new InternalVpc(this, 'internal-a');
    const externalVpc = new ExternalVpc(this, 'external-a');

    console.log('internalA.node.path:', internalA.node.path); // internalA.node.path: one-internal-one-external/internal-a
    console.log('externalVpc.node.path:', externalVpc.node.path); // externalVpc.node.path: one-internal-one-external/external-a
  }
}

export default OneInternalOneExternal;
