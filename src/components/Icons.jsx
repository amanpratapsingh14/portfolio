const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const ChevronLeft = () => (
  <svg {...base} strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
);
export const ChevronRight = () => (
  <svg {...base} strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
);
export const ChevronDown = (props) => (
  <svg {...base} strokeWidth="2" width="12" height="12" {...props}><polyline points="6 9 12 15 18 9" /></svg>
);
export const ArrowUp = () => (
  <svg {...base} strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
);
export const Copy = () => (
  <svg {...base} strokeWidth="1.7">
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);

const skillPaths = {
  code: <><polyline points="9 8 4 12 9 16" /><polyline points="15 8 20 12 15 16" /></>,
  db: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  cloud: <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.5 2A4 4 0 0 0 6 19h11.5z" />,
  graph: <><circle cx="5" cy="6" r="2.2" /><circle cx="19" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" /><path d="M6.8 7.6 10.5 16.3M17.2 7.6 13.5 16.3M7.2 6h9.6" /></>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5" /></>,
};

export const SkillIcon = ({ name }) => (
  <svg {...base} strokeWidth="1.6">{skillPaths[name]}</svg>
);
