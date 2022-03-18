import { VPCConstruct as ExternalVpc } from '../../external-project/lib/vpc';
import { VPCConstruct as InternalVpc } from '../lib/vpc';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

test("Name tag appears on AWS::EC2::VPC, when importing from same project", () => {
  const stack = new cdk.Stack();
  new InternalVpc(stack, "same-project");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::EC2::VPC", {
    Tags: [
      {
        Key: "Name",
        Value: "Default/same-project/internal-vpc",
      },
    ],
  });
});

// TODO: Failing
test("Name tag appears on AWS::EC2::VPC, when importing from external project", () => {
  const stack = new cdk.Stack();
  new ExternalVpc(stack, "external-project");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::EC2::VPC", {
    Tags: [
      {
        Key: "Name",
        Value: "Default/external-project/external-vpc",
      },
    ],
  });
});
