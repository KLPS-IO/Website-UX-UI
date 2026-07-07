import { PageHeader, Surface } from "@/components/finance/PageHeader";
import { KpiCard } from "@/components/finance/KpiCard";
import { A, currency, currencyShort, hires, monthlyPayroll, START, MONTHS } from "@/lib/finance-data";
import { Users } from "lucide-react";

export default function HiringPage() {
  const totalHead = hires.length;
  const activeHead = hires.filter((h) => h.status === "Active").length;
  const monthlyNow = monthlyPayroll(0, START);
  const monthlyEnd = monthlyPayroll(MONTHS - 1, START);
  const annual = Array.from({ length: 12 }, (_, i) => monthlyPayroll(i, START)).reduce((a, b) => a + b, 0);

  const statusStyle = (s: string) =>
    s === "Active" ? "bg-brand-sage/15 text-brand-sage" : s === "Offer Out" ? "bg-brand-orange/15 text-brand-orange" : "bg-brand-purple/15 text-brand-purple";

  return (
    <div>
      <PageHeader eyebrow="Team" title="Hiring Plan" description={`Payroll includes Employer NI + benefits of ${(A("hire_ramp") * 100).toFixed(0)}%.`} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Headcount (total)" value={totalHead.toString()} hint={`${activeHead} active`} icon={Users} accent="orange" />
        <KpiCard label="Monthly Payroll (now)" value={currencyShort(monthlyNow)} accent="coral" />
        <KpiCard label="Monthly Payroll (Y2)" value={currencyShort(monthlyEnd)} accent="purple" />
        <KpiCard label="Year 1 Payroll" value={currencyShort(annual)} accent="sage" />
      </div>

      <Surface className="mt-6" padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Department</th>
                <th className="px-5 py-3 font-medium">Salary</th>
                <th className="px-5 py-3 font-medium">Employer costs</th>
                <th className="px-5 py-3 font-medium">Fully-loaded</th>
                <th className="px-5 py-3 font-medium">Start</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {hires.map((h) => {
                const emp = h.salary * A("hire_ramp");
                return (
                  <tr key={h.id} className="border-t border-white/5">
                    <td className="px-5 py-3 font-medium">{h.role}</td>
                    <td className="px-5 py-3 text-muted-foreground">{h.department}</td>
                    <td className="px-5 py-3">{currency(h.salary)}</td>
                    <td className="px-5 py-3 text-muted-foreground">{currency(emp)}</td>
                    <td className="px-5 py-3 font-medium">{currency(h.salary + emp)}</td>
                    <td className="px-5 py-3 text-muted-foreground">{h.startDate}</td>
                    <td className="px-5 py-3"><span className={`rounded-md px-2 py-1 text-xs font-medium ${statusStyle(h.status)}`}>{h.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Surface>
    </div>
  );
}
