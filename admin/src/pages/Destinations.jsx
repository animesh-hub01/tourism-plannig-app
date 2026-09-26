import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { destinationAPI } from '../services/endpoints.js';
import DestinationForm from '../components/DestinationForm.jsx';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function Destinations() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'destinations'],
    queryFn: () => destinationAPI.list().then((res) => res.data.data),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'destinations'] });

  const createMutation = useMutation({
    mutationFn: (data) => destinationAPI.create(data),
    onSuccess: () => { invalidate(); closeForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => destinationAPI.update(id, data),
    onSuccess: () => { invalidate(); closeForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => destinationAPI.remove(id),
    onSuccess: () => { invalidate(); setDeleteError(''); },
    onError: (err) => setDeleteError(err.response?.data?.message || 'Could not delete this destination.'),
  });

  const closeForm = () => {
    setShowForm(false);
    setEditingDestination(null);
  };

  const handleSubmit = (formData) => {
    if (editingDestination) {
      updateMutation.mutate({ id: editingDestination._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (dest) => {
    setDeleteError('');
    if (window.confirm(`Delete "${dest.name}"? This cannot be undone.`)) {
      deleteMutation.mutate(dest._id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">Destinations</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary-700 hover:bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg transition">
            <Plus size={18} /> Add Destination
          </button>
        )}
      </div>

      {deleteError && <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{deleteError}</div>}

      {showForm && (
        <div className="mb-6">
          <DestinationForm
            initialData={editingDestination}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </div>
      )}

      {isLoading && <p className="text-gray-500">Loading destinations...</p>}
      {isError && <p className="text-red-500">Could not load destinations.</p>}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((dest) => (
            <div key={dest._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-28 bg-gradient-to-br from-primary-500 to-accent-500">
                {dest.imageUrl && <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">{dest.name}</h3>
                  {dest.popular && (
                    <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-semibold">Popular</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{dest.country}</p>
                <div className="flex justify-end gap-3 mt-3">
                  <button onClick={() => { setEditingDestination(dest); setShowForm(true); }}
                    className="text-primary-600 hover:text-primary-800" title="Edit">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(dest)}
                    className="text-red-500 hover:text-red-700" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {data?.length === 0 && (
            <p className="text-gray-400 col-span-full text-center py-6">No destinations yet.</p>
          )}
        </div>
      )}
    </div>
  );
}