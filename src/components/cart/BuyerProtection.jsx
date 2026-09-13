export default function BuyerProtection({ showDetails = true }) {
  return (
    <div className="text-sm">
      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
        <span>🛡️</span> Order Protection
      </h3>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
            <span>🔒</span> Secure payments
          </div>
          {showDetails && (
            <p className="text-muted-foreground text-xs mt-1 ml-6 leading-relaxed">
              Every transaction is processed through encrypted SSL protocols and
              industry compliance standards.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
            <span>🚚</span> Guaranteed delivery
          </div>
          {showDetails && (
            <p className="text-muted-foreground text-xs mt-1 ml-6 leading-relaxed">
              Standard dispatch monitoring ensures deliveries arrive aligned
              with scheduled dates.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
            <span>💰</span> Money-back terms
          </div>
          {showDetails && (
            <p className="text-muted-foreground text-xs mt-1 ml-6 leading-relaxed">
              Refund options apply if shipments do not fulfill product order
              specifications.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
