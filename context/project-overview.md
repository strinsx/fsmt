# FSMT

## Overview

FSMT (Freelancer Salary Management Tool) is a focused salary-allocation tool designed for freelancers who receive irregular, project-based income.

Unlike traditional employees who typically receive a predictable monthly salary, freelancers may receive significantly different amounts from month to month depending on the number, size, and timing of their projects.

FSMT helps freelancers separate their **freelance income** from their **personal salary** by allocating available freelance income across a selected period.

The core question FSMT answers is:

> "Given the freelance income I currently have, how much can I allocate to myself as a monthly salary?"

FSMT is intentionally not a general-purpose personal finance application. It does not attempt to manage expenses, investments, taxes, budgets, or financial goals. Its primary purpose is to help freelancers create a structured and predictable salary allocation from otherwise volatile income.

---

## Goals

1. Help freelancers determine a sustainable monthly salary allocation from irregular freelance income.

2. Allow users to distribute available freelance income across a configurable allocation period.

3. Automatically recalculate the user's salary allocation when new freelance income enters the available income pool.

4. Allow freelancers to establish a predictable salary payout schedule despite irregular project income.

5. Clearly distinguish between total freelance income, available income, salary allocation, and completed salary payouts.

6. Reduce the tendency to treat a large one-time freelance payment as a recurring monthly salary.

7. Provide a simple tool that requires minimal financial knowledge to understand and operate.

---

## Core Concept

FSMT uses an **income pool → allocation period → salary allocation → payout** model.

### Income Pool

The income pool represents freelance income currently available for salary allocation.

Example:

- Project A: ₱120,000
- Project B: ₱60,000
- Project C: ₱45,000

Total available income:

**₱225,000**

### Allocation Period

The allocation period determines how many months the available income should support.

Example:

**₱500,000 ÷ 12 months = ₱41,666.67/month**

### Monthly Salary Allocation

The monthly salary allocation is the amount FSMT calculates from the available income pool and the remaining allocation period.

The calculation is:

**Monthly Salary Allocation = Available Income Pool ÷ Remaining Allocation Period**

The calculated amount is an allocation estimate, not a guaranteed salary or financial recommendation.

### Salary Payout

A salary payout represents the scheduled amount that the freelancer intends to take from the freelance income pool as personal salary.

FSMT tracks the payout schedule and whether the payout has been completed.

---

## Rolling Allocation Model

FSMT uses a rolling allocation model rather than permanently fixing a user's salary.

Example:

Initial income pool:

**₱500,000**

Allocation period:

**12 months**

Initial salary allocation:

**₱500,000 ÷ 12 = ₱41,666.67/month**

After one completed payout:

**Remaining pool = ₱458,333.33**

**Remaining period = 11 months**

FSMT recalculates:

**₱458,333.33 ÷ 11 = ₱41,666.67/month**

The salary allocation remains approximately the same because one month's allocation and one month's period have both been consumed.

---

## New Income

When new freelance income enters the income pool, FSMT recalculates the remaining salary allocation.

Example:

Initial pool:

**₱500,000**

After one payout:

**₱458,333.33 remaining**

New freelance income:

**₱100,000**

Updated pool:

**₱558,333.33**

Remaining allocation period:

**11 months**

New salary allocation:

**₱558,333.33 ÷ 11 ≈ ₱50,757.58/month**

This allows the salary allocation to respond to changes in actual freelance income.

---

## Core User Flow

1. User signs up or logs in.

2. User completes onboarding.

3. User enters or establishes their initial freelance income/project income.

4. User selects an allocation period.

5. The default allocation period is **12 months**.

6. User selects a salary payout frequency:
   - Monthly
   - Twice per month

7. User selects their preferred payout date(s).

8. FSMT calculates the initial monthly salary allocation.

9. User lands on the dashboard.

10. User can add additional freelance income as new projects are paid.

11. FSMT updates the available income pool.

12. FSMT recalculates the remaining salary allocation when applicable.

13. FSMT generates or maintains the user's salary payout schedule.

14. User marks a payout as completed when they actually pay themselves.

15. FSMT updates the remaining pool and allocation period.

---

## Features

### Authentication

- User registration
- User login
- User logout
- Password recovery
- Authenticated user sessions

### Onboarding

- Initial freelance income setup
- Allocation period selection
- Payout frequency selection
- Payout date configuration
- Initial salary allocation calculation

### Income Pool

- View current available income pool
- Add income
- Edit income
- Delete income
- View income sources
- Associate income with a project when applicable

### Projects

- Create projects
- View project list
- Edit projects
- Delete projects
- Track project status
- Associate received income with projects

Projects represent the source of freelance income, while actual received money is represented by financial transactions.

### Transactions

Transactions provide the financial ledger used by FSMT.

Transaction types include:

- Income
- Salary payout

Each transaction should contain the relevant amount, date, type, and optional description/project reference.

### Salary Allocation

- Configure allocation period
- Calculate monthly salary allocation
- Track remaining allocation period
- Recalculate allocation when relevant income changes occur
- Display the current allocation clearly

### Salary Payouts

- Generate payout schedule
- Monthly payout option
- Twice-monthly payout option
- Configure payout date(s)
- View upcoming payouts
- View completed payouts
- Mark payouts as completed
- Track payout history

### Dashboard

The dashboard should focus only on information necessary to understand the user's current salary allocation.

It displays:

- Current income pool
- Current salary allocation
- Current/remaining allocation period
- Next scheduled payout
- Project status overview

### Notifications

Basic in-app notifications may be used for important salary events such as:

- Upcoming payout
- Payout due
- Payout completed
- Important allocation changes

Notifications should remain lightweight and should not become a major product module in the MVP.

---

## Salary Payout Frequency

### Monthly

The user receives their full calculated monthly allocation once per month.

Example:

**Monthly allocation: ₱42,000**

Payout date:

**7th**

Schedule:

- December 7 — ₱42,000
- January 7 — ₱42,000
- February 7 — ₱42,000

### Twice Per Month

The monthly allocation is divided into two payouts.

Example:

**Monthly allocation: ₱42,000**

Payout dates:

**15th and 30th**

Each payout:

**₱21,000**

Schedule:

- December 15 — ₱21,000
- December 30 — ₱21,000
- January 15 — ₱21,000
- January 30 — ₱21,000

FSMT does not directly transfer money between bank accounts in the MVP.

The system tracks the intended payout and allows the freelancer to mark it as completed.

---

## Scope

### In Scope

- Authentication
- Freelancer onboarding
- Initial income setup
- Income pool
- Project management
- Income transactions
- Salary allocation
- Configurable allocation period
- Monthly salary calculation
- Rolling allocation recalculation
- Salary payout scheduling
- Monthly payout frequency
- Twice-monthly payout frequency
- Payout tracking
- Basic dashboard
- Basic in-app notifications
- Responsive web interface
- Progressive Web App functionality
- Cloud database
- Continuous deployment

---

## Out of Scope

FSMT is intentionally not a general personal finance application.

The MVP does not include:

- Expense tracking
- Expense categorization
- Personal budgeting
- Financial commitments
- Emergency fund management
- Investment management
- Tax management
- Invoice generation
- Client CRM
- Bank synchronization
- GCash synchronization
- Maya synchronization
- PayPal synchronization
- Direct salary transfers
- Financial health scores
- Gamification
- Streaks
- Financial goals
- Cashflow forecasting
- Advanced analytics
- Financial reports
- AI financial coaching
- Automated financial advice
- Machine-learning financial predictions

These may be considered for future versions but should not expand the MVP beyond its core purpose.

---

## Business Rules

### Income

1. Income must be greater than zero.

2. Actual received income is what enters the available income pool.

3. A project value does not automatically mean that the entire project value is available.

4. Projects may receive multiple payments over time.

5. Only recorded received income contributes to the available income pool.

### Allocation

1. The allocation period must be greater than zero.

2. The default allocation period is 12 months.

3. Monthly salary allocation is calculated from available income and the remaining allocation period.

4. Salary allocation is a calculated value and should not be treated as a permanently fixed salary.

5. New income may cause the current allocation to increase.

6. Completed salary payouts reduce the available income pool.

7. Completed salary payouts consume the corresponding allocation period.

8. FSMT must not allow a payout to exceed the available allocation pool.

### Payouts

1. Users may select monthly or twice-monthly payouts.

2. Monthly payouts use the full calculated monthly allocation.

3. Twice-monthly payouts divide the monthly allocation between two scheduled payout dates.

4. FSMT records scheduled payouts separately from completed financial transactions.

5. FSMT does not directly transfer money to the user's bank or e-wallet.

---

## Financial Model

FSMT's financial model is intentionally limited to the following:

```text
Freelance Project
        ↓
Income Received
        ↓
Income Transaction
        ↓
Available Income Pool
        ↓
Allocation Period
        ↓
Monthly Salary Allocation
        ↓
Salary Payout Schedule
        ↓
Completed Salary Payout
        ↓
Available Income Pool decreases