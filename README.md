# AWS CDK Bug - Tags not appearing on external project constructs

[Original Issue](https://github.com/aws/aws-cdk/issues/18914)

## :rocket: Quick Start

**1. Install dependencies for both projects using Yarn v1**

```shell
cd external-project
yarn install
cd ../main-project
yarn install
```

**2. Run the tests**

_from `/main-project` root_

```shell
yarn test
```

See failing test

```sh
 FAIL  tests/external-project-constructs.test.ts (7.173 s)
  ● Name tag appears on AWS::EC2::VPC, when importing from external project

    Template has 1 resources with type AWS::EC2::VPC, but none match as expected.
    The closest result is:
      {
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "CidrBlock": "10.0.0.0/16",
          "EnableDnsHostnames": true,
          "EnableDnsSupport": true,
          "InstanceTenancy": "default"
        }
      }
    with the following mismatches:
        Missing key at /Properties/Tags (using objectLike matcher)
```

**3. Generate the CloudFormation template**

_from `/main-project` root_

```sh
yarn generate
```

**4. Check the CloudFormation template**

Check `cdk.out/one-internal-one-external.template.json` to see that only the main-project `AWS::EC2::VPC` has tags and the external `AWS::EC2::VPC` does not.

Internal project VPC

```json
 "internalainternalvpcF01A0793": {
      "Type": "AWS::EC2::VPC",
      "Properties": {
        "CidrBlock": "10.0.0.0/16",
        "EnableDnsHostnames": true,
        "EnableDnsSupport": true,
        "InstanceTenancy": "default",
        "Tags": [
          {
            "Key": "Name",
            "Value": "one-internal-one-external/internal-a/internal-vpc"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "one-internal-one-external/internal-a/internal-vpc/Resource"
      }
    },
```

External project VPC

```json
 "externalaexternalvpc43C973F3": {
      "Type": "AWS::EC2::VPC",
      "Properties": {
        "CidrBlock": "10.0.0.0/16",
        "EnableDnsHostnames": true,
        "EnableDnsSupport": true,
        "InstanceTenancy": "default"
      },
      "Metadata": {
        "aws:cdk:path": "one-internal-one-external/external-a/external-vpc/Resource"
      }
    },
```
