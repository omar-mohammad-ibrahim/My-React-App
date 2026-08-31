export default function ContactInfo({ formData, isEditing }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-1">Email</h4>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{formData.email}</span>
            {!isEditing && formData.isEmailVerified && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">
                Verified
              </span>
            )}
          </div>
        </div>
        {isEditing && (
          <button className="text-blue-600 hover:underline text-sm font-medium">
            Edit
          </button>
        )}
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            Phone number
          </h4>
          <span className="text-sm text-gray-500">
            {formData.phone || "No phone number"}
          </span>
        </div>
        {isEditing && (
          <button className="text-blue-600 hover:underline text-sm font-medium">
            {formData.phone ? "Edit" : "Add"}
          </button>
        )}
      </div>
    </div>
  );
}
