import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { packageAPI, destinationAPI } from '../services/endpoints.js';
import PackageForm from '../components/PackageForm.jsx';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function Packages() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'packages'],
    queryFn: () => packageAPI.list({ limit: 100 }).then((res) => res.data.data),
  });

  const { data: destinations } = useQuery({
    queryKey: ['admin', 'destinations'],
    queryFn: () => destinationAPI.list().then((res) => res.data.data),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'packages'] });

  const createMutation = useMutation({
    mutationFn: (data) => packageAPI.create(data),
    onSuccess: () => { invalidate(); closeForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => packageAPI.update(id, data),
    onSuccess: () => { invalidate(); closeForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => packageAPI.remove(id),
    onSuccess: invalidate,
  });

  const closeForm = () => {
    setShowForm(false);
    setEditingPackage(null);
  };

  const handleSubmit = (formData) => {
    if (editingPackage) {
      updateMutation.mutate({ id: editingPackage._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (pkg) => {
    if (window.confirm(`Deactivate "${pkg.title}"? It will be hidden from customers.`)) {
      deleteMutation.mutate(pkg._id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">Packages</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary-700 hover:bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg transition">
            <Plus size={18} /> Add Package
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <PackageForm
            initialData={editingPackage}
            destinations={destinations}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </div>
      )}

      {isLoading && <p className="text-gray-500">Loading packages...</p>}
      {isError && <p className="text-red-500">Could not load packages.</p>}

      {!isLoading && !isError && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.map((pkg) => (
                <tr key={pkg._id}>
                  <td className="px-4 py-3 font-medium text-gray-800">{pkg.title}</td>
                  <td className="px-4 py-3 text-gray-500">{pkg.destination?.name}</td>
                  <td className="px-4 py-3 text-gray-700">${pkg.price}</td>
                  <td className="px-4 py-3 text-gray-500">{pkg.avgRating?.toFixed(1) || 'New'} ({pkg.reviewCount})</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => { setEditingPackage(pkg); setShowForm(true); }}
                        className="text-primary-600 hover:text-primary-800" title="Edit">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(pkg)}
                        className="text-red-500 hover:text-red-700" title="Deactivate">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data?.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">No packages yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}