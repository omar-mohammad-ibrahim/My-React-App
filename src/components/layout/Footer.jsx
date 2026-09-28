import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-background border-t border-border text-foreground transition-colors select-none">
      {/* 1. القسم العلوي: أعمدة الروابط الخمسة مع وسائل التواصل */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-start">
          {/* العمود الأول: About NexusTrade */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground">
              {t("footer.aboutTitle", "About NexusTrade")}
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.whyChoose", "Why choose NexusTrade")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.coCreate", "Co-Create Pitch")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.corporate", "Corporate responsibility")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.careers", "Careers")}
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثاني: Order protection */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground">
              {t("footer.protectionTitle", "Order protection")}
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.securePayments", "Secure payments")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.moneyBack", "Money-back guarantee")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.guaranteedDelivery", "Guaranteed delivery")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.afterSales", "After-sales protections")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t(
                    "footer.productionMonitoring",
                    "Production monitoring & inspection services",
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.policiesRules", "Policies and rules")}
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: Source on NexusTrade */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground">
              {t("footer.sourceTitle", "Source on NexusTrade")}
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.verifiedMfrs", "Verified manufacturers")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.rfq", "Request for Quotation")}
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: Help Center */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground">
              {t("footer.helpTitle", "Help Center")}
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.buyerHelp", "Buyer Help Center")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.liveChat", "Live chat")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.dispute", "File a trade dispute")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.refunds", "Refunds")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.reportIp", "Report IP infringement")}
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  {t("footer.reportViolation", "Report a violation")}
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الخامس: Sell on NexusTrade + Stay Connected */}
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-foreground">
                {t("footer.sellTitle", "Sell on NexusTrade")}
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
                <li>
                  <Link
                    to="#"
                    className="hover:text-foreground hover:underline transition-colors"
                  >
                    {t("footer.startSelling", "Start selling")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-foreground hover:underline transition-colors"
                  >
                    {t("footer.orderStatus", "Check order status")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-foreground hover:underline transition-colors"
                  >
                    {t("footer.becomeVerified", "Become a Verified Supplier")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-foreground hover:underline transition-colors"
                  >
                    {t("footer.partnerships", "Partnerships")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex flex-col gap-2.5">
              <h5 className="text-xs font-bold text-foreground">
                {t("footer.stayConnected", "Stay Connected")}
              </h5>
              <div className="flex items-center gap-3 text-muted-foreground">
                <a
                  href="#facebook"
                  className="hover:text-primary transition-colors text-base"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#linkedin"
                  className="hover:text-primary transition-colors text-base"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="#twitter"
                  className="hover:text-primary transition-colors text-base"
                  aria-label="X Twitter"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="#instagram"
                  className="hover:text-primary transition-colors text-base"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#youtube"
                  className="hover:text-primary transition-colors text-base"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#tiktok"
                  className="hover:text-primary transition-colors text-base"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. القسم السفلي: الشركاء والروابط القانونية والحقوق */}
      <div className="border-t border-border/60 bg-muted/30 py-8 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-3.5">
          {/* شبكة المواقع والمنصات التابعة */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <span className="hover:text-foreground cursor-pointer">
              AliExpress
            </span>
            <span>|</span>
            <span className="hover:text-foreground cursor-pointer">
              1688.com
            </span>
            <span>|</span>
            <span className="hover:text-foreground cursor-pointer">
              Tmall Taobao World
            </span>
            <span>|</span>
            <span className="hover:text-foreground cursor-pointer">Lazada</span>
            <span>|</span>
            <span className="hover:text-foreground cursor-pointer">
              Taobao Global
            </span>
            <span>|</span>
            <span className="hover:text-foreground cursor-pointer">TAO</span>
            <span>|</span>
            <span className="hover:text-foreground cursor-pointer">
              Trendyol
            </span>
            <span>|</span>
            <span className="hover:text-foreground cursor-pointer">
              Europages
            </span>
          </div>

          {/* السياسات والخصوصية والشروط */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <Link to="#" className="hover:text-foreground transition-colors">
              Legal Notice
            </Link>
            <span>·</span>
            <Link to="#" className="hover:text-foreground transition-colors">
              Product Listing Policy
            </Link>
            <span>·</span>
            <Link to="#" className="hover:text-foreground transition-colors">
              Intellectual Property Protection
            </Link>
            <span>·</span>
            <Link to="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <span className="inline-flex items-center gap-1 hover:text-foreground cursor-pointer">
              <span className="inline-block px-1 py-0.2 bg-blue-600 text-white rounded text-[9px] font-bold">
                ✓✕
              </span>
              Your Privacy Choices
            </span>
            <span>·</span>
            <Link to="#" className="hover:text-foreground transition-colors">
              Terms of Use
            </Link>
            <span>·</span>
            <Link to="#" className="hover:text-foreground transition-colors">
              Integrity Compliance
            </Link>
          </div>

          {/* سطر الحقوق والرقم التجاري */}
          <div className="text-[11px] text-muted-foreground/80 mt-1">
            © 1999-2026 NexusTrade.com. All rights reserved. 版权所有:
            杭州阿里巴巴海外信息技术有限公司
          </div>
        </div>
      </div>
    </footer>
  );
}
