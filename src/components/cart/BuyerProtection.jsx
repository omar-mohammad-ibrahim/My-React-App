import { ShieldCheck, Truck, CircleDollarSign } from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

export default function BuyerProtection() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-xs">
      <h3 className="font-bold text-sm sm:text-base mb-4 select-none">
        NexusTrade.com order protection
      </h3>

      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-success shrink-0" />
              <span>Secure payments</span>
            </div>

            <div className="flex items-center gap-1.5 text-lg ml-auto sm:ml-1">
              <FaCcVisa size={20} />
              <FaCcMastercard size={20} />
              <FaCcPaypal size={20} />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 ml-7 leading-relaxed">
            Every payment you make on NexusTrade.com is secured with strict SSL
            encryption and PCI DSS data protection protocol.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <Truck size={20} className="text-success shrink-0" />
            <span>Guaranteed delivery</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 ml-7 leading-relaxed">
            For eligible products, expect your order to be delivered by the
            scheduled date or receive a 5% delay compensation.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <CircleDollarSign size={20} className="text-success shrink-0" />
            <span>Money-back protection</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 ml-7 leading-relaxed">
            Claim a refund if your order was not shipped, is missing, or arrives
            with product issues.
          </p>
        </div>
      </div>
    </div>
  );
}
