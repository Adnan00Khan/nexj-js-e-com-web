
import { NextApiRequest, NextApiResponse } from 'next';

const products = [
  { id: 1, name: 'Laptop', price: 1000, description: 'High-performance laptop', img:'https://helios-i.mashable.com/imagery/articles/05djrP5PjtVB7CcMtvrTOAP/hero-image.fill.size_1248x702.v1723100793.jpg' },
  { id: 2, name: 'Smartphone', price: 700, description: 'Latest model smartphone',img:'https://sparx.pk/cdn/shop/files/NeoxBrownPTALOGO.jpg?v=1721642419' },
  { id: 3, name: 'Headphones', price: 200, description: 'Noise-cancelling headphones',img:'https://static3.webx.pk/files/68529/Images/61kfsu-cykl.-ac-sl1500--68529-0-180124040712888.jpg' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products);
}

// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};