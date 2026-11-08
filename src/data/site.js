export const site = {
  name: 'Dev Sharma',
  role: 'Computer Science and Financial Technology student at Manipal Institute of Technology',
  email: 'devsharma.techinnovate@gmail.com',
  url: 'https://devsharma1903.github.io/portfolio/',
  description: 'Dev Sharma is a Computer Science and Financial Technology student at Manipal Institute of Technology, building software across embedded systems, machine learning, and financial technology.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/DevSharma1903' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dev-sharma-092447316/' },
  ],
};

export const projects = [
  {
    id: 'thrustmit',
    title: 'thrustMIT 2026 Payload',
    group: 'Aerospace',
    meta: 'PAYLOAD COMPUTATION',
    mark: 'TM',
    accent: '#D58B5D',
    role: 'Payload Computation Engineer',
    description: 'Built ESP32 payload software with Time-of-Flight and Hall sensors, real-time data pipelines, and PWM/PID control for magnetic levitation. The payload completed a 10,000-foot flight with 100% success and an SDL Payload Challenge Honorable Mention.',
    href: 'https://www.thrustmit.in',
  },
  {
    id: 'zukunft',
    title: 'Zukunft AI',
    group: 'Machine learning',
    meta: 'AI / DATA',
    mark: 'ZA',
    accent: '#B5C49A',
    role: 'Machine learning',
    description: 'Audience intelligence platform using embeddings, K-means, and YouTube and Google Trends data; selected as a Top 40 finalist at Hackfluence.',
    href: 'https://github.com/DevSharma1903/Hackfluence',
  },
  {
    id: 'investsure',
    title: 'InvestSure',
    group: 'Finance',
    meta: 'FINANCIAL TOOLS',
    mark: 'IS',
    accent: '#D5B67B',
    role: 'Financial technology',
    description: 'Financial analytics platform comparing SIPs, fixed deposits, and recurring deposits, with profile-based ML recommendations and Gemini-assisted explanations. Advanced to the FinHack final round.',
    href: 'https://github.com/DevSharma1903/FinHack',
  },
  {
    id: 'mobilis',
    title: 'Mobilis',
    group: 'Civic technology',
    meta: 'CITY DATA',
    mark: 'M',
    accent: '#9EAAA4',
    role: 'Civic technology',
    description: 'Flipkart Gridlock 2.0 Round 2 decision-support prototype using clustering on 298k+ historical traffic records, density heatmaps, and an LLM-powered planning assistant.',
    href: 'https://github.com/Praketr7/Mobilis',
  },
  {
    id: 'optimum',
    title: 'Optimum Notes',
    group: 'Product',
    meta: 'LOCAL FIRST',
    mark: 'ON',
    accent: '#C19CA6',
    role: 'Product',
    description: 'A fast, local-first notepad that keeps notes close to your device.',
    href: 'https://optimum-notes.vercel.app/',
  },
  {
    id: 'college',
    title: 'College Management',
    group: 'Product',
    meta: 'WEB APPLICATION',
    mark: 'CM',
    accent: '#A9B8C3',
    role: 'Product',
    description: 'A college records portal built around clear roles and a normalized database.',
    href: 'https://github.com/DevSharma1903/College-Managment-Webpage',
  },
];

export const caseStudies = [
  {
    id: 'thrustmit',
    title: 'thrustMIT 2026 Payload',
    group: 'Aerospace',
    context: 'Payload computation / 45+ member team',
    href: 'https://www.thrustmit.in',
    outcome: 'The payload achieved 100% success across a 10,000-foot flight and received an SDL Payload Challenge Honorable Mention.',
    steps: [
      {
        label: 'Sensors',
        title: 'Time-of-Flight + Hall',
        detail: 'Integrated Time-of-Flight and Hall sensors to provide active feedback for the payload.',
      },
      {
        label: 'Embedded software',
        title: 'ESP32 flight data',
        detail: 'Processed real-time rocket payload sensor data during flight with embedded software.',
      },
      {
        label: 'Control',
        title: 'PWM + PID levitation',
        detail: 'Designed PWM-based control logic and tuned PID loops for magnetic levitation.',
      },
    ],
  },
  {
    id: 'mobilis',
    title: 'Mobilis',
    group: 'Civic technology',
    context: 'Flipkart Gridlock 2.0 / Round 2',
    href: 'https://github.com/Praketr7/Mobilis',
    outcome: 'Flipkart Gridlock 2.0 Round 2 prototype: traffic hotspots and temporal surges identified across 298k+ historical records, with LLM-assisted deployment plans.',
    steps: [
      {
        label: 'Signal',
        title: '298k+ traffic records',
        detail: 'Clustering across more than 298,000 historical records to identify high-congestion hotspots and temporal surges.',
      },
      {
        label: 'Read',
        title: 'Hotspots with context',
        detail: 'Clustering identified high-congestion hotspots and temporal surges across the historical records.',
      },
      {
        label: 'Next step',
        title: 'Hotspots on a map',
        detail: 'An interactive Leaflet dashboard with traffic-density heatmaps, custom map pins, and an LLM chatbot for deployment plans and dataset insights.',
      },
    ],
  },
  {
    id: 'zukunft',
    title: 'Zukunft AI',
    group: 'Machine learning',
    context: 'Audience intelligence · local semantic analysis',
    href: 'https://github.com/DevSharma1903/Hackfluence',
    outcome: 'Advanced to the Hackfluence Grand Final as a Top 40 finalist after two elimination rounds.',
    steps: [
      {
        label: 'Signal',
        title: 'Videos and viewer themes',
        detail: 'A React and FastAPI platform combines YouTube data with Google Trends to study audience and topic signals.',
      },
      {
        label: 'Read',
        title: 'Local semantic matching',
        detail: 'Python NLP pipelines use embeddings, K-means clustering, and LLMs for semantic topic discovery.',
      },
      {
        label: 'Next step',
        title: 'Evidence-backed recommendations',
        detail: 'YouTube and Google Trends integrations connect topic discovery with trend evidence and analytics.',
      },
    ],
  },
  {
    id: 'investsure',
    title: 'InvestSure',
    group: 'Financial technology',
    context: 'Financial analytics / FinHack finalist',
    href: 'https://github.com/DevSharma1903/FinHack',
    outcome: 'Advanced to the FinHack final round with a financial analytics platform for investment comparisons, recommendations, and scenario explanations.',
    steps: [
      {
        label: 'Compare',
        title: 'SIPs, FDs + RDs',
        detail: 'A React platform using ML and APIs to compare SIPs, fixed deposits, and recurring deposits.',
      },
      {
        label: 'Recommend',
        title: 'Plans for each profile',
        detail: 'ML models recommend SIP and insurance plans based on user financial profiles.',
      },
      {
        label: 'Explain',
        title: 'Scenarios in context',
        detail: 'Gemini explanations and translation APIs help users understand financial scenarios and investment outcomes.',
      },
    ],
  },
];

export const skillGroups = [
  { title: 'Languages', items: ['C', 'Python', 'Java', 'JavaScript', 'SQL', 'HTML / CSS'] },
  { title: 'AI and machine learning', items: ['PyTorch', 'TensorFlow', 'Keras', 'YOLO', 'CNNs', 'NLP', 'Deep learning'] },
  { title: 'Embedded systems and hardware', items: ['ESP32', 'Arduino', 'Raspberry Pi', 'Hailo AI'] },
  { title: 'Frameworks and web technologies', items: ['FastAPI', 'React', 'Spring Boot', 'REST APIs'] },
  { title: 'Developer tools and platforms', items: ['Git', 'Docker', 'Linux', 'Postman', 'Robotic Process Automation'] },
  { title: 'Coursework', items: ['Financial Markets', 'Banking & Capital Markets', 'Mathematics for Finance', 'Accounting & Financial Management', 'Blockchain', 'Fintech Ecosystems', 'Software Systems', 'Cyber Security'] },
];

export const notes = [
  {
    title: 'A sensor reading needs its timestamp',
    category: 'Flight systems',
    summary: 'A number becomes useful only when its source, unit, and moment stay attached to it.',
    body: [
      'A temperature or acceleration value looks factual, but without sensor identity, units, and time it can mean almost anything. When samples arrive late or disappear, a smooth chart can hide the moment the system lost information.',
      'Keep gaps visible and current state separate from history. When a reading changes, let the operator trace it back to the samples that made it change. That makes the display something they can question, not just watch.',
    ],
    takeaway: 'Keep time, units, and sensor health beside the value.',
  },
  {
    title: 'A forecast needs its assumptions nearby',
    category: 'Finance',
    summary: 'A projected line is easier to use when its horizon and scenario are visible beside it.',
    body: [
      'Forecasts compress assumptions into a single line. A projected return has meaning only with its horizon and scenario; if those stay hidden, the chart can imply certainty the data cannot support.',
      'Put the inputs and downside range close to the expected path. Make it easy to compare the same model under different assumptions. The useful question becomes which assumption changes the decision, rather than what will happen.',
    ],
    takeaway: 'Show the scenario and its range beside the forecast.',
  },
  {
    title: 'Audience signals need more than a count',
    category: 'Machine learning',
    summary: 'Comments can reveal repeated needs, but raw volume alone can mistake a loud thread for broad interest.',
    body: [
      'Group comments by topic and connect each theme to published videos. That makes a possible coverage gap visible without treating every repeated phrase as a vote for a new video.',
      'Keep trend momentum separate from audience evidence. A recommendation is easier to judge when someone can see whether it comes from missing coverage, repeated questions, or a wider rise in interest.',
    ],
    takeaway: 'Make every recommendation traceable to its evidence and content gap.',
  },
];

export const pageMeta = {
  '/': {
    title: 'Dev Sharma | Software and systems',
    description: site.description,
  },
  '/projects': {
    title: 'Selected work | Dev Sharma',
    description: 'Selected software projects across aerospace, machine learning, finance, civic technology, and product work.',
  },
  '/about': {
    title: 'About | Dev Sharma',
    description: 'Computer Science and Financial Technology student at Manipal Institute of Technology, with experience in enterprise AI, automation, flight software, and hackathon projects.',
  },
  '/skills': {
    title: 'Skills | Dev Sharma',
    description: 'Languages, machine learning, embedded hardware, frameworks, and developer tools from Dev Sharma’s resume.',
  },
  '/contact': {
    title: 'Contact | Dev Sharma',
    description: 'Contact Dev Sharma about software, flight systems, machine learning, or financial technology.',
  },
  '/404': {
    title: 'Page not found | Dev Sharma',
    description: 'This signal did not resolve. Return to Dev Sharma’s portfolio and selected work.',
  },
};
