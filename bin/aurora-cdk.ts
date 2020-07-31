#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { Aws, Construct } from '@aws-cdk/core';
import { AuroraSlsStack } from '../lib/aurora-cdk-stack';

const deploymentStage = 'aurora-sls-dev';

const defaultEnv: cdk.Environment = {
  account: Aws.ACCOUNT_ID,
  region: 'ap-southeast-1',
};

const app = new cdk.App();
class AuroraCdkStack extends Construct {
    constructor(scope: Construct, id: string, env: cdk.Environment) {
      super(scope, id);
      new AuroraSlsStack(this, 'AuroraSlsStack', {env}, deploymentStage);
    }
}

new AuroraCdkStack(app, deploymentStage, defaultEnv);

