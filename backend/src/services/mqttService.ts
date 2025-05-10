import mqtt from 'mqtt';
import { addTask } from './taskService';

const FIRST_NAME = 'AMAN';

const MQTT_BROKER_URL = 'ws://broker.hivemq.com:8000/mqtt';
const MQTT_TOPIC = '/add';

export const connectAndSubscribe = () => {
  try {
    const client = mqtt.connect(MQTT_BROKER_URL);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      
      client.subscribe(MQTT_TOPIC, (err) => {
        if (err) {
          console.error('Failed to subscribe to topic:', err);
        } else {
          console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
        }
      });
    });

    client.on('message', async (topic, message) => {
      if (topic === MQTT_TOPIC) {
        try {
          const parsedMessage = JSON.parse(message.toString());
          
          if (parsedMessage && typeof parsedMessage.task === 'string' && parsedMessage.task.trim() !== '') {
            await addTask(parsedMessage.task, FIRST_NAME);
            
            console.log(`Task added: ${parsedMessage.task}`);
          } else {
            console.warn('Invalid message format or empty task:', parsedMessage);
          }
        } catch (parseError) {
          console.error('Error parsing or processing message:', parseError);
          console.error('Problematic message:', message.toString());
        }
      }
    });

    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });

    return client;
  } catch (error) {
    console.error('Failed to connect to MQTT broker:', error);
    throw error;
  }
};