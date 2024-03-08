export default function ImageModal({ imageSrc, onClose, isBookmarked, toggleBookmark, description, setDescription }) {
  if (!imageSrc) return null; // Don't render the modal if there's no image

  // Check if the current image is bookmarked
  const bookmarked = isBookmarked(imageSrc);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl max-h-full overflow-auto relative">
        <div className="flex justify-end items-center mb-4">
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Close</button>
          <button onClick={() => toggleBookmark(imageSrc)} className="absolute top-4 left-4 p-2 w text-black">
            {bookmarked ? 'Bookmarked' : 'UnBookmarked'}
          </button>
        </div>
        <img src={imageSrc} alt="Modal" className="w-full h-auto" />
        {description && <p className="text-lg text-gray-800 mb-4">{description}</p>}
        {
          bookmarked &&
        <textarea
          className="w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:ring"
          rows="3"
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setDescription(imageSrc, e.target.value)}
        ></textarea>
        }
      </div>
    </div>
  );
}
