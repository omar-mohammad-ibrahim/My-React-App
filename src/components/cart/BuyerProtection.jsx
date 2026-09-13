export default function BuyerProtection({ showDetails = true }) {
  return (
    <div className="text-sm">
      <h3 className="font-bold text-gray-800 mb-3">
        Alibaba.com order protection
      </h3>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 font-semibold text-green-700">
            <span>🛡️</span> Secure payments
          </div>
          {showDetails && (
            <p className="text-gray-500 text-xs mt-1 ml-6">
              Every payment you make on Alibaba.com is secured with strict SSL
              encryption.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-green-700">
            <span>🚚</span> Guaranteed delivery
          </div>
          {showDetails && (
            <p className="text-gray-500 text-xs mt-1 ml-6">
              For eligible products, expect your order to be delivered by the
              scheduled date.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-green-700">
            <span>💰</span> Money-back protection
          </div>
          {showDetails && (
            <p className="text-gray-500 text-xs mt-1 ml-6">
              Claim a refund if your order was not shipped, is missing, or
              arrives with issues.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
