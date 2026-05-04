import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import InputPriceField from '../../components/InputPriceField'

function ModalEditRecord({ isOpen, onClose, onSubmit, data }) {
  const [formData, setFormData] = useState(data)
  const plantVarieties = [
    "Vegetables",
    "Leafy Greens",
    "Root Crops",
    "Herbs",
    "Fruits",
    "Legumes",
    "Spices",
    "Mushrooms",
    "Ornamentals",
    "Medicinal Plants",
    "Vines",
    "Fruit Trees",
    "Other",
    "Unknown",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: '',
      variety: '',
      notes: '',
      date_planted: '',
      seedling_count: '',
      batch_name: '',
      starting_fund: '',
      supplier: ''
    })
  }
  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: '',
      variety: '',
      notes: '',
      date_planted: '',
      seedling_count: '',
      batch_name: '',
      starting_fund: '',
      supplier: ''
    })
    onClose()
  }

  useEffect( () => {
    setFormData(data);
  }, [data])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Plant Record</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData?.name || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., Tomato, Lettuce"
              />
            </div>

            {/* Variety */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variety <span className="text-red-500">*</span>
              </label>
              <select
                name="variety"
                value={formData?.variety || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="">Select a variety</option>
                {plantVarieties.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch Name
              </label>
              <input
                type="text"
                name="batch_name"
                value={formData?.batch_name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., Batch A, Spring 2024"
              />
            </div>

            {/* Seedling Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seedling Source
              </label>
              <input
                type="text"
                name="seedling_source"
                value={formData?.seedling_source || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., Local Supplier, Seed Company"
              />
            </div>

            {/* Seedling Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seedling Count
              </label>
              <input
                type="number"
                name="seedling_count"
                value={formData?.seedling_count || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., 100"
              />
            </div>

            {/* Date Planted */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Planted
              </label>
              <input
                type="date"
                name="date_planted"
                value={formData?.date_planted || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Starting Fund */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Starting Fund
              </label>
              <InputPriceField
                value={formData?.starting_fund || ''}
                onChange={(value) => setFormData(prev => ({ ...prev, starting_fund: value }))}
                placeholder="₱ 0.00"
              />
            </div>

            {/* Notes - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData?.notes || ''}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                placeholder="Add any additional notes about this plant..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium"
            >
              Update Record
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalEditRecord;
