class AtlassianAnalyticsClient {
  payload: Array<{
    name: string;
    properties: Record<string, string | number | boolean>;
  }>;
  version: string;
  constructor(options: { version: string }) {
    this.payload = [];
    this.version = options.version;
  }

  addEvent(eventName, properties: Record<string, string | number | boolean>) {
    if (
      // Make sure our JSON object is flat
      Object.keys(properties).some(key => typeof properties[key] === 'object')
    ) {
      console.warn('Analytic properties are expected to be a flat JSON object');
    }
    this.payload.push({ name: eventName, properties });
    return this.payload;
  }

  async send() {
    return fetch('https://analytics.atlassian.com/analytics/events', {
      method: 'POST',
      headers: {
        Accept: 'application/json, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: this.payload.map(event => ({
          name: event.name,
          properties: event.properties,
          server: WEBSITE_ENV, //Set by webpack
          product: 'atlaskit',
          subproduct: 'website',
          version: this.version,
          user: '-',
          serverTime: Date.now(),
        })),
      }),
    });
  }
}

export function getAtlassianAnalyticsClient(options) {
  return new AtlassianAnalyticsClient(options);
}
