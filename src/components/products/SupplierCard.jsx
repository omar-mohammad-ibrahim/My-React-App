import { Store, MapPin } from "lucide-react";

export default function SupplierCard({ supplier }) {
  if (!supplier) return null;

  return (
    <div className="bg-card text-card-foreground p-4 rounded-xl border border-border shadow-xs flex flex-col gap-3 transition-colors">
      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Supplier Information
      </div>

      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="w-12 h-12 bg-muted/60 border border-border rounded-lg flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
          <Store className="w-6 h-6" />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {supplier.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="font-medium text-foreground/80 truncate">
              {supplier.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
