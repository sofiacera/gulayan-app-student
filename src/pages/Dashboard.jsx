import { useEffect, useState } from "react";
import { FaLeaf, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
import { api } from "../api";

function Dashboard() {
 
  const [plants, setPlants] = useState([]);
  const [stats, setStats] = useState([
    {
      title: "Total Plants",
      value: "0",
      icon: FaLeaf,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Estimated Counts",
      value: "0",
      icon: FaUsers,
      color: "bg-blue-100 text-blue-600",
    }
  ]);
  //Helloo


  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await api.get('/plants', { params: { per_page: 10000 } }); // fetch all or large number
        const plantsData = response.data?.data || [];
        setPlants(plantsData);
        const totalPlants = plantsData.length;
        const estimatedCounts = plantsData.reduce((sum, plant) => sum + (plant.seedling_count || 0), 0);
        setStats([
          {
            title: "Total Plants",
            value: totalPlants.toString(),
            icon: FaLeaf,
            color: "bg-green-100 text-green-600",
          },
          {
            title: "Estimated Counts",
            value: estimatedCounts.toString(),
            icon: FaUsers,
            color: "bg-blue-100 text-blue-600",
          }
        ]);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
    fetchPlants();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Plants
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Variety
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Estimated Count
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Date Planted
                </th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr
                  key={`plant-${plant.id}`}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {plant.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {plant.variety}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {plant.estimated_count}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                    {new Date(plant.date_planted).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
