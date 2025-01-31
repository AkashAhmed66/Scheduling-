import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function ImageUploadForm() {
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            setSelectedFile(file); // Store the file for submission
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select an image to upload.');
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('image', selectedFile);
        Inertia.post('/user-profile-photo', formData, {
            onSuccess: () => {
                setPreview(null);
                setSelectedFile(null);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <h2 className="text-lg font-semibold">Upload Profile Image</h2>
            <div className="mt-4 flex flex-col items-center space-y-4">
                {preview && (
                    <img
                        src={preview}
                        alt="Profile Preview"
                        className="h-32 w-32 rounded-full object-cover"
                    />
                )}
                <label
                    htmlFor="profileImage"
                    className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white font-semibold hover:bg-blue-600 transition"
                >
                    Choose Image
                </label>
                <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <button
                    type="submit"
                    className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white font-semibold hover:bg-green-600 transition"
                >
                    Upload Image
                </button>
            </div>
        </form>
    );
}
