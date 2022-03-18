import OneInternalOneExternal from '../lib/one-internal-one-external';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

// TODO: Failing
test.skip("Name tag appears on all AWS::EC2::VPC, when importing internally and from external project", () => {
  const app = new cdk.App();
  const stack = new OneInternalOneExternal(app, "one-internal-one-external");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::EC2::VPC", {
    Tags: [
      {
        Key: "Name",
        Value: "one-internal-one-external/internal-a/internal-vpc",
      },
    ],
  });
  template.hasResourceProperties("AWS::EC2::VPC", {
    Tags: [
      {
        Key: "Name",
        Value: "one-internal-one-external/external-a/external-vpc",
      },
    ],
  });
});
