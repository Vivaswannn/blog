# Educational Resource Blog - User Flows

## 1. Student Flow

┌─────────────┐
│   Landing   │
│    Page     │
└─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│   Browse    │     │    Login    │
│   Topics    │     │    Page     │
└─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│    View     │     │  Logged In  │
│   Topics    │     │    State    │
└─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│    View     │     │    Like     │
│  Resources  │◄────│  Resources  │
└─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐
│  Download   │
│  Resources  │
└─────────────┘

## 2. Facilitator Flow

┌─────────────┐
│   Landing   │
│    Page     │
└─────────────┘
       │
       ▼
┌─────────────┐
│    Login    │
│    Page     │
└─────────────┘
       │
       ▼
┌─────────────┐
│ Facilitator │
│ Dashboard   │
└─────────────┘
       │
       ├────────────────┬────────────────┐
       ▼               ▼                 ▼
┌─────────────┐ ┌─────────────┐  ┌─────────────┐
│   Upload    │ │   Manage    │  │    View     │
│  Resources  │ │   Topics    │  │  Resources  │
└─────────────┘ └─────────────┘  └─────────────┘
       │               │                │
       ▼               ▼                ▼
┌─────────────┐ ┌─────────────┐  ┌─────────────┐
│   Select    │ │  Organize   │  │    Like/    │
│    File     │ │  Resources  │  │  Download   │
└─────────────┘ └─────────────┘  └─────────────┘
       │
       ▼
┌─────────────┐
│   Submit    │
│   Upload    │
└─────────────┘

## 3. Key Actions

Student Actions:
- Browse Topics
- View Resources
- Download Resources
- Like Resources (requires login)
- Search/Filter Content

Facilitator Actions:
- All Student Actions +
- Upload New Resources
- Manage Topics
- Organize Content
- Monitor Resources

## 4. Access Levels

┌───────────────────────┐
│    Public Access      │
├───────────────────────┤
│ - View Topics         │
│ - Browse Resources    │
│ - Download Resources  │
└───────────────────────┘

┌───────────────────────┐
│    Student Access     │
├───────────────────────┤
│ - Like Resources      │
│ - Personal Dashboard  │
│ - Track Downloads     │
└───────────────────────┘

┌───────────────────────┐
│  Facilitator Access   │
├───────────────────────┤
│ - Upload Resources    │
│ - Manage Topics       │
│ - View Analytics      │
└───────────────────────┘ 