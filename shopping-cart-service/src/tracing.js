'use strict'

const logsAPI = require('@opentelemetry/api-logs');
const opentelemetry = require('@opentelemetry/sdk-node');
const { Resource } = require('@opentelemetry/resources');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');
const {
  LoggerProvider,
  SimpleLogRecordProcessor,
  ConsoleLogRecordExporter,
} = require('@opentelemetry/sdk-logs');

const serviceName = 'shopping-cart-service';

// To start a logger, you first need to initialize the Logger provider.
const loggerProvider = new LoggerProvider();
// Add a processor to export log record
loggerProvider.addLogRecordProcessor(
  new SimpleLogRecordProcessor(
    new ConsoleLogRecordExporter()
    )
);
logsAPI.logs.setGlobalLoggerProvider(loggerProvider);

const exporterOptions = {
  url: 'http://localhost:4318/v1/traces'
}

const traceExporter = new OTLPTraceExporter(exporterOptions);

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [
    new WinstonInstrumentation({
      
      // Optional hook to insert additional context to log metadata.
      // Called after trace context is injected to metadata.
      
      logHook: (span, record) => {
        record['resource.service.name'] = serviceName;
      },
    }),
    
    getNodeAutoInstrumentations({
       '@opentelemetry/instrumentation-fs': { enabled: false }
      })],
  
      resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
  })
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});


