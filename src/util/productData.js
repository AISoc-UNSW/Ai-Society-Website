// Product images from Figma
const imgAaa000471 = "https://www.figma.com/api/mcp/asset/4a460ff1-c809-451b-bf0a-c02727b847e1";
const imgAaa000651 = "https://www.figma.com/api/mcp/asset/0b85a4e8-d661-496e-b9f2-80c3e3dfa698";
const imgAaa001131 = "https://www.figma.com/api/mcp/asset/47d7480d-329b-4603-8899-e5a348628d81";
const imgAaa000191 = "https://www.figma.com/api/mcp/asset/7e09b62e-5124-47ca-ad0b-e3e837bf10bd";
const imgAaa000831 = "https://www.figma.com/api/mcp/asset/324947ea-814b-4e9d-a7ca-61b681966410";
const imgAaa001351 = "https://www.figma.com/api/mcp/asset/928df764-4b0d-412f-96c1-f27cc50cfbbc";

export const products = [
  {
    id: 1,
    title: "'What if machines could dream?' Crewneck",
    category: "Bone",
    productType: "Basic Slim Fit T-Shirt",
    price: "59.90",
    mainImage: imgAaa000471,
    galleryImages: [
      imgAaa000471,
      imgAaa000651,
      imgAaa001131,
      imgAaa000191,
    ],
    colors: [
      { name: 'Beige', value: '#EAE0D5' },
      { name: 'Black', value: '#000000' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: "This is a detailed description for the 'What if machines could dream?' Crewneck.",
    alt: "AISOC Bone T-Shirt",
  },
  {
    id: 2,
    title: "Classic Black AISOC Tee",
    category: "Bone",
    productType: "Basic Slim Fit T-Shirt",
    price: "29.90",
    mainImage: imgAaa000651,
    galleryImages: [
      imgAaa000651,
      imgAaa000471,
      imgAaa000831,
      imgAaa001351,
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Beige', value: '#EAE0D5' }
    ],
    sizes: ['S', 'M', 'L'],
    details: "A classic black t-shirt with the AISOC logo.",
    alt: "AISOC Black T-Shirt",
  },
  {
    id: 3,
    title: "Dreamer's Bone Crewneck",
    category: "Bone",
    productType: "Basic Slim Fit T-Shirt",
    price: "59.90",
    mainImage: imgAaa001131,
    galleryImages: [
      imgAaa001131,
      imgAaa000191,
      imgAaa000471,
      imgAaa000651,
    ],
    colors: [
      { name: 'Beige', value: '#EAE0D5' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: "A comfortable and stylish crewneck.",
    alt: "AISOC Bone Crewneck",
  },
  {
    id: 4,
    title: "Signature Black Hoodie",
    category: "Bone",
    productType: "Basic Slim Fit T-Shirt",
    price: "79.90",
    mainImage: imgAaa000191,
    galleryImages: [
      imgAaa000191,
      imgAaa001351,
      imgAaa000651,
      imgAaa000831,
    ],
    colors: [
      { name: 'Black', value: '#000000' }
    ],
    sizes: ['M', 'L', 'XL'],
    details: "The official AISOC signature black hoodie.",
    alt: "AISOC Black Hoodie",
  },
  {
    id: 5,
    title: "Casual Bone T-Shirt",
    category: "Bone",
    productType: "Basic Slim Fit T-Shirt",
    price: "29.90",
    mainImage: imgAaa000831,
    galleryImages: [
      imgAaa000831,
      imgAaa000471,
      imgAaa000651,
      imgAaa001131,
    ],
    colors: [
      { name: 'Beige', value: '#EAE0D5' },
    ],
    sizes: ['XS', 'S', 'M'],
    details: "A casual t-shirt for everyday wear.",
    alt: "AISOC Bone T-Shirt",
  },
  {
    id: 6,
    title: "Stealth Black Hoodie",
    category: "Bone",
    productType: "Basic Slim Fit T-Shirt",
    price: "79.90",
    mainImage: imgAaa001351,
    galleryImages: [
      imgAaa001351,
      imgAaa000191,
      imgAaa000471,
      imgAaa000831,
    ],
    colors: [
      { name: 'Black', value: '#000000' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: "A sleek and comfortable black hoodie.",
    alt: "AISOC Black Hoodie",
  },
];
