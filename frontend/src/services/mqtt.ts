import mqtt from 'mqtt';

const MQTT_BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt';
const MQTT_TOPIC = '/add';

let client: mqtt.MqttClient | null = null;

const connectMQTT = () => {
  if (!client) {
    client = mqtt.connect(MQTT_BROKER_URL);
    
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });
    
    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
      client = null;
    });
  }
  
  return client;
};

export const publishTask = (task: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const mqttClient = connectMQTT();
      
      const message = JSON.stringify({ task });
      
      mqttClient.publish(MQTT_TOPIC, message, { qos: 1 }, (err) => {
        if (err) {
          console.error('Failed to publish task:', err);
          reject(err);
        } else {
          console.log('Task published successfully');
          resolve();
        }
      });
    } catch (error) {
      console.error('Error in publishTask:', error);
      reject(error);
    }
  });
};