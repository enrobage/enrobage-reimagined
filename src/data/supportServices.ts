import shadeGuide from "@/assets/shade-colour-guide.png";
import whoGmp from "@/assets/who-gmp.png";
import blueTablet from "@/assets/bagecoat-blue-tablet.png";

export type Service = {
  slug: string;
  image: string;
  bgColor: string;
  title: string;
  eyebrow: string;
  summary: string;
  intro: string[];
  sections: { heading?: string; items: string[] }[];
  closing?: string;
};

export const services: Service[] = [
  {
    slug: "shade-development-selection",
    image: shadeGuide,
    bgColor: "#ffffff",
    title: "Shade Development & Selection",
    eyebrow: "Colour Science",
    summary:
      "Accurate, reproducible and brand-true colour, engineered from lab bench to commercial batch.",
    intro: [
      "Every coated tablet represents a brand, and colour plays a critical role in product recognition, patient compliance, and market differentiation. Selecting the right shade requires more than matching a colour reference — it demands an understanding of coating chemistry, pigment compatibility, substrate colour, process variables, and regulatory requirements.",
      "Our shade development team works closely with customers to create coating systems that deliver accurate, reproducible, and aesthetically appealing finishes across different manufacturing scales.",
    ],
    sections: [
      {
        heading: "Our support includes",
        items: [
          "Development of custom colour shades based on brand identity or customer references.",
          "Pantone® and physical sample-based shade matching.",
          "Evaluation of opacity, brightness, gloss, and surface finish.",
          "Colour optimization for white, off-white, coloured, and naturally pigmented tablet cores.",
          "Guidance on pigment loading to achieve the desired appearance without compromising coating performance.",
          "Assessment of colour consistency under different processing conditions.",
          "Scale-up validation to ensure shade reproducibility from laboratory batches to commercial production.",
          "Support for reformulating discontinued or legacy coating colours.",
          "Development of mineral-free, titanium dioxide-free, and clean-label colour systems where required.",
          "Batch-to-batch colour consistency recommendations and process controls.",
        ],
      },
    ],
    closing:
      "Our objective is to ensure that every production batch delivers the same visual identity while maintaining excellent coating performance and manufacturing efficiency.",
  },
  {
    slug: "regulatory-documentation-support",
    image: whoGmp,
    bgColor: "#ffffff",
    title: "Regulatory & Documentation Support",
    eyebrow: "Compliance",
    summary:
      "Complete documentation to simplify qualification, submissions and audit readiness.",
    intro: [
      "Regulatory compliance is an essential aspect of pharmaceutical and nutraceutical manufacturing. A coating system must not only perform effectively during production but also satisfy regional regulatory expectations and customer documentation requirements.",
      "Enrobage provides comprehensive documentation support that enables customers to simplify qualification processes, facilitate regulatory submissions, and maintain audit readiness throughout the product lifecycle.",
    ],
    sections: [
      {
        heading: "Our documentation support includes",
        items: [
          "Product specification sheets.",
          "Technical Data Sheets (TDS).",
          "Safety Data Sheets (SDS/MSDS).",
          "Certificates of Analysis (CoA).",
          "Certificates of Compliance (CoC).",
          "Allergen declarations.",
          "GMO statements.",
          "BSE/TSE declarations.",
          "Residual solvent declarations.",
          "Heavy metal declarations.",
          "Titanium dioxide-free and mineral-free compliance statements, where applicable.",
          "Regulatory ingredient information.",
          "Composition and excipient documentation.",
          "Guidance on pharmacopeial compliance where relevant.",
          "Support during customer audits and supplier qualification processes.",
          "Documentation assistance for technology transfer and change control activities.",
        ],
      },
    ],
    closing:
      "Our regulatory team remains aligned with evolving global expectations, helping customers confidently navigate documentation requirements while ensuring transparency and traceability.",
  },
  {
    slug: "process-troubleshooting-assistance",
    image: blueTablet,
    bgColor: "#ffffff",
    title: "Process & Troubleshooting Assistance",
    eyebrow: "Process Engineering",
    summary:
      "Root-cause driven process optimization, scale-up and defect resolution on your equipment.",
    intro: [
      "Even well-designed coating systems can experience challenges due to equipment differences, environmental conditions, formulation changes, or process variability. Our technical experts provide hands-on scientific support to identify root causes and implement practical, sustainable solutions that improve process robustness and manufacturing efficiency.",
      "Rather than treating individual symptoms, we focus on optimizing the complete coating process — from tablet core characteristics to final coating performance.",
    ],
    sections: [
      {
        heading: "We assist with",
        items: [
          "Process optimization for new and existing coating systems.",
          "Scale-up support from laboratory to pilot and commercial production.",
          "Equipment parameter optimization.",
          "Spray rate, atomization, inlet temperature, airflow, and pan speed optimization.",
          "Coating process validation support.",
          "Technology transfer between manufacturing sites.",
          "Coating yield improvement.",
          "Reduction of process variability and batch rejection.",
          "Investigation of coating defects and root-cause analysis.",
          "Performance optimization across different tablet shapes, sizes, and formulations.",
        ],
      },
      {
        heading: "Common coating issues we help resolve",
        items: [
          "Tablet sticking and picking.",
          "Twinning.",
          "Colour variation.",
          "Mottling.",
          "Orange peel effect.",
          "Surface roughness.",
          "Cracking.",
          "Peeling and flaking.",
          "Chipping.",
          "Logo bridging and infilling.",
          "Poor adhesion.",
          "Spray drying.",
          "Overwetting.",
          "Erosion.",
          "Long coating process times.",
          "Inconsistent weight gain.",
          "Poor gloss and finish.",
        ],
      },
    ],
    closing:
      "By combining formulation expertise with process engineering, we help customers achieve stable, reproducible coating operations that deliver high-quality tablets with improved productivity and reduced manufacturing costs.",
  },
];

export const getService = (slug?: string) =>
  services.find((s) => s.slug === slug);
