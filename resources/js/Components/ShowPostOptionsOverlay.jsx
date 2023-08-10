import { useSelector, useDispatch } from 'react-redux';
import { setDeleteType, setId, resetDeleteOptions } from './store'

export default function ShowPostOptionsOverlay() {
  const { deleteType, id } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const deleteSelected = () => {
    // Dispatch action to handle deletion
    dispatch(deleteSelectedAction());
  };

  const close = () => {
    // Dispatch action to close the overlay
    dispatch(resetDeleteOptions());
  };

  return (
    <div
      id="ShowPostOptionsOverlay"
      className="fixed flex items-center z-50 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
    >
      <div className="max-w-sm w-full mx-auto mt-10 bg-white rounded-xl text-center">
        <button
          onClick={deleteSelected}
          className="font-extrabold w-full text-red-600 p-3 text-lg border-b border-b-gray-300 cursor-pointer"
        >
          Delete {deleteType}
        </button>
        <div className="p-3 text-lg cursor-pointer" onClick={close}>
          Cancel
        </div>
      </div>
    </div>
  );
}
