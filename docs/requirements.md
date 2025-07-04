## 🎯 Project Overview
myVerden is a smart greenhouse system powered by IoT, .NET, and cloud-native architecture. The application monitors and automates environmental conditions to support sustainable and intelligent plant growth. It uses a custom-built IoT device service for ingesting and processing real-time sensor data.

---

## 👤 User Stories

1. As a greenhouse owner,  
I want to monitor temperature, humidity, and light in real time,  
so that I can keep environmental conditions optimal.

2. As a greenhouse owner,  
I want to view historical sensor data on charts,  
so that I can track trends and make better decisions.

3. As a user,  
I want to receive alerts when values exceed safe thresholds,  
so that I can react quickly to critical conditions.

4. As a user,  
I want to create automation rules (e.g., turn on irrigation when humidity drops below 40%),  
so that the greenhouse can self-regulate.

5. As a user,  
I want to log in securely,  
so that only authorized people can manage the system.

6. As an advanced user,  
I want to manually override system automation,  
so that I can take control during special situations.

7. As a user,  
I want to see a dashboard summarizing all greenhouse metrics,  
so that I get a quick overview of the system status.

8. As a system admin,  
I want to manage multiple greenhouses or zones,  
so that the platform can scale for commercial users.

9. As a user,  
I want to download sensor data as CSV,  
so that I can analyze it in external tools if needed.

10. As a system integrator,  
I want to simulate sensors during development,  
so that I can test the system without physical hardware.

---

## ⚙️ System Requirements

### Backend (API):
- Receive and store data from IoT devices via custom Device Service.
- Provide secure REST API for frontend access.
- Implement CQRS for scalable architecture.
- Support rule-based automation and alerting.

### Frontend:
- Display real-time sensor data and visualizations.
- Provide a UI for managing automation rules.
- Handle authentication and user roles.
- Allow manual control of greenhouse systems.

### IoT Device Layer:
- Custom IoT Device Service accepting MQTT/HTTP input.
- Support for simulated or physical sensors (temperature, humidity, light).
- Push data to backend services for processing and storage.

---

## 🛡 Non-Functional Requirements
- ☁️ Hosted on Azure or other cloud platform (App Service, Containers).
- 🔐 Uses authentication (JWT or OAuth2).
- 📊 Application monitoring with Azure Application Insights or Prometheus/Grafana.
- 🧪 Includes automated testing and CI/CD pipelines.
