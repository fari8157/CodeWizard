

const PicModal = ({ image, closeModal }) => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        closeModal();
      }
    };
  
    return (
      <div
        className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50 modal-overlay"
        onClick={handleClickOutside}
      >
        <div className="bg-white p-4">
          <img src={image} alt="ID Proof" className="h-auto w-64" />
        </div>
      </div>
    );
  };


  export default PicModal;