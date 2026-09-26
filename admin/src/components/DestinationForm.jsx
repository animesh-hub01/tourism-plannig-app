import { useState, useEffect } from 'react';

const emptyForm = { name: '', country: '', description: '', imageUrl: '', popular: false };

export default function DestinationForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <h3 className="font-bold text-gray-800">{initialData ? 'Edit Destination' : 'Add New Destination'}</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-500">Name</label>
          <input name="name" required value={form.name} onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Country</label>
          <input name="country" required value={form.country} onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500">Description</label>
        <textarea name="description" required rows={3} value={form.description} onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500">Image URL</label>
        <input name="imageUrl" required value={form.imageUrl} onChange={handleChange}
          placeholder="https://images.unsplash.com/..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" name="popular" checked={form.popular} onChange={handleChange} />
        Show in "Popular Destinations" on the homepage
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitting}
          className="bg-primary-700 hover:bg-primary-600 text-white font-semibold px-5 py-2 rounded-lg transition disabled:opacity-60">
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Destination'}
        </button>
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700 font-medium px-5 py-2">
          Cancel
        </button>
      </div>
    </form>
  );
}