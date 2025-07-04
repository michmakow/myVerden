## 🧩 Proposed Microservice Architecture – myVerden

### 📦 Backend Microservices / Modules

| Service                | Responsibility                                                                 |
|------------------------|---------------------------------------------------------------------------------|
| **Auth Service**       | User registration, login, JWT/OAuth2, session management                       |
| **User Service**       | User profile data, roles, greenhouse assignments                               |
| **Greenhouse Service** | Greenhouse registration, zone management, location mapping                     |
| **Device Service**     | Sensor handling (MQTT/HTTP), device identification, health checks              |
| **Sensor Data Service**| Storage and streaming of sensor data                                           |
| **Automation Engine**  | IF/THEN rules engine, scheduling, action execution (e.g., irrigation)          |
| **Notification Service**| Sending alerts: email, push, SMS                                              |
| **Data Export Service**| Exporting sensor data (CSV, JSON), generating reports                          |
| **Telemetry / Logs**   | Auditing, system metrics, logs, integration with Application Insights          |

---

## 🗺️ System Diagram (Textual)

[ IoT Devices / Simulators ]
│ MQTT / HTTP
▼
┌────────────────────────────┐
│ 📡 Device Service │ <-- sensor input, identification
└────────────┬───────────────┘
│
┌────────────▼───────────────┐
│ 📊 Sensor Data Service │ <-- buffer, DB writes, stream processing
└────────────┬───────────────┘
│
┌────────────▼───────────────┐
│ ⚙️ Automation Engine │ <-- rule execution, schedules
└────────────┬───────────────┘
│
┌────────────▼───────────────┐
│ 🔔 Notification Service │ <-- email / SMS / push alerts
└────────────┬───────────────┘
│
┌────────────▼───────────────┐
│ 🧾 Data Export Service │ <-- CSV / reports for users
└────────────────────────────┘

[ 🌍 API Gateway / BFF (.NET 8 WebAPI) ]

┌────────────▼────────────┐
│ 🔐 Auth Service │
│ 👤 User Service │
│ 🏠 Greenhouse Service │
└────────────┬────────────┘
│
┌────────────▼────────────┐
│ 🖥 Frontend (React/Angular) │
└─────────────────────────┘


---

## ☁️ Infrastructure / Technologies

| Area              | Stack / Tools                                              |
|-------------------|------------------------------------------------------------|
| API Gateway / BFF | .NET 8 WebAPI, CQRS, MediatR                               |
| Microservices     | .NET 8 (each service as a containerized app)              |
| Messaging         | MQTT (from devices), RabbitMQ or Kafka (inter-service)    |
| Databases         | PostgreSQL (users, greenhouses), TimescaleDB / CosmosDB   |
| Frontend          | React 18 / Angular 17 + TypeScript                         |
| DevOps            | Docker, Kubernetes, Azure DevOps / Jenkins                 |
| Monitoring        | Azure Application Insights, Prometheus + Grafana          |
| Notifications     | Twilio / SendGrid / SMTP                                   |
| Authentication    | JWT / OAuth2, IdentityServer or custom implementation     |

---

## 🔐 Security

- Authentication via **Auth Service** using JWT tokens.
- Role-based access control (admin, operator, viewer).
- Device input validation (e.g., token signature, trusted source verification).
- Rate limiting and throttling handled at the API Gateway level.
