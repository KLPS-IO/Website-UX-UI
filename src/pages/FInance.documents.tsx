import { PageHeader, Surface } from "@/components/finance/PageHeader";
import { documents } from "@/lib/finance-data";
import { Download, FileText, Upload } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Data room"
        title="Documents"
        description="All source files that underpin the model — contracts, statements, quotes and legals."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-orange/90">
            <Upload className="h-4 w-4" /> Upload
          </button>
        }
      />

      <Surface padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Size</th>
                <th className="px-5 py-3 font-medium">Updated</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => (
                <tr key={d.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy/60 text-brand-sage">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{d.category}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">{d.type}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{d.size}</td>
                  <td className="px-5 py-3 text-muted-foreground">{d.updatedAt}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="rounded-md border border-white/5 p-1.5 text-muted-foreground hover:text-foreground">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Surface>
    </div>
  );
}
