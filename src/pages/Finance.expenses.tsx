import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Surface, SectionTitle } from "@/components/finance/PageHeader";
import { ChartCard, chartTheme } from "@/components/finance/ChartCard";
import { currency, currencyShort, expenseCategories, monthLabels, monthlyExpenses } from "@/lib/finance-data";

export default function ExpensesPage() {
  const trend = monthLabels().map((m, i) => {
    const e = monthlyExpenses(i);
    return { month: m, ...e, Total: Object.values(e).reduce((a, b) => a + b, 0) };
  });
  const breakdown = expenseCategories.map((cat) => {
    let total = 0;
    for (let i = 0; i < 12; i++) total += monthlyExpenses(i)[cat];
    return { category: cat, value: total };
  });
  const grand = breakdown.reduce((s, r) => s + r.value, 0);

  return (
    <div>
      <PageHeader eyebrow="Outflows" title="Expenses" description="Categorised operating costs modelled monthly across the 18-month horizon." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Expense Trend" hint="18 months" className="lg:col-span-2" height={320}>
          <ResponsiveContainer>
            <LineChart data={trend}>
              <CartesianGrid stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currencyShort(v)} />
              <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {expenseCategories.map((c, i) => (
                <Line key={c} type="monotone" dataKey={c} stroke={chartTheme.colors[i % chartTheme.colors.length]} strokeWidth={1.75} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <Surface>
          <SectionTitle title="Category Split" hint="year 1" />
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={breakdown} layout="vertical" margin={{ left: 0, right: 10, top: 4, bottom: 4 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="category" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} width={95} />
                <Tooltip {...chartTheme.tooltip} formatter={(v: number) => currency(v)} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {breakdown.map((_, i) => <Cell key={i} fill={chartTheme.colors[i % chartTheme.colors.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 border-t border-white/5 pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Total (yr 1)</span><span className="font-semibold text-foreground">{currency(grand)}</span></div>
          </div>
        </Surface>
      </div>
    </div>
  );
}
