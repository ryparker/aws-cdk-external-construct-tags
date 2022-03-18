import { VPCConstruct as ExternalVpc } from '../../external-project/lib/vpc';
import OneInternalOneExternal from '../lib/one-internal-one-external';
import { VPCConstruct as InternalVpc } from '../lib/vpc';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

test('Name tag appears on AWS::EC2::VPC, when importing from same project', () => {
  const stack = new cdk.Stack();
  new InternalVpc(stack, 'same-project');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::EC2::VPC', {
    Tags: [
      {
        Key: 'Name',
        Value: 'Default/same-project/internal-vpc',
      },
    ],
  });
});

test('Name tag appears on AWS::EC2::VPC, when importing from external project', () => {
  const stack = new cdk.Stack();
  new ExternalVpc(stack, 'external-project');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::EC2::VPC', {
    Tags: [
      {
        Key: 'Name',
        Value: 'Default/external-project/external-vpc',
      },
    ],
  });
});

test.skip('Name tag appears on all AWS::EC2::VPC, when importing internally and from external project', () => {
  const app = new cdk.App();
  const stack = new OneInternalOneExternal(app, 'one-internal-one-external');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::EC2::VPC', {
    Tags: [
      {
        Key: 'Name',
        Value: 'one-internal-one-external/internal-a/internal-vpc',
      },
    ],
  });
  template.hasResourceProperties('AWS::EC2::VPC', {
    Tags: [
      {
        Key: 'Name',
        Value: 'one-internal-one-external/external-a/external-vpc',
      },
    ],
  });
});
