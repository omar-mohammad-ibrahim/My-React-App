import { useTranslation } from "react-i18next";
import { ShieldCheck, Truck, CircleDollarSign } from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

export default function BuyerProtection() {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-xs text-start">
      <h3 className="font-bold text-sm sm:text-base mb-4 select-none text-foreground">
        {t("cart.buyerProtection.title", "NexusTrade.com order protection")}
      </h3>

      <div className="flex flex-col gap-4">
        {/* الدفع الآمن */}
        <div>
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-success shrink-0" />
              <span className="text-foreground">
                {t("cart.buyerProtection.securePayments", "Secure payments")}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-lg ms-auto sm:ms-1 text-muted-foreground">
              <FaCcVisa size={20} />
              <FaCcMastercard size={20} />
              <FaCcPaypal size={20} />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 ms-7 leading-relaxed">
            {t(
              "cart.buyerProtection.securePaymentsDesc",
              "Every payment you make on NexusTrade.com is secured with strict SSL encryption and PCI DSS data protection protocol.",
            )}
          </p>
        </div>

        {/* التوصيل المضمون */}
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <Truck size={20} className="text-success shrink-0" />
            <span className="text-foreground">
              {t(
                "cart.buyerProtection.guaranteedDelivery",
                "Guaranteed delivery",
              )}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 ms-7 leading-relaxed">
            {t(
              "cart.buyerProtection.guaranteedDeliveryDesc",
              "For eligible products, expect your order to be delivered by the scheduled date or receive a 5% delay compensation.",
            )}
          </p>
        </div>

        {/* حماية استرداد الأموال */}
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <CircleDollarSign size={20} className="text-success shrink-0" />
            <span className="text-foreground">
              {t("cart.buyerProtection.moneyBack", "Money-back protection")}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 ms-7 leading-relaxed">
            {t(
              "cart.buyerProtection.moneyBackDesc",
              "Claim a refund if your order was not shipped, is missing, or arrives with product issues.",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
