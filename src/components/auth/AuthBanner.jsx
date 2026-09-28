import {
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Globe2,
  CheckCircle2,
} from "lucide-react";

export default function AuthBanner() {
  return (
    <div className="relative w-full max-w-[720px] h-[620px] rounded-[36px] overflow-hidden border border-border/80 bg-linear-to-br from-card via-card/90 to-primary/10 p-8 flex flex-col justify-between shadow-2xl select-none">
      {/* 1. تأثيرات الإضاءة الخلفية المتوهجة (Aura & Glow Effects) */}
      <div className="absolute -top-24 -start-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -end-24 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* خلفية شبكية خفيفة هندسية */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* 2. رأس البنر: الشعار والـ Badge الخاص بـ AI Mode */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-black tracking-tight text-foreground">
            Nexus<span className="text-primary">Trade</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Mode 2.0</span>
        </div>
      </div>

      {/* 3. قلب البنر: العنوان الرئيسي والبطاقات العائمة الثلاثية الأبعاد */}
      <div className="relative z-10 my-auto flex flex-col gap-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary block mb-2">
            Next-Gen B2B Sourcing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-snug">
            Trade Smarter. <br />
            Source Faster Globally.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
            Connect with verified manufacturers, request quotes instantly, and
            secure your transactions on NexusTrade.
          </p>
        </div>

        {/* الكروت العائمة (Glassmorphic Floating Cards) */}
        <div className="flex flex-col gap-3 pt-2">
          {/* كرت الحماية والضمان */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-background/60 backdrop-blur-md border border-border shadow-xs hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-start">
                <h4 className="text-xs font-bold text-foreground">
                  Trade Assurance
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  100% Payment & Order Protection
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-success bg-success/15 px-2 py-0.5 rounded-full border border-success/20">
              Active
            </span>
          </div>

          {/* كرت شبكة المصانع الموثقة */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-background/60 backdrop-blur-md border border-border shadow-xs hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-600 dark:text-orange-400">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="text-start">
                <h4 className="text-xs font-bold text-foreground">
                  Verified Factories
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Over 34,000+ Inspected Suppliers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. إحصائيات سريعة في الأسفل */}
      <div className="relative z-10 pt-4 border-t border-border/60 grid grid-cols-3 gap-4 text-start">
        <div>
          <span className="text-base sm:text-lg font-black text-foreground block">
            34K+
          </span>
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">
            Manufacturers
          </span>
        </div>
        <div>
          <span className="text-base sm:text-lg font-black text-foreground block">
            190+
          </span>
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">
            Countries
          </span>
        </div>
        <div>
          <span className="text-base sm:text-lg font-black text-foreground block">
            24/7
          </span>
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">
            AI Support
          </span>
        </div>
      </div>
    </div>
  );
}
