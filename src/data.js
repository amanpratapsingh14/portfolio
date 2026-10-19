// All portfolio content lives here. Edit this file to update the site.
// In bullet text, **bold** and `code` are rendered as <b> and <code>.

export const profile = {
  name: 'Aman Pratap Singh',
  title: 'Python Developer',
  email: 'amanpratapsingh1440@gmail.com',
  phone: '+91 89205 60095',
  location: 'Noida, Uttar Pradesh, India',
  linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle' — shown in Contact when set
  github: '',   // e.g. 'https://github.com/your-handle'
  updated: 'Sep 2026',
};

export const stats = [
  { prefix: '', text: '<500ms', caption: 'core GST API response time — down from 30+ minutes at 1.5M+ record scale' },
  { prefix: '~', count: 900, caption: 'commits shipped across ~45 Jira tickets and 3 backend services' },
  { prefix: '~', count: 200, caption: 'unit tests added across the import & validation pipeline' },
  { count: 78, suffix: '×', caption: 'reduction in import log volume after root‑causing a silent 500' },
];

export const highlights = [
  {
    eyebrow: 'Masters India — GST Compliance Platform',
    title: 'Async, by design.',
    body: 'Replaced a synchronous, in‑request import pipeline with a v2 Sales/Purchase Import API: requests return a job ID immediately, work is partitioned through Kafka keyed by job, chunks are claimed and released safely, and a dedicated status endpoint tracks Pending → In Progress → Completed/Failed at scale.',
    chips: ['Django + DRF', 'Kafka', 'Job orchestration'],
    visual: 'async',
  },
  {
    eyebrow: 'GSTR‑1 Offline Utility',
    title: 'One workbook. Every edge case.',
    body: 'Designed and shipped a single multi‑sheet Excel import spanning B2B/CDN/EXP invoices and HSN/B2CS/DOC/ECO summaries — with row‑level validation, dedup logic, cascade rules, and cell‑level error highlighting on the invalid and duplicate export. Nine months of scope, tracked against a 45‑item defect list.',
    chips: ['Pandas', 'Excel / openpyxl', 'Row‑level validation'],
    visual: 'sheet',
  },
  {
    eyebrow: 'Production debugging',
    title: 'When it breaks, trace it to the line.',
    body: 'Root‑caused a silent 500 in the import API to a `UnboundLocalError` hidden inside an exception handler, then cut import log volume 78× with classified error logging. Separately traced a filing‑level data‑corruption bug — B2CS rows blended across e‑commerce operators — to a grouping key missing in four independent code paths, and fixed all four.',
    chips: ['Root‑cause analysis', 'New Relic', 'Production incidents'],
    visual: 'trace',
  },
];

export const roles = [
  {
    when: 'Dec 2025 — Present',
    current: true,
    openByDefault: true,
    title: 'Software Development Engineer',
    org: 'Masters India',
    context: 'GST Compliance SaaS Platform — ~900 commits across ~45 tickets, 3 backend services',
    summary: [
      'Built an **async v2 Sales/Purchase Import API** (Django + Kafka) replacing a synchronous in‑request pipeline — immediate job IDs, keyed partitioning, chunk claim/release, and a job‑status API for GST filing data at scale.',
      'Designed and shipped the **GSTR‑1 Offline Utility** — a multi‑sheet Excel import (invoices + HSN/B2CS/DOC/ECO summaries) with row‑level validation, dedup, and error‑highlighted invalid/duplicate exports.',
    ],
    more: [
      'Converted Lock/Unlock and Delete‑All into **chunked async jobs** with real‑time progress over Centrifugo and REST fallback status endpoints sharing a single event contract.',
      'Introduced System‑Error vs Failed classification and an automated retry cron after a prod incident affecting **~378 jobs**, eliminating false‑terminal failures.',
      'Root‑caused a silent 500 in the import API (an `UnboundLocalError` masking the real failure) and cut import log volume **78×** with classified error logging; separately traced a GST filing‑level data‑corruption bug across four independent code paths.',
      'Fixed 7 performance bottlenecks that cut core GST return API response times from 30+ minutes to under 500ms at enterprise scale, and authored the PRD for a two‑microservice GSTR‑1/GSTR‑2 import system.',
    ],
  },
  {
    when: 'Aug 2025 — Oct 2025',
    title: 'Backend Engineer — AI Solutions',
    org: 'Vasitum',
    context: 'Vasi Assistant — AI‑driven recruitment & workflow automation',
    summary: [
      'Independently led end‑to‑end architecture and backend development, including API Gateway, conversation engine, reporting and auth modules.',
    ],
    more: [
      'Implemented adaptive AI screening workflows (OpenAI, RAG, WebSocket) with intent classification and continuous feedback loops.',
      'Built document ingestion pipelines for bulk resume uploads (1–500+ PDF/DOCX), with parsing, chunking, vectorization and storage to vector databases.',
    ],
  },
  {
    when: 'Jun 2024 — Jun 2025',
    title: 'Software Development Engineer',
    org: 'Kitaabh Technologies Pvt. Ltd.',
    summary: [
      'Built and maintained **80+ RESTful APIs** (FastAPI + PostgreSQL) across invoicing, ledgers, GST, audits and financial reporting modules.',
    ],
    more: [
      'Improved API throughput by **40%** through async processing, indexing strategy and N+1 query elimination.',
      'Automated CI/CD with GitHub Actions and Docker, cutting release time by **65%** with zero‑downtime deploys.',
    ],
  },
  {
    when: 'Jun 2023 — Feb 2024',
    title: 'Software Developer',
    org: 'Kiasa International Pvt. Ltd.',
    context: 'Clients: Amazon, Flipkart, Dart (via Dhanuka / MmThinkBiz)',
    summary: [
      'Designed and deployed 30+ secure REST APIs (ASP.NET/C#, MSSQL) for enterprise automation tools used by global e‑commerce clients.',
    ],
    more: [
      "Delivered the ARAP platform's invoice lifecycle engine — multi‑tenant RBAC, IRN generation, e‑way bill tracking, GSTR‑1/2A/2B processing.",
    ],
  },
  {
    when: 'May 2022 — Dec 2022',
    title: 'Full Stack Developer',
    org: 'GalaxyTimeTour',
    summary: [
      'Built a full‑stack travel booking platform (React.js, FastAPI, Node.js) for trip selection, booking and notifications.',
    ],
    more: [
      'Automated 90% of manual booking workflows, including scheduling, confirmations and payment handling.',
    ],
  },
];

export const skillFilters = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'data', label: 'Data' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'design', label: 'Design' },
];

export const skills = [
  { cat: 'backend', icon: 'code', title: 'Languages & frameworks', items: ['Python', 'Django', 'DRF', 'FastAPI', 'TypeScript', 'C#'] },
  { cat: 'data', icon: 'db', title: 'Data', items: ['PostgreSQL', 'MongoDB', 'MSSQL', 'Redis', 'Vector DBs'] },
  { cat: 'cloud', icon: 'cloud', title: 'Cloud & DevOps', items: ['Docker', 'AWS', 'GCP', 'CI/CD', 'GitHub Actions'] },
  { cat: 'messaging', icon: 'graph', title: 'Messaging & systems', items: ['Apache Kafka', 'WebSocket', 'Nameko', 'Distributed locking'] },
  { cat: 'ai', icon: 'bolt', title: 'AI / ML', items: ['OpenAI · LLMs', 'RAG', 'Prompt engineering', 'Intent classification'] },
  { cat: 'design', icon: 'layout', title: 'Application design', items: ['REST API design', 'Microservices', 'HLD / LLD', 'New Relic APM'] },
];

export const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow',
  when: '2019 — Apr 2023',
};

export const certifications = [
  { name: 'Claude Code in Action', by: 'Anthropic' },
  { name: 'Python', by: 'HackerRank' },
  { name: 'Data Structures & Algorithms', by: 'DevNest' },
  { name: 'MongoDB Basics' },
  { name: 'Runner‑up', by: 'Inter‑College Coding Competition, 2023' },
];
