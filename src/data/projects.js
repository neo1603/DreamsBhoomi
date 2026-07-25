// Real projects now live in Firestore (see admin → Projects). This array
// intentionally stays empty rather than holding dummy/demo entries —
// getStatusColor/extractPriceValue below are still real shared helpers.
export const projects = [];

export const getStatusColor = (status) => {
  switch (status) {
    case 'ONGOING':
    case 'BOOKED':
      return 'warning';
    case 'UPCOMING':
      return 'info';
    case 'COMPLETED':
    case 'AVAILABLE':
      return 'success';
    case 'SOLD':
      return 'default';
    default:
      return 'default';
  }
};

// Best-effort numeric extraction for the "sort by price" control — the data
// mixes per-sq-yd rates, lump-sum lakh figures, and "contact for pricing".
// Unparseable entries sort to the end regardless of direction.
export const extractPriceValue = (priceStr) => {
  if (!priceStr) return Infinity;
  const match = priceStr.match(/[\d,]+(\.\d+)?/);
  if (!match) return Infinity;
  const numeric = parseFloat(match[0].replace(/,/g, ''));
  if (Number.isNaN(numeric)) return Infinity;
  if (/lakh/i.test(priceStr)) return numeric * 100000;
  if (/crore|cr\b/i.test(priceStr)) return numeric * 10000000;
  return numeric;
};
