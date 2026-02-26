const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Total Tasks', 'Active Goals', 'Skills', 'Current Streak'].map((label) => (
          <div key={label} className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm">{label}</p>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;