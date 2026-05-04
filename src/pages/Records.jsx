import { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ModalNewRecord from './records/ModalNewRecord';
import ModalEditRecord from './records/ModalEditRecord';
import PlantLoading from '../components/PlantLoading';
import { api } from '../api';
import { toast } from 'sonner';

function Records() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [isEditRecord, setIsEditRecord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null); // id of deleting record
  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSearchPlants = async (query) => {
    // feat: search from the backend; in case that all records is not yet loaded
    if (!query.trim()) {
      setCurrentPage(1);
      setHasMore(true);
      handleLoadRecords(1, false);
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await api.get(`/plants/search`, {
        params: { q: query }
      });
      setRecords(response.data?.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Error searching records.");
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleLoadRecords = async (page = 1) => {
    try {
      setIsLoading(true);
      
      const response = await api.get(`/plants`, {
        params: { page, per_page: 10 }
      });
      
      const newRecords = response.data?.data || [];
      
      setRecords(newRecords);
      
      // Check if there are more records
      setHasMore(newRecords.length === 10);
    } catch (error) {
      console.error(error);
      toast.error("Error loading records.");
    } finally {
      setIsLoading(false);
    }
  }
  const handleAddRecord = async (formData) => {
    try {
      const response = await api.post(`/plants`, formData);
      setRecords(prev => [response.data?.data || formData, ...prev]);
      toast.success("New record saved.");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Error encountered while saving record.");
    }

    setIsModalOpen(false)
  }
  
  const handleUpdateRecord = async (data) => {
    try {
      const response = await api.put(`/plants/${data.id}`, data);
      setRecords(prev => prev.map(record => 
        record.id === data.id ? response.data?.data || data : record
      ));
      toast.success("Plant data updated.");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Error encountered during update.");
    } finally {
      setIsEditRecord(false);
    }
  }
  
  const handleDeleteRecord = async (data) => {
    try {
      const isDelete = confirm("Are you sure you want to delete this record?");
      if (isDelete) {
        setIsDeleting(data.id);
        await api.delete(`/plants/${data.id}`);
        setRecords(prev => prev?.filter( val => data.id !== val.id))
        toast.success("Plant data deleted.");
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.message || "Error encountered while deleting record.");
    } finally {
      setIsDeleting(null);
    }
  }
  const filteredRecords = records.filter(record =>
    record.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.variety?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.seedling_source?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // initial record loading
  useEffect(() => {
    handleLoadRecords(1, false);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className='flex flex-grow'></div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 
          transition duration-200 flex items-center gap-2 cursor-pointer"
        >
          <FaPlus />
          Add New Record
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearchPlants(e.target.value); // feat: search from the backend
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <PlantLoading size='2xl' variant='pulse' text="Loading records" />
          </div>
        )}
        <div className="overflow-x-auto max-h-[580px] overflow-y-auto">
          <table className="relative w-full">
            <thead className="bg-green-50 sticky top-0 z-10">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Plant Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Variety</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Batch Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Seedling Source</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Seedling Count</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Starting Fund</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date Planted</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700"></th>
              </tr>
            </thead>
            <tbody>

              {
                filteredRecords.length === 0 && !isLoading ? (
                  <tr>
                    <td colSpan={8} className='py-10 text-center text-gray-500'>
                      {searchTerm ? "No records found matching your search." : "No records found."}
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm text-gray-800 font-medium">{record.name}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{record?.variety || "-"}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{record?.batch_name || "-"}</td>
                        <td className="py-4 px-6 text-sm text-gray-800 font-medium">{record?.seedling_source || "-"}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{record?.seedling_count || "-"}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{record?.starting_fund || "0"}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{record?.date_planted || "-"}</td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="cursor-pointer text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded"
                              title="Edit Record"
                              onClick={() => { setDataToUpdate(record); setIsEditRecord(true) }}>
                              <FaEdit />
                            </button>
                            <button className="cursor-pointer text-red-600 hover:text-red-700 p-2 
                              hover:bg-red-50 rounded"
                              onClick={() => { handleDeleteRecord(record) }}
                                title="Delete Record"
                                disabled={isDeleting === record.id}
                              >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  </>
                )
              }
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        {!searchTerm && records.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={() => {
                const prev = currentPage - 1;
                setCurrentPage(prev);
                handleLoadRecords(prev, false);
              }}
              disabled={currentPage === 1 || isLoading}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">Page {currentPage}</span>
            <button
              onClick={() => {
                const next = currentPage + 1;
                setCurrentPage(next);
                handleLoadRecords(next, false);
              }}
              disabled={!hasMore || isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <ModalNewRecord
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRecord}
      />

      <ModalEditRecord
        isOpen={isEditRecord}
        onClose={() => setIsEditRecord(false)}
        data={dataToUpdate}
        onSubmit={handleUpdateRecord}
      />
    </div>
  )
}

export default Records
