# SAP Supply Chain Management Web Application

## 1. Project Overview

- **Project name**: SCM Connect
- **Type**: Web Application (Next.js + Vercel)
- **Core functionality**: A comprehensive supply chain management dashboard implementing core SAP SCM functions including inventory management, procurement, logistics tracking, demand forecasting, and supplier management
- **Target users**: Supply chain managers, procurement officers, warehouse operators, and logistics coordinators

## 2. UI/UX Specification

### Layout Structure

**Navigation**
- Fixed sidebar (280px width) with dark theme (#1a1d29)
- Collapsible on mobile (hamburger menu)
- Top header bar (64px height) with search, notifications, and user profile

**Main Content Areas**
- Dashboard: KPI cards + charts grid
- Inventory: Data table with filters
- Procurement: Kanban-style purchase orders
- Logistics: Map visualization + shipment list
- Suppliers: Card grid + detail modal
- Forecasting: Charts + predictive analytics

**Responsive Breakpoints**
- Mobile: < 768px (sidebar collapses to hamburger)
- Tablet: 768px - 1024px (compact sidebar)
- Desktop: > 1024px (full sidebar)

### Visual Design

**Color Palette**
- Primary: #0F766E (teal-700)
- Primary Light: #14B8A6 (teal-500)
- Secondary: #1E293B (slate-800)
- Accent: #F59E0B (amber-500)
- Success: #10B981 (emerald-500)
- Warning: #F97316 (orange-500)
- Error: #EF4444 (red-500)
- Background: #0F172A (slate-900)
- Surface: #1E293B (slate-800)
- Text Primary: #F8FAFC (slate-50)
- Text Secondary: #94A3B8 (slate-400)
- Border: #334155 (slate-700)

**Typography**
- Font Family: "DM Sans" for body, "JetBrains Mono" for numbers/data
- Headings: 
  - H1: 32px, weight 700
  - H2: 24px, weight 600
  - H3: 18px, weight 600
- Body: 14px, weight 400
- Small: 12px, weight 400

**Spacing System**
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px

**Visual Effects**
- Cards: subtle glow on hover (box-shadow: 0 0 20px rgba(15, 118, 110, 0.15))
- Transitions: 200ms ease-out
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)
- Glassmorphism on modals: backdrop-blur(12px)

### Components

**Sidebar Navigation**
- Logo at top
- Navigation items with icons
- Active state: teal left border + teal text
- Hover: subtle background highlight

**KPI Cards**
- Icon + metric value + label + trend indicator
- Hover: slight lift effect

**Data Tables**
- Sortable columns
- Row hover highlight
- Pagination controls
- Search/filter bar

**Charts**
- Line charts for trends
- Bar charts for comparisons
- Donut charts for distributions

**Buttons**
- Primary: teal background, white text
- Secondary: transparent with teal border
- States: hover (lighten), active (darken), disabled (50% opacity)

**Form Inputs**
- Dark background (#0F172A)
- Teal focus ring
- Error state: red border + message

**Modals**
- Centered overlay
- Glassmorphism background
- Close button top-right

## 3. Functionality Specification

### Core Features

**1. Dashboard**
- Real-time KPIs: Total Inventory Value, Open Orders, On-Time Delivery Rate, Active Suppliers
- Trend charts for last 30 days
- Recent activity feed
- Alerts/notifications panel

**2. Inventory Management**
- Product catalog with SKU, name, category, quantity, location, status
- Stock level indicators (critical, low, optimal, excess)
- Warehouse location mapping
- Stock movement history
- Reorder point alerts

**3. Procurement**
- Purchase order creation and tracking
- Order status workflow: Draft → Submitted → Approved → Shipped → Received
- Vendor selection
- Delivery scheduling
- Order value calculations

**4. Logistics & Tracking**
- Shipment list with carrier, origin, destination, ETA, status
- Real-time tracking status
- Delivery performance metrics
- Route visualization

**5. Supplier Management**
- Supplier directory with contact info, rating, certifications
- Performance scorecards
- Order history per supplier
- Compliance tracking

**6. Demand Forecasting**
- Historical demand charts
- Predictive analytics visualization
- Seasonality indicators
- Reorder recommendations

### User Interactions

- Sidebar navigation between modules
- Data filtering and search
- Sorting tables by column
- Click to view details
- Form submissions for creating orders/suppliers
- Export data (mock functionality)

### Data Handling

- Mock data stored in JSON files
- React Context for global state
- Local state for component-specific data

## 4. Acceptance Criteria

- [ ] Application loads without errors
- [ ] All 6 main modules are accessible via sidebar
- [ ] Dashboard displays 4 KPI cards with data
- [ ] Inventory table shows products with filtering
- [ ] Procurement shows purchase orders with status
- [ ] Logistics displays shipment tracking
- [ ] Suppliers page shows vendor cards
- [ ] Forecasting displays charts
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Navigation highlights active page
- [ ] Hover effects work on interactive elements
- [ ] Dark theme is consistently applied
