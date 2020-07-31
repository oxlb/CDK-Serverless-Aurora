"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const AuroraCdk = require("../lib/aurora-cdk-stack");
test('Empty Stack', () => {
    const app = new cdk.App();
    const deploymentStage = 'aurora-sls-dev';
    // WHEN
    const stack = new AuroraCdk.AuroraSlsStack(app, 'AuroraSlsStack', { env: {
            region: process.env.region,
            account: process.env.account
        } }, deploymentStage);
    // THEN
    assert_1.expect(stack).to(assert_1.matchTemplate({
        "Resources": {}
    }, assert_1.MatchStyle.EXACT));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVyb3JhLWNkay50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXVyb3JhLWNkay50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWlGO0FBQ2pGLHFDQUFxQztBQUNyQyxxREFBcUQ7QUFFckQsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7SUFDckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCLENBQUM7SUFDekMsT0FBTztJQUNQLE1BQU0sS0FBSyxHQUFHLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUMsRUFBRSxHQUFHLEVBQUU7WUFDdEUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTtZQUMxQixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO1NBQzdCLEVBQUUsRUFBQyxlQUFlLENBQUMsQ0FBQztJQUNyQixPQUFPO0lBQ1AsZUFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQkFBYSxDQUFDO1FBQ2hDLFdBQVcsRUFBRSxFQUFFO0tBQ2hCLEVBQUUsbUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ3pCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwZWN0IGFzIGV4cGVjdENESywgbWF0Y2hUZW1wbGF0ZSwgTWF0Y2hTdHlsZSB9IGZyb20gJ0Bhd3MtY2RrL2Fzc2VydCc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBBdXJvcmFDZGsgZnJvbSAnLi4vbGliL2F1cm9yYS1jZGstc3RhY2snO1xuXG50ZXN0KCdFbXB0eSBTdGFjaycsICgpID0+IHtcbiAgICBjb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuICAgIGNvbnN0IGRlcGxveW1lbnRTdGFnZSA9ICdhdXJvcmEtc2xzLWRldic7XG4gICAgLy8gV0hFTlxuICAgIGNvbnN0IHN0YWNrID0gbmV3IEF1cm9yYUNkay5BdXJvcmFTbHNTdGFjayhhcHAsICdBdXJvcmFTbHNTdGFjaycseyBlbnY6IHtcbiAgICAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYucmVnaW9uLFxuICAgICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuYWNjb3VudCBcbiAgICB9IH0sZGVwbG95bWVudFN0YWdlKTtcbiAgICAvLyBUSEVOXG4gICAgZXhwZWN0Q0RLKHN0YWNrKS50byhtYXRjaFRlbXBsYXRlKHtcbiAgICAgIFwiUmVzb3VyY2VzXCI6IHt9XG4gICAgfSwgTWF0Y2hTdHlsZS5FWEFDVCkpXG59KTtcbiJdfQ==