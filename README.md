
# 🚀 Quick Setup Guide

## For QHRM Solutions Review Team

This guide will help you quickly set up and run the Product Management System for evaluation.

## ⚡ Quick Start (5 Minutes)

### Option 1: Using SQL Server LocalDB (Recommended)
```bash
# 1. Clone the repository
git clone https://github.com/nyeinchannmoe/ProductManagement.git
cd Assignment

# 2. Restore packages
dotnet restore

# 3. Run the application (LocalDB will be created automatically)
dotnet run
```

### Option 2: Using SQL Server Express
1. **Install SQL Server Express** (if not already installed)
2. **Update connection string** in `appsettings.json`:
   ```json
   "DefaultConnection": "Server=.\\SQLEXPRESS;Database=ProductManagementDB;Trusted_Connection=true;"
   ```
3. **Run the application:**
   ```bash
   dotnet run
   ```

## 🎯 Testing the Application

### 1. Access Points
- **Main App:** `https://localhost:5001`
- **Products:** `https://localhost:5001/Product`
- **Dashboard:** `https://localhost:5001/Dashboard`

### 2. Test Scenarios
1. **Create Product:** Click "Add Product" → Fill form → Submit
2. **View Products:** Check the main product list
3. **Edit Product:** Click blue edit button → Modify → Save
4. **Delete Product:** Click red delete button → Confirm
5. **View Dashboard:** Navigate to `/Dashboard` for performance metrics

### 3. Sample Test Data
The application will work with an empty database, but you can add sample data:
```sql
INSERT INTO Products (Name, Price, Description) VALUES
('Test Product 1', 99.99, 'Sample product for testing'),
('Test Product 2', 149.99, 'Another test product');
```

## 🔍 What to Look For

### ✅ Functionality Checklist
- [ ] Product list displays correctly
- [ ] Add product form works with validation
- [ ] Edit product updates data
- [ ] Delete product removes from database
- [ ] Responsive design on mobile
- [ ] Error handling works properly

### 🎨 UI/UX Features
- Modern, clean design
- Responsive layout (try resizing browser)
- Form validation with helpful messages
- Confirmation dialogs for destructive actions
- Loading states and animations

### 💻 Code Quality
- Clean, readable code structure
- Proper separation of concerns
- Comprehensive error handling
- Well-documented methods
- Following ASP.NET Core best practices

## 🐛 Troubleshooting

### Common Issues

**Issue:** Database connection error
**Solution:** 
```bash
# Check if LocalDB is installed
sqllocaldb info

# If not installed, download from Microsoft
# Or update connection string to use SQL Server Express
```

**Issue:** Port already in use
**Solution:**
```bash
# Run on different port
dotnet run --urls="https://localhost:5002;http://localhost:5001"
```

**Issue:** NuGet restore fails
**Solution:**
```bash
# Clear NuGet cache
dotnet nuget locals all --clear
dotnet restore
```

## 📊 Performance Expectations

- **Load Time:** < 2 seconds
- **Database Operations:** < 500ms
- **Form Submissions:** Instant feedback
- **Responsive Design:** Works on all devices

## 📞 Support

If you encounter any issues during setup:
1. Check the main README.md for detailed instructions
2. Verify all prerequisites are installed
3. Contact: [your.email@example.com]

---

**Thank you for reviewing my assignment! 🙏**
```



# 📋 Technical Documentation

## Architecture Overview

### Design Patterns Used
- **MVC (Model-View-Controller)** - Separation of concerns
- **Repository Pattern** - Data access abstraction via services
- **Dependency Injection** - Loose coupling and testability
- **Service Layer Pattern** - Business logic encapsulation

### Project Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │───▶│    Services     │───▶│    Database     │
│                 │    │                 │    │                 │
│ - ProductCtrl   │    │ - IProductSvc   │    │ - MSSQL Server  │
│ - HomeCtrl      │    │ - ProductSvc    │    │ - Dapper ORM    │
│ - DashboardCtrl │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              ▲
         ▼                                              │
┌─────────────────┐                            ┌─────────────────┐
│     Views       │                            │     Models      │
│                 │                            │                 │
│ - Product/*     │                            │ - Product.cs    │
│ - Dashboard/*   │◀───────────────────────────│ - ViewModels    │
│ - Shared/*      │                            │                 │
└─────────────────┘                            └─────────────────┘
```

## Database Design

### Products Table Schema
```sql
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Price DECIMAL(18,2) NOT NULL CHECK (Price > 0),
    Description NVARCHAR(500) NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedDate DATETIME2 NOT NULL DEFAULT GETDATE()
);

-- Indexes for performance
CREATE INDEX IX_Products_Name ON Products(Name);
CREATE INDEX IX_Products_CreatedDate ON Products(CreatedDate DESC);
```

### Data Access Layer
- **Dapper ORM** for lightweight, fast data access
- **Async/Await** pattern for non-blocking operations
- **Parameterized queries** to prevent SQL injection
- **Connection management** with proper disposal

## API Endpoints

### Product Controller
```csharp
GET    /Product              - List all products
GET    /Product/Details/{id} - Get product details
GET    /Product/Create       - Show create form
POST   /Product/Create       - Create new product
GET    /Product/Edit/{id}    - Show edit form
POST   /Product/Edit/{id}    - Update product
GET    /Product/Delete/{id}  - Show delete confirmation
POST   /Product/Delete/{id}  - Delete product