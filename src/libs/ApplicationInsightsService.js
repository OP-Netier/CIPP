import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    connectionString: 'InstrumentationKey=68ff4a76-31cf-43e7-bdfc-a0e5af28cdd0;IngestionEndpoint=https://australiaeast-1.in.applicationinsights.azure.com/;LiveEndpoint=https://australiaeast.livediagnostics.monitor.azure.com/;ApplicationId=c12873f5-700a-4be9-9b3d-5b67705ddb29',
    extensions: [reactPlugin],
    enableAutoRouteTracking: true,
    disableAjaxTracking: false,
    autoTrackPageVisitTime: true,
    enableCorsCorrelation: true,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
  },
});
appInsights.loadAppInsights();

appInsights.addTelemetryInitializer((env) => {
  env.tags = env.tags || [];
  env.tags['ai.cloud.role'] = 'CIPP-UI'; // Static Web App role
  env.tags['ai.cloud.roleInstance'] = 'cipp-swa-7l5hx'; // Static Web App instance name
  env.tags['ai.cloud.backendApi'] = 'cipp7l5hx'; // Backend API name
  env.tags['ai.cloud.backendApiProc'] = 'cipp7l5hx-proc'; // Backend API processing name
});
const trackPageView = (name, url, customProperties = {}) => {
  appInsights.trackPageView({
    name: name || document.title, // Page name
    uri: url || window.location.href, // Page URL
    properties: {
      ...customProperties, // Add custom properties
      userAgent: navigator.userAgent, // Collect user agent information
      referrer: document.referrer, // Collect referrer information
    },
  });
};

export { reactPlugin, appInsights, trackPageView };