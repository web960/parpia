export type AccountForm = {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
};

export const accountForms: AccountForm[] = [
  {
    id: "account-opening-form",
    title: "Account Opening Form",
    description: "Complete and return to open a trading account with Parpia Gold.",
    pdfUrl:
      "https://parpiagold.com/wp-content/uploads/2024/03/f431e842-2382-4770-b56e-3a40c7a01036.pdf",
  },
  {
    id: "precious-metal-trading-agreement",
    title: "Precious Metal Trading Agreement",
    description: "Terms and conditions for precious metal trading services.",
    pdfUrl:
      "https://parpiagold.com/wp-content/uploads/2024/03/0695636b-f9f7-47b2-8d25-4faeb83391f9.pdf",
  },
  {
    id: "authorization-letter",
    title: "Authorization Letter",
    description: "Authorization documentation for account representatives.",
    pdfUrl:
      "https://parpiagold.com/wp-content/uploads/2024/03/54205e02-152e-4ed9-a336-5b1b586a5160.pdf",
  },
  {
    id: "supply-chain-policy",
    title: "Supply Chain Policy",
    description: "Our supply chain and sourcing policy documentation.",
    pdfUrl:
      "https://parpiagold.com/wp-content/uploads/2024/03/c7187c24-966f-4dd9-b0d0-94d08bb1f3ec.pdf",
  },
];

export const openAccountInstructions =
  "If you are interested in trading with us, please fill in the account forms below and return them to info@parpiagold.com. Please submit any other relevant documents requested on the application forms.";
