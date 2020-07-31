"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@aws-cdk/core");
const aws_ec2_1 = require("@aws-cdk/aws-ec2");
const aws_rds_1 = require("@aws-cdk/aws-rds");
class AuroraSlsStack extends core_1.Stack {
    constructor(scope, id, props, deploymentStage) {
        var _a, _b;
        super(scope, id, props);
        // create vpc
        const vpc = new aws_ec2_1.Vpc(this, 'Vpc', {
            cidr: '10.0.0.0/16',
            natGateways: 0,
            subnetConfiguration: [
                { name: 'aurora_isolated_', subnetType: aws_ec2_1.SubnetType.ISOLATED }
            ]
        });
        // get subnetids from vpc
        const subnetIds = [];
        vpc.isolatedSubnets.forEach(subnet => {
            subnetIds.push(subnet.subnetId);
        });
        // output subnet ids
        new core_1.CfnOutput(this, 'VpcSubnetIds', {
            value: JSON.stringify(subnetIds)
        });
        // output security group
        new core_1.CfnOutput(this, 'VpcDefaultSecurityGroup', {
            value: vpc.vpcDefaultSecurityGroup
        });
        // create subnetgroup
        const dbSubnetGroup = new aws_rds_1.CfnDBSubnetGroup(this, 'AuroraSubnetGroup', {
            dbSubnetGroupDescription: 'Subnet group to access aurora',
            dbSubnetGroupName: 'aurora-sls-subnet-group',
            subnetIds
        });
        // create aurora db serverless cluster 
        const aurora = new aws_rds_1.CfnDBCluster(this, 'AuroraServerlessCdk', {
            databaseName: 'dbname',
            dbClusterIdentifier: 'aurora-sls',
            engine: 'aurora',
            engineMode: 'serverless',
            masterUsername: 'masteruser',
            masterUserPassword: 'IT_IS_SMART_TO_GENERATE_AND_OUTPUT_THIS',
            port: 3306,
            dbSubnetGroupName: dbSubnetGroup.dbSubnetGroupName,
            scalingConfiguration: {
                autoPause: true,
                maxCapacity: 2,
                minCapacity: 2,
                secondsUntilAutoPause: 3600
            }
        });
        //wait for subnet group to be created
        aurora.addDependsOn(dbSubnetGroup);
        // construct arn from available information
        const account = (_a = props.env) === null || _a === void 0 ? void 0 : _a.account;
        const region = (_b = props.env) === null || _b === void 0 ? void 0 : _b.region;
        const auroraArn = `arn:aws:rds:${region}:${account}:cluster:${aurora.dbClusterIdentifier}`;
        new core_1.CfnOutput(this, 'AuroraClusterArn', {
            exportName: `${deploymentStage}`,
            value: auroraArn
        });
    }
}
exports.AuroraSlsStack = AuroraSlsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVyb3JhLWNkay1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1cm9yYS1jZGstc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBd0U7QUFDeEUsOENBQW1EO0FBQ25ELDhDQUFrRTtBQUVsRSxNQUFhLGNBQWUsU0FBUSxZQUFLO0lBQ3ZDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBaUIsRUFBRSxlQUF1Qjs7UUFDbEYsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEIsYUFBYTtRQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDL0IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsV0FBVyxFQUFFLENBQUM7WUFDZCxtQkFBbUIsRUFBRTtnQkFDbkIsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLG9CQUFVLENBQUMsUUFBUSxFQUFFO2FBQzlEO1NBQ0YsQ0FBQyxDQUFDO1FBRUgseUJBQXlCO1FBQ3pCLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUMvQixHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVMLG9CQUFvQjtRQUNsQixJQUFJLGdCQUFTLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDakMsQ0FBQyxDQUFDO1FBRUgsd0JBQXdCO1FBQ3hCLElBQUksZ0JBQVMsQ0FBQyxJQUFJLEVBQUUseUJBQXlCLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEdBQUcsQ0FBQyx1QkFBdUI7U0FDbkMsQ0FBQyxDQUFDO1FBRUgscUJBQXFCO1FBQ3JCLE1BQU0sYUFBYSxHQUFxQixJQUFJLDBCQUFnQixDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUN0Rix3QkFBd0IsRUFBRSwrQkFBK0I7WUFDekQsaUJBQWlCLEVBQUUseUJBQXlCO1lBQzVDLFNBQVM7U0FDVixDQUFDLENBQUM7UUFFSCx1Q0FBdUM7UUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxzQkFBWSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUMzRCxZQUFZLEVBQUUsUUFBUTtZQUN0QixtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLGNBQWMsRUFBRSxZQUFZO1lBQzVCLGtCQUFrQixFQUFFLHlDQUF5QztZQUM3RCxJQUFJLEVBQUUsSUFBSTtZQUNWLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxpQkFBaUI7WUFDbEQsb0JBQW9CLEVBQUU7Z0JBQ3BCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFdBQVcsRUFBRSxDQUFDO2dCQUNkLFdBQVcsRUFBRSxDQUFDO2dCQUNkLHFCQUFxQixFQUFFLElBQUk7YUFDNUI7U0FDRixDQUFDLENBQUM7UUFFSCxxQ0FBcUM7UUFDckMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVuQywyQ0FBMkM7UUFDM0MsTUFBTSxPQUFPLFNBQUksS0FBSyxDQUFDLEdBQUcsMENBQUUsT0FBTyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxTQUFHLEtBQUssQ0FBQyxHQUFHLDBDQUFFLE1BQU0sQ0FBQztRQUVqQyxNQUFNLFNBQVMsR0FBRyxlQUFlLE1BQU0sSUFBSSxPQUFPLFlBQVksTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFM0YsSUFBSSxnQkFBUyxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN0QyxVQUFVLEVBQUUsR0FBRyxlQUFlLEVBQUU7WUFDaEMsS0FBSyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkVELHdDQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCwgQ29uc3RydWN0LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgVnBjLCBTdWJuZXRUeXBlIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWVjMic7XG5pbXBvcnQgeyBDZm5EQkNsdXN0ZXIsIENmbkRCU3VibmV0R3JvdXAgfSBmcm9tICdAYXdzLWNkay9hd3MtcmRzJztcblxuZXhwb3J0IGNsYXNzIEF1cm9yYVNsc1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhY2tQcm9wcywgZGVwbG95bWVudFN0YWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcbiAgICAvLyBjcmVhdGUgdnBjXG4gICAgY29uc3QgdnBjID0gbmV3IFZwYyh0aGlzLCAnVnBjJywge1xuICAgICAgY2lkcjogJzEwLjAuMC4wLzE2JyxcbiAgICAgIG5hdEdhdGV3YXlzOiAwLFxuICAgICAgc3VibmV0Q29uZmlndXJhdGlvbjogWyBcbiAgICAgICAgeyBuYW1lOiAnYXVyb3JhX2lzb2xhdGVkXycsIHN1Ym5ldFR5cGU6IFN1Ym5ldFR5cGUuSVNPTEFURUQgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgLy8gZ2V0IHN1Ym5ldGlkcyBmcm9tIHZwY1xuICAgIGNvbnN0IHN1Ym5ldElkczogc3RyaW5nW10gPSBbXTtcbiAgICB2cGMuaXNvbGF0ZWRTdWJuZXRzLmZvckVhY2goc3VibmV0ID0+IHtcbiAgICAgIHN1Ym5ldElkcy5wdXNoKHN1Ym5ldC5zdWJuZXRJZCk7XG4gICAgfSk7XG5cbiAgLy8gb3V0cHV0IHN1Ym5ldCBpZHNcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdWcGNTdWJuZXRJZHMnLCB7XG4gICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkoc3VibmV0SWRzKVxuICAgIH0pO1xuXG4gICAgLy8gb3V0cHV0IHNlY3VyaXR5IGdyb3VwXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnVnBjRGVmYXVsdFNlY3VyaXR5R3JvdXAnLCB7XG4gICAgICB2YWx1ZTogdnBjLnZwY0RlZmF1bHRTZWN1cml0eUdyb3VwXG4gICAgfSk7XG5cbiAgICAvLyBjcmVhdGUgc3VibmV0Z3JvdXBcbiAgICBjb25zdCBkYlN1Ym5ldEdyb3VwOiBDZm5EQlN1Ym5ldEdyb3VwID0gbmV3IENmbkRCU3VibmV0R3JvdXAodGhpcywgJ0F1cm9yYVN1Ym5ldEdyb3VwJywge1xuICAgICAgZGJTdWJuZXRHcm91cERlc2NyaXB0aW9uOiAnU3VibmV0IGdyb3VwIHRvIGFjY2VzcyBhdXJvcmEnLFxuICAgICAgZGJTdWJuZXRHcm91cE5hbWU6ICdhdXJvcmEtc2xzLXN1Ym5ldC1ncm91cCcsXG4gICAgICBzdWJuZXRJZHNcbiAgICB9KTtcblxuICAgIC8vIGNyZWF0ZSBhdXJvcmEgZGIgc2VydmVybGVzcyBjbHVzdGVyIFxuICAgIGNvbnN0IGF1cm9yYSA9IG5ldyBDZm5EQkNsdXN0ZXIodGhpcywgJ0F1cm9yYVNlcnZlcmxlc3NDZGsnLCB7XG4gICAgICBkYXRhYmFzZU5hbWU6ICdkYm5hbWUnLFxuICAgICAgZGJDbHVzdGVySWRlbnRpZmllcjogJ2F1cm9yYS1zbHMnLFxuICAgICAgZW5naW5lOiAnYXVyb3JhJyxcbiAgICAgIGVuZ2luZU1vZGU6ICdzZXJ2ZXJsZXNzJyxcbiAgICAgIG1hc3RlclVzZXJuYW1lOiAnbWFzdGVydXNlcicsXG4gICAgICBtYXN0ZXJVc2VyUGFzc3dvcmQ6ICdJVF9JU19TTUFSVF9UT19HRU5FUkFURV9BTkRfT1VUUFVUX1RISVMnLFxuICAgICAgcG9ydDogMzMwNixcbiAgICAgIGRiU3VibmV0R3JvdXBOYW1lOiBkYlN1Ym5ldEdyb3VwLmRiU3VibmV0R3JvdXBOYW1lLFxuICAgICAgc2NhbGluZ0NvbmZpZ3VyYXRpb246IHtcbiAgICAgICAgYXV0b1BhdXNlOiB0cnVlLFxuICAgICAgICBtYXhDYXBhY2l0eTogMixcbiAgICAgICAgbWluQ2FwYWNpdHk6IDIsXG4gICAgICAgIHNlY29uZHNVbnRpbEF1dG9QYXVzZTogMzYwMFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy93YWl0IGZvciBzdWJuZXQgZ3JvdXAgdG8gYmUgY3JlYXRlZFxuICAgIGF1cm9yYS5hZGREZXBlbmRzT24oZGJTdWJuZXRHcm91cCk7XG5cbiAgICAvLyBjb25zdHJ1Y3QgYXJuIGZyb20gYXZhaWxhYmxlIGluZm9ybWF0aW9uXG4gICAgY29uc3QgYWNjb3VudCAgPSBwcm9wcy5lbnY/LmFjY291bnQ7XG4gICAgY29uc3QgcmVnaW9uID0gcHJvcHMuZW52Py5yZWdpb247XG4gICAgXG4gICAgY29uc3QgYXVyb3JhQXJuID0gYGFybjphd3M6cmRzOiR7cmVnaW9ufToke2FjY291bnR9OmNsdXN0ZXI6JHthdXJvcmEuZGJDbHVzdGVySWRlbnRpZmllcn1gO1xuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnQXVyb3JhQ2x1c3RlckFybicsIHtcbiAgICAgIGV4cG9ydE5hbWU6IGAke2RlcGxveW1lbnRTdGFnZX1gLFxuICAgICAgdmFsdWU6IGF1cm9yYUFyblxuICAgIH0pOyBcbiAgfVxufVxuIl19