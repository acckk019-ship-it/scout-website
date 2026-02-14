// =====================================================
// Cloudinary Configuration
// =====================================================
// SETUP: Create a free Cloudinary account at https://cloudinary.com
// Get your Cloud Name from the Dashboard
// Create an Upload Preset:
//   Settings → Upload → Upload Presets → Add → Unsigned
// =====================================================

const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

// Upload image to Cloudinary
export async function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'scout-website');

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: 'POST', body: formData }
        );

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        return {
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}

// Get optimized image URL
export function getOptimizedUrl(publicId, options = {}) {
    const { width = 800, quality = 'auto', format = 'auto' } = options;
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},q_${quality},f_${format}/${publicId}`;
}
