import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../services/endpoints.js';

export default function Users() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => userAPI.list().then((res) => res.data.data),
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">Customers</h1>

      {isLoading && <p className="text-gray-500">Loading customers...</p>}
      {isError && <p className="text-red-500">Could not load customers.</p>}

      {!isLoading && !isError && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.map((u) => (
                <tr key={u._id}>
                  <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3 text-gray-500">{u.phone || '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {data?.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">No customers yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}