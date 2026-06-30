"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Plus, 
  Trash2,
  Edit3,
  Move,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function GalleryForm({
  formData,
  setFormData,
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");

  const validateImage = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5MB.");
      return false;
    }
    return true;
  };

  const uploadFeaturedImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!validateImage(file)) {
      e.target.value = "";
      return;
    }

    setUploading(true);
    setUploadStatus("Uploading featured image...");
    setUploadProgress(0);

    try {
      const form = new FormData();
      form.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        featuredImage: result.url,
      }));
      setUploadStatus("Featured image uploaded successfully!");
      setUploadProgress(100);
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
      setUploadStatus("Upload failed");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadStatus("");
        setUploadProgress(0);
      }, 1500);
      e.target.value = "";
    }
  };

  const uploadGalleryImages = async (e) => {
    const files = [...e.target.files];
    if (!files.length) return;

    setUploading(true);
    setUploadStatus(`Uploading ${files.length} images...`);
    setUploadProgress(0);

    try {
      const uploadedImages = [];
      let uploadedCount = 0;

      for (const file of files) {
        if (!validateImage(file)) {
          continue;
        }

        const form = new FormData();
        form.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: form,
        });

        const result = await response.json();

        if (!result.success) {
          console.log(`Failed to upload: ${file.name}`);
          continue;
        }

        uploadedImages.push({
          url: result.url,
          alt: "",
          caption: "",
        });

        uploadedCount++;
        setUploadProgress(Math.round((uploadedCount / files.length) * 100));
      }

      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...uploadedImages],
      }));

      if (uploadedImages.length === 0 && files.length > 0) {
        alert("No images were uploaded successfully.");
        setUploadStatus("Upload failed");
      } else {
        setUploadStatus(`${uploadedImages.length} images uploaded successfully!`);
        setUploadProgress(100);
      }
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
      setUploadStatus("Upload failed");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadStatus("");
        setUploadProgress(0);
      }, 1500);
      e.target.value = "";
    }
  };

  const removeFeaturedImage = () => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: "",
    }));
  };

  const removeGalleryImage = (index) => {
    const updated = formData.galleryImages.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      galleryImages: updated,
    }));
  };

  const updateGalleryImage = (index, field, value) => {
    const updated = [...formData.galleryImages];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      galleryImages: updated,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="border-b border-gray-100 px-6 py-4 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <ImageIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Gallery</h2>
            <p className="text-sm text-gray-500">Manage featured and gallery images</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Featured Image */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="text-sm font-medium text-gray-800">
                Featured Image
              </label>
              <p className="text-xs text-gray-500 mt-0.5">
                Main image for your package (recommended: 1200x800px)
              </p>
            </div>
            {!formData.featuredImage && (
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200">
                  <Upload className="w-4 h-4" />
                  Upload Image
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadFeaturedImage}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {formData.featuredImage ? (
            <div className="relative group">
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={formData.featuredImage}
                  alt="Featured Image"
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <label className="cursor-pointer">
                    <div className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg shadow-lg transition-all">
                      <Edit3 className="w-4 h-4 text-gray-700" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={uploadFeaturedImage}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={removeFeaturedImage}
                    className="p-2 bg-red-500/90 backdrop-blur-sm hover:bg-red-600 rounded-lg shadow-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-xs text-white font-medium">Featured Image</span>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all duration-200">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-gray-50 rounded-full">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">No featured image</p>
                  <p className="text-xs text-gray-400 mt-0.5">Upload a main image for your package</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Images */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="text-sm font-medium text-gray-800">
                Gallery Images
              </label>
              <p className="text-xs text-gray-500 mt-0.5">
                Additional images to showcase your package
              </p>
            </div>
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200">
                <Plus className="w-4 h-4" />
                Add Images
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={uploadGalleryImages}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {formData.galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={image.url}
                      alt={image.alt || "Gallery Image"}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="p-1.5 bg-red-500/90 backdrop-blur-sm hover:bg-red-600 rounded-lg shadow-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                    
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <span className="text-[10px] text-white font-medium">#{index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="p-3 space-y-2">
                    <input
                      type="text"
                      placeholder="Alt text"
                      value={image.alt}
                      onChange={(e) => updateGalleryImage(index, "alt", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="text"
                      placeholder="Caption"
                      value={image.caption}
                      onChange={(e) => updateGalleryImage(index, "caption", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all duration-200">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-gray-50 rounded-full">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">No gallery images</p>
                  <p className="text-xs text-gray-400 mt-0.5">Upload images to showcase your package</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-sm font-medium text-blue-700">{uploadStatus}</span>
              </div>
              <span className="text-xs font-medium text-blue-600">{uploadProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {uploadStatus && !uploading && uploadStatus.includes("success") && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-emerald-700">{uploadStatus}</span>
          </div>
        )}

        {uploadStatus && !uploading && uploadStatus.includes("failed") && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700">{uploadStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
}