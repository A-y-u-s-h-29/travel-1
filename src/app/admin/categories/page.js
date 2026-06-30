"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Tag, 
  FolderTree,
  Hash,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Grid3x3,
  List,
  Package,
  ArrowUpRight
} from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setName("");
      fetchCategories();
    } catch (error) {
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      setShowDeleteModal(null);
      fetchCategories();
    } catch (error) {
      alert("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setEditName(cat.name);
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setEditingId(null);
      fetchCategories();
    } catch (error) {
      alert("Failed to update category");
    } finally {
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const getCategoryColor = (index) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-emerald-500 to-emerald-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-orange-500 to-orange-600",
      "from-teal-500 to-teal-600",
      "from-indigo-500 to-indigo-600",
      "from-rose-500 to-rose-600",
      "from-cyan-500 to-cyan-600",
      "from-amber-500 to-amber-600",
    ];
    return colors[index % colors.length];
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.status !== 'archived').length;
  const totalPackages = categories.reduce((acc, cat) => acc + (cat.packageCount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <FolderTree className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Categories</h1>
                <p className="text-blue-100 text-sm mt-0.5">
                  Manage your package categories and organization
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid" 
                    ? "bg-white text-blue-600 shadow-lg" 
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list" 
                    ? "bg-white text-blue-600 shadow-lg" 
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Categories</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalCategories}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <FolderTree className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Categories</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{activeCategories}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Packages</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{totalPackages}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Category Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Add New Category</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter category name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Category
                </>
              )}
            </button>
          </form>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories by name or slug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              />
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {filteredCategories.length} category{filteredCategories.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Categories Display */}
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-gray-50 rounded-full">
                <FolderTree className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">No categories found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm ? "Try adjusting your search terms" : "Start by adding your first category"}
                </p>
              </div>
              {!searchTerm && (
                <button
                  onClick={() => document.querySelector('input[type="text"]')?.focus()}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              )}
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCategories.map((cat, index) => (
              <div
                key={cat._id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all duration-200 group hover:border-blue-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(index)} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-white font-bold text-lg">
                        {getInitials(cat.name)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      {editingId === cat._id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                            autoFocus
                          />
                          <button
                            onClick={() => handleUpdate(cat._id)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors flex-shrink-0"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="font-semibold text-gray-900 truncate">{cat.name}</p>
                          <p className="text-xs text-gray-400 font-mono truncate">{cat.slug}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
                    {editingId !== cat._id && (
                      <button
                        onClick={() => handleEdit(cat)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setShowDeleteModal(cat._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Hash className="w-3.5 h-3.5" />
                    <span>{cat.packageCount || 0} packages</span>
                  </div>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Packages
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCategories.map((cat, index) => (
                    <tr key={cat._id} className="hover:bg-gray-50/50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(index)} flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white font-bold text-sm">
                              {getInitials(cat.name)}
                            </span>
                          </div>
                          <div>
                            {editingId === cat._id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleUpdate(cat._id)}
                                  className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <p className="font-medium text-gray-900">{cat.name}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded font-mono">
                          {cat.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm text-gray-700">{cat.packageCount || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {editingId !== cat._id && (
                            <button
                              onClick={() => handleEdit(cat)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => setShowDeleteModal(cat._id)}
                            disabled={deletingId === cat._id}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === cat._id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Delete Category</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-red-600">
                  Are you sure you want to delete this category? All associated packages will be affected.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  disabled={deletingId === showDeleteModal}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50"
                >
                  {deletingId === showDeleteModal ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </div>
                  ) : (
                    'Delete Category'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}