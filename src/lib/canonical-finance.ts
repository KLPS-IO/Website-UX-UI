/** Presentation only: values and unknowns come unchanged from the canonical server model. */
export const displayMoney=(value:string|null|undefined)=>value===null||value===undefined?'Not yet evidenced':new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',minimumFractionDigits:2}).format(Number(value));
export const displayDate=(value:string|null|undefined)=>value?new Date(value).toLocaleDateString('en-GB'):'Not yet evidenced';
