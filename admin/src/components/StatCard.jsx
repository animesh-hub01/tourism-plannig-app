export default function StatCard({ label, value, icon: Icon }) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
        <div className="bg-primary-100 text-primary-700 rounded-full p-3">
          <Icon size={22} />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    );
  }