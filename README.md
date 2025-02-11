# 📌 Flat Budget API

## 🛠️ Running the Application

The Flat Budget API is designed to help users estimate the cost of furnishing their home by tracking materials, rooms, and projects efficiently.


The application is built using **NestJS**, **Swagger**, **MongoDB**, and **Docker**.

To start the application using Docker, run:
```sh
docker compose up -d --build
```

Once the application is running, access the API documentation at:
[http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs)

---

## 📊 Database Schema Overview
This document describes the **database schema** for the Flat Budget API. The schema is designed to **track projects, rooms, materials, and their usage**, including the cost calculations.

---

## 🏗️ Entities and Relationships

The database consists of the following **collections**:

### **1️⃣ Project**
Represents a project that contains multiple rooms.

| Field | Type | Description |
|--------|------|-------------|
| `_id` | `ObjectId` | Primary Key |
| `name` | `Varchar` | Project name |

---

### **2️⃣ Room**
Represents a room that belongs to a specific project.

| Field | Type | Description |
|--------|------|-------------|
| `_id` | `ObjectId` | Primary Key |
| `name` | `Varchar` | Room name |
| `project_id` | `ObjectId (FK)` | Foreign Key - References `Project` |

**🔗 Relationship:** A `Project` **has many** `Rooms` (1:N)

---

### **3️⃣ Material**
Represents a type of material available for use in rooms.

| Field | Type | Description |
|--------|------|-------------|
| `_id` | `ObjectId` | Primary Key |
| `name` | `Varchar` | Material name |
| `price_per_unit` | `Decimal128` | Price per unit of material |
| `unit` | `string` | Measurement unit (kg, m², etc.) |
| `url` | `string` | Optional URL for the material |

---

### **4️⃣ Used_Material**
Represents a **material used in a specific room**.

| Field | Type | Description |
|--------|------|-------------|
| `_id` | `ObjectId` | Primary Key |
| `room_id` | `ObjectId (FK)` | Foreign Key - References `Room` |
| `material_id` | `ObjectId (FK)` | Foreign Key - References `Material` |
| `quantity` | `Decimal128` | Quantity of material used |

**🔗 Relationships:**
- A `Room` **has many** `Used_Materials` (1:N)
- A `Material` **can be used in many** `Rooms` (N:M)

---

## 🔍 Example Usage

1. **Create a Project** → Add a new project to track expenses.
2. **Add Rooms** → Assign multiple rooms to a project.
3. **Define Materials** → Set materials with a price per unit.
4. **Track Used Materials** → Assign materials to rooms and calculate the cost.

---

## 📈 Cost Calculation

To compute the total cost of materials used in a room or project:

**Formula:**
\[\text{Total Cost} = \sum (\text{quantity} \times \text{price\_per\_unit}) \]

Endpoints:
- **`GET /api/v1/used-materials/room/{roomId}/total-price`** → Returns total material cost for a room.
- **`GET /api/v1/used-materials/project/{projectId}/total-price`** → Returns total material cost for a project.

---

## 🎯 Next Steps
- Optimize queries using **indexes** and **aggregation pipelines**.
- Implement API authentication and authorization.

---

🚀 **Flat Budget API - Making cost estimation easy!**

