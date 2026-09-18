// Product presentation helpers only. Cash, forecasts and KPIs come from /canonical-model.
import {getProducts} from '@/services/products/products';
import {totalUnitCost,grossProfit,grossMargin} from '@/services/products/products.engine';
export {currency,currencyShort,pct,MONTHS,START,expenseCategories} from '@/finance/financialEngine';
export const products=getProducts();
export const productMargin=(p:(typeof products)[number])=>({cogs:totalUnitCost(p),gross:grossProfit(p),marginPct:grossMargin(p)});
