// Example configuration for Azure AI Services
// This file demonstrates how to set up Azure Cognitive Services

export const azureConfig = {
  // Replace with your actual subscription key
  subscriptionKey: 'YOUR_SUBSCRIPTION_KEY',
  
  // Replace with your service region
  region: 'eastus',
  
  // Service endpoints
  endpoints: {
    textAnalytics: `https://YOUR_RESOURCE_NAME.cognitiveservices.azure.com/`,
    computerVision: `https://YOUR_RESOURCE_NAME.cognitiveservices.azure.com/`,
    speech: `https://YOUR_RESOURCE_NAME.cognitiveservices.azure.com/`,
  },
  
  // Common headers for API requests
  headers: {
    'Ocp-Apim-Subscription-Key': 'YOUR_SUBSCRIPTION_KEY',
    'Content-Type': 'application/json',
  }
};

// Example function to analyze text sentiment
export async function analyzeSentiment(text: string) {
  const url = `${azureConfig.endpoints.textAnalytics}text/analytics/v3.1/sentiment`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: azureConfig.headers,
    body: JSON.stringify({
      documents: [
        {
          id: '1',
          language: 'en',
          text: text
        }
      ]
    })
  });
  
  return response.json();
}

// Example usage:
// const result = await analyzeSentiment("I love using Azure AI services!");
// console.log(result.documents[0].sentiment); // 'positive'
