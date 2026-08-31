export default function UserDetails({ formData, isEditing, onInputChange }) {
  if (isEditing) {
    return (
      <div className="grid grid-cols-2 gap-4 max-w-md mb-4 pt-1">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-[#eb5b00] focus:border-[#eb5b00] outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-[#eb5b00] focus:border-[#eb5b00] outline-none"
          />
        </div>
      </div>
    );
  }

  return (
    <h3 className="text-xl font-bold text-gray-900 mb-2 pt-1">
      {formData.firstName} {formData.lastName}
    </h3>
  );
}
