// ===================================================
// SAZIN Innovative Industries Ltd. — Product Data
// ===================================================

export const siteInfo = {
  name: 'SAZIN',
  tagline: 'Innovative Industries Ltd.',
  website: 'www.sazin.com.bd',
  email: 'info@sazin.com.bd',
  phone: '+880 1XXX-XXXXXX',
  address: 'Dhaka, Bangladesh',
};

export const heroData = {
  badge: 'Industrial Valve Solutions',
  title: 'Premium Industrial Valve Solutions',
  subtitle:
    'SAZIN Innovative Industries Ltd. — Your trusted partner for high-quality gate valves, butterfly valves, check valves, and complete flow control solutions across Bangladesh.',
  cta: 'Explore Products',
  stats: [
    { num: '6+', label: 'Valve Types' },
    { num: 'DN600', label: 'Max Size' },
    { num: 'PN25', label: 'Max Pressure' },
    { num: 'ISO', label: 'Certified' },
  ],
};

export const aboutData = {
  title: 'About SAZIN',
  description:
    'Sazin Innovative Industries Ltd. is a part of the Sazin Group, a well-established organization in Bangladesh with expertise in engineering, industrial solutions, and electro-mechanical systems. The company specializes in supplying high-quality industrial valves and flow control solutions for water supply, fire protection, HVAC, industrial piping, irrigation, and infrastructure projects.',
  vision:
    'To become a trusted leader in industrial valve and flow control solutions by delivering reliable, innovative, and high-quality products.',
  mission:
    'To provide dependable valve and piping solutions that ensure safety, efficiency, and long-term performance across industrial, commercial, and infrastructure sectors.',
};

export const strengths = [
  { icon: '⚙️', text: 'Strong engineering and technical expertise' },
  { icon: '🌐', text: 'Reliable sourcing and supply network' },
  { icon: '✅', text: 'Commitment to quality and international standards' },
  { icon: '🔧', text: 'Wide range of industrial valve solutions' },
  { icon: '💪', text: 'Focus on reliable and performance-driven products' },
];

export const products = [
  {
    id: '1',
    name: 'Butterfly Valve',
    slug: 'butterfly-valve',
    category: 'butterfly-valve',
    emoji: '🦋',
    shortDesc: 'Soft Seal / Resilient Seated butterfly valve for water supply systems',
    description:
      'SAZIN Butterfly Valves are designed for reliable performance in municipal water supply, water transmission pipelines, water treatment plants, pumping stations, and distribution networks. Available in Wafer, Flanged, and Grooved connections with manual, gearbox, or actuator operation options.',
    specs: [
      { label: 'Type', value: 'Soft Seal / Resilient Seated' },
      { label: 'Connection', value: 'Wafer / Flanged / Grooved' },
      { label: 'Pressure Rating', value: 'PN10 / PN16' },
      { label: 'Temperature Range', value: 'Up to 80°C (EPDM / NBR)' },
      { label: 'Operation', value: 'Manual / Gearbox / Actuator' },
      { label: 'Design Standard', value: 'EN 593' },
      { label: 'Face-to-Face', value: 'EN 558' },
      { label: 'Body', value: 'Ductile Iron ASTM A536 (65-45-12)' },
      { label: 'Disc', value: 'Ductile Iron ASTM A536' },
      { label: 'Seat', value: 'EPDM / NBR' },
      { label: 'Stem', value: 'Stainless Steel ASTM A276 (Type 410/420)' },
      { label: 'Size Range', value: 'DN40 – DN600' },
    ],
    applications: ['Municipal water supply', 'Water transmission pipelines', 'Water treatment plants', 'Pumping stations', 'Distribution networks'],
    compliance: ['EN 593', 'EN 1092-2', 'ISO 5208'],
    price: 0,
    inStock: true,
    featured: true,
    color: '#1a3f6b',
  },
  {
    id: '2',
    name: 'Gate Valve',
    slug: 'gate-valve',
    category: 'gate-valve',
    emoji: '🚪',
    shortDesc: 'Long / Short Stem gate valve for underground distribution networks',
    description:
      'SAZIN Gate Valves feature a fully EPDM encapsulated wedge for superior sealing. Designed for municipal water supply, underground distribution networks, water treatment plants, and pumping stations. Available in Long Stem and Short Stem variants with Flanged or Grooved connections.',
    specs: [
      { label: 'Type', value: 'Long / Short Stem' },
      { label: 'Connection', value: 'Flanged / Grooved' },
      { label: 'Pressure Rating', value: 'PN10 / PN16 / PN25' },
      { label: 'Temperature Range', value: 'Up to 80°C (EPDM / NBR)' },
      { label: 'Operation', value: 'Manual / Gearbox / Actuator' },
      { label: 'Design Standard', value: 'EN 1074' },
      { label: 'Face-to-Face', value: 'EN 558' },
      { label: 'Body', value: 'Ductile Iron ASTM A536 (65-45-12)' },
      { label: 'Gate (Wedge)', value: 'Ductile Iron fully EPDM encapsulated' },
      { label: 'Seat', value: 'EPDM / NBR' },
      { label: 'Stem', value: 'Stainless Steel ASTM A276 Type 410/420' },
      { label: 'Size Range', value: 'DN40 – DN600' },
    ],
    applications: ['Municipal water supply', 'Water transmission pipelines', 'Water treatment plants', 'Underground distribution networks', 'Pumping stations'],
    compliance: ['EN 1074', 'EN 1092-2', 'ISO 5208'],
    price: 0,
    inStock: true,
    featured: true,
    color: '#15325a',
  },
  {
    id: '3',
    name: 'Check Valve',
    slug: 'check-valve',
    category: 'check-valve',
    emoji: '↩️',
    shortDesc: 'Swing / Rubber Flap non-return valve for backflow prevention',
    description:
      'SAZIN Check Valves provide automatic backflow prevention for municipal water supply systems. Available in Swing, Rubber Flap, and Non-Return types with flanged or grooved connections. Designed for reliable performance in pumping stations and distribution pipelines.',
    specs: [
      { label: 'Type', value: 'Swing / Rubber Flap / Non-Return' },
      { label: 'Connection', value: 'Flanged / Grooved' },
      { label: 'Pressure Rating', value: 'PN10 / PN16' },
      { label: 'Temperature Range', value: 'Up to 70°C' },
      { label: 'Operation', value: 'Automatic (prevents backflow)' },
      { label: 'Design Standard', value: 'EN 1074-3' },
      { label: 'Face-to-Face', value: 'EN 558' },
      { label: 'Body', value: 'Ductile Iron GJS-500-7' },
      { label: 'Disc', value: 'Steel Insert with EPDM Rubber' },
      { label: 'Seat', value: 'EPDM Rubber' },
      { label: 'Hinge / Shaft', value: 'Stainless Steel' },
      { label: 'Size Range', value: 'DN50 – DN300' },
    ],
    applications: ['Municipal water supply', 'Pumping stations', 'Water treatment plants', 'Distribution pipelines', 'Wastewater systems'],
    compliance: ['EN 1074-3', 'EN 1092-2', 'ISO 5208'],
    price: 0,
    inStock: true,
    featured: false,
    color: '#0f2942',
  },
  {
    id: '4',
    name: 'Pressure Control Valve',
    slug: 'pressure-control-valve',
    category: 'pressure-control-valve',
    emoji: '📊',
    shortDesc: 'Hydraulic pressure control valve for pressure reducing stations',
    description:
      'SAZIN Pressure Control Valves offer automatic hydraulic control for pressure management in water supply systems. Ideal for pressure reducing stations, water transmission pipelines, and distribution networks with flanged connections.',
    specs: [
      { label: 'Type', value: 'Hydraulic Pressure Control Valve' },
      { label: 'Connection', value: 'Flanged' },
      { label: 'Pressure Rating', value: 'PN10 / PN16 / PN25' },
      { label: 'Temperature Range', value: 'Up to 80°C (EPDM / NBR)' },
      { label: 'Operation', value: 'Automatic hydraulic control' },
      { label: 'Design Standard', value: 'EN 1074' },
      { label: 'Face-to-Face', value: 'EN 558' },
      { label: 'Body', value: 'Ductile Iron ASTM A536 (65-45-12)' },
      { label: 'Diaphragm / Seal', value: 'EPDM / NBR' },
      { label: 'Internal Trim', value: 'Stainless Steel / Brass' },
      { label: 'Control Components', value: 'Stainless Steel' },
      { label: 'Size Range', value: 'DN50 – DN600' },
    ],
    applications: ['Municipal water supply', 'Pressure reducing stations', 'Water transmission pipelines', 'Water treatment plants', 'Distribution networks'],
    compliance: ['EN 1074', 'EN 1092-2', 'ISO 5208'],
    price: 0,
    inStock: true,
    featured: false,
    color: '#1a3f6b',
  },
  {
    id: '5',
    name: 'Alarm Valve',
    slug: 'alarm-valve',
    category: 'alarm-valve',
    emoji: '🚨',
    shortDesc: 'Flow balance and monitoring valve for fire protection systems',
    description:
      'SAZIN Alarm Valves are designed for automatic flow balancing and monitoring in water supply and fire protection systems. Available in Flanged, Grooved, and S-Type connections with automatic operation.',
    specs: [
      { label: 'Type', value: 'Flow Balance / Monitoring Valve' },
      { label: 'Connection', value: 'Flanged / Grooved / S-Type' },
      { label: 'Pressure Rating', value: 'PN10 / PN16 / PN25' },
      { label: 'Temperature Range', value: 'Up to 80°C (EPDM / NBR)' },
      { label: 'Operation', value: 'Automatic flow balancing & monitoring' },
      { label: 'Design Standard', value: 'EN 1074 (where applicable)' },
      { label: 'Face-to-Face', value: 'EN 558' },
      { label: 'Body', value: 'Ductile Iron ASTM A536 (65-45-12)' },
      { label: 'Internal Trim', value: 'Stainless Steel / Brass' },
      { label: 'Seals / Diaphragm', value: 'EPDM / NBR' },
      { label: 'Control Components', value: 'Stainless Steel' },
      { label: 'Size Range', value: 'DN50 – DN300' },
    ],
    applications: ['Municipal water supply', 'Water transmission systems', 'Distribution networks', 'Pumping stations', 'Water treatment plants'],
    compliance: ['EN 1074', 'EN 1092-2', 'ISO 5208'],
    price: 0,
    inStock: true,
    featured: false,
    color: '#15325a',
  },
  {
    id: '6',
    name: 'Y-Strainer',
    slug: 'y-strainer',
    category: 'y-strainer',
    emoji: '🔍',
    shortDesc: 'Y-Type strainer for pipeline filtration and debris removal',
    description:
      'SAZIN Y-Strainers provide effective filtration for water supply pipelines, protecting pumps, valves, and other equipment from debris and foreign particles. Available in flanged connections with stainless steel mesh screens.',
    specs: [
      { label: 'Type', value: 'Y-Type Strainer' },
      { label: 'Connection', value: 'Flanged' },
      { label: 'Pressure Rating', value: 'PN10 / PN16' },
      { label: 'Temperature Range', value: 'Up to 80°C' },
      { label: 'Operation', value: 'Inline filtration' },
      { label: 'Design Standard', value: 'EN 1074' },
      { label: 'Body', value: 'Ductile Iron ASTM A536 (65-45-12)' },
      { label: 'Screen', value: 'Stainless Steel Mesh' },
      { label: 'Size Range', value: 'DN50 – DN300' },
    ],
    applications: ['Municipal water supply', 'Water treatment plants', 'Pumping stations', 'Irrigation systems', 'Industrial piping'],
    compliance: ['EN 1074', 'EN 1092-2', 'ISO 5208'],
    price: 0,
    inStock: true,
    featured: false,
    color: '#0f2942',
  },
];

// Search helper
export function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}