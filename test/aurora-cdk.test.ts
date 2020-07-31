import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AuroraCdk from '../lib/aurora-cdk-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    const deploymentStage = 'aurora-sls-dev';
    // WHEN
    const stack = new AuroraCdk.AuroraSlsStack(app, 'AuroraSlsStack',{ env: {
      region: process.env.region,
      account: process.env.account 
    } },deploymentStage);
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
