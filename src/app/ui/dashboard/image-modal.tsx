// components/ImageModal.js
export default function ImageModal({ imageSrc, onClose }) {
    if (!imageSrc) return null; // Don't render the modal if there's no image
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl max-h-full overflow-auto">
          <img src={imageSrc} alt="Modal" className="w-full h-auto" />
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Close</button>
        </div>
      </div>
    );
  }
  