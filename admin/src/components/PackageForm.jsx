import { useState, useEffect } from 'react';

const emptyForm = {
  title: '', destination: '', description: '', price: '', nights: '', days: '', maxTravelers: 10,
};

export default function PackageForm({ initialData, destinations, onSubmit, onCancel, isSubmitting }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        destination: initialData.destination?._id || initialData.destination || '',
        description: initialData.description || '',
        price: initialData.price ?? '',
        nights: initialData.duration?.nights ?? '',
        days: initialData.duration?.days ?? '',
        maxTravelers: initialData.maxTravelers ?? 10,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: form.title,
      destination: form.destination,
      description: form.description,
      price: Number(form.price),
      duration: { nights: Number(form.nights), days: Number(form.days) },
      maxTravelers: Number(form.maxTravelers),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <h3 className="font-bold text-gray-800">{initialData ? 'Edit Package' : 'Add New Package'}</h3>

      <div>
        <label className="text-xs font-semibold text-gray-500">Title</label>
        <input name="title" required value={form.title} onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500">Destination</label>
        <select name="destination" required value={form.destination} onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1">
          <option value="">Select a destination</option>
          {destinations?.map((d) => (
            <option key={d._id} value={d._id}>{d.name}, {d.country}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500">Description</label>
        <textarea name="description" required rows={3} value={form.description} onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-500">Price ($)</label>
          <input type="number" name="price" required min="0" value={form.price} onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Max Travelers</label>
          <input type="number" name="maxTravelers" required min="1" value={form.maxTravelers} onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Nights</label>
          <input type="number" name="nights" required min="0" value={form.nights} onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Days</label>
          <input type="number" name="days" required min="1" value={form.days} onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitting}
          className="bg-primary-700 hover:bg-primary-600 text-white font-semibold px-5 py-2 rounded-lg transition disabled:opacity-60">
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Package'}
        </button>
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700 font-medium px-5 py-2">
          Cancel
        </button>
      </div>
    </form>
  );
}