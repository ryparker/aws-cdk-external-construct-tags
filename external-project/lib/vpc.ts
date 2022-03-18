import { aws_ec2 as ec2, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class VPCConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const vpc = new ec2.Vpc(this, "external-vpc", {
      cidr: "10.0.0.0/16",
      natGateways: 1,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: "private-subnet-1",
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
          cidrMask: 24,
        },
        {
          name: "public-subnet-1",
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: "isolated-subnet-1",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 28,
        },
      ],
    });

    Tags.of(vpc).add("Project", "external-project");
  }
}
