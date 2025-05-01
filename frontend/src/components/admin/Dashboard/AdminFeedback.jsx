// import React, { useState, useEffect, useRef } from 'react';
// import { HiDotsHorizontal } from "react-icons/hi";
// import { FiFilter } from "react-icons/fi";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { useFeedbackStore } from "@/components/store/feedbackStore";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// const AdminFeedback = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [selectedRating, setSelectedRating] = useState(null);
//   const [appliedRating, setAppliedRating] = useState(null);
//   const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
//   const {
//     feedback,
//     fetchAllFeedback,
//     deleteFeedback,
//     loading,
//     error,
//   } = useFeedbackStore();

//   const dropdownRef = useRef(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchFeedbackData = async () => {
//       try {
//         await fetchAllFeedback();
//       } catch (error) {
//         console.error("Error fetching feedback:", error);
//       }
//     };
//     fetchFeedbackData();
//   }, [fetchAllFeedback]);

//   const toggleActionDropdown = (id) => {
//     setDropdownOpen(dropdownOpen === id ? null : id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteFeedback(id);
//       toast.success("Deleted successfully");
//       setDropdownOpen(null);
//     } catch (error) {
//       toast.error("Error deleting feedback.");
//       console.error("Error deleting:", error);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const filteredFeedback = feedback.filter((item) => {
//     if (appliedRating === null) return true;
//     return item.rating >= appliedRating && item.rating < appliedRating + 1;
//   });

//   const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
//   const paginatedData = filteredFeedback.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [appliedRating]);

//   return (
//     <div className="px-2 py-4 md:pl-[2rem] lg:pl-[18rem] pt-[6rem] max-w-[83rem] mx-auto">

//       <div className="flex justify-end mb-4">
//         <Dialog 
//           open={isFilterDialogOpen} 
//           onOpenChange={(isOpen) => {
//             setIsFilterDialogOpen(isOpen);
//             if (isOpen) setSelectedRating(appliedRating);
//           }}
//         >
//           <DialogTrigger asChild>
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
//               <FiFilter className="text-lg" />
//               <span className="font-medium">Filter</span>
//             </button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle className="text-lg font-bold">Filter Reviews</DialogTitle>
//             </DialogHeader>

//             <div className="mt-4">
//               <p className="text-xs font-semibold text-gray-500 mb-2">BY RATING</p>
//               <div className="space-y-2">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input 
//                     type="radio"
//                     name="ratingFilter"
//                     className="form-radio h-4 w-4 text-orange-600 focus:ring-orange-500"
//                     checked={selectedRating === null}
//                     onChange={() => setSelectedRating(null)}
//                   />
//                   <span className="text-gray-700">All Ratings</span>
//                 </label>
//                 {[5, 4, 3, 2, 1].map((star) => (
//                   <label key={star} className="flex items-center space-x-2 cursor-pointer">
//                     <input 
//                       type="radio"
//                       name="ratingFilter"
//                       className="form-radio h-4 w-4 text-orange-600 focus:ring-orange-500"
//                       checked={selectedRating === star}
//                       onChange={() => setSelectedRating(star)}
//                     />
//                     <span className="text-gray-700">
//                       {star} star{star !== 1 && 's'}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6 flex gap-4">
//               <button 
//                 onClick={() => setIsFilterDialogOpen(false)}
//                 className="text-gray-600 text-sm"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={() => {
//                   setAppliedRating(selectedRating);
//                   setIsFilterDialogOpen(false);
//                 }}
//                 className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm font-semibold"
//               >
//                 Apply
//               </button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="border-y-2 border-gray-200">
//         <table className="w-full text-sm text-gray-500">
//           <thead className="text-gray-700 uppercase bg-gray-50">
//             <tr className="text-left">
//               <th className="px-6 py-2">User</th>
//               <th className="px-6 py-2">Recipe</th>
//               <th className="px-6 py-2">Feedback</th>
//               <th className="px-6 py-2">Rating</th>
//               <th className="px-6 py-2">Date</th>
//               <th className="px-6 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="px-6 py-3 text-center">
//                   No feedback found.
//                 </td>
//               </tr>
//             ) : (
//               paginatedData.map((item) => (
//                 <tr key={item._id} className="bg-white border-t-2 border-gray-200 hover:bg-gray-50">
//                   <td className="px-6 py-3 font-medium text-gray-900">{item.name}</td>
//                   <td className="px-6 py-3">
//                     <img
//                       src={item.imagerecipe || '/default-image.jpg'}
//                       alt="Recipe"
//                       className="w-12 h-12 rounded-md object-cover"
//                     />
//                   </td>
//                   <td className="px-6 py-3">{item.comment}</td>
//                   <td className="px-6 py-3">
//                     <div className="flex items-center gap-2">
//                       <div className="flex mt-1">
//                         {[...Array(5)].map((_, i) => (
//                           <span 
//                             key={i} 
//                             className={i < item.rating ? "text-orange-500" : "text-gray-300"}
//                           >
//                             ★
//                           </span>
//                         ))}
//                       </div>
//                       <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-3">{new Date(item.createdAt).toLocaleString()}</td>
//                   <td className="px-6 py-3 relative">
//                     <HiDotsHorizontal
//                       className="text-gray-500 cursor-pointer text-xl"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleActionDropdown(item._id);
//                       }}
//                     />
//                     {dropdownOpen === item._id && (
//                       <div
//                         ref={dropdownRef}
//                         className="absolute mt-2 w-28 bg-white rounded-md shadow-lg z-50"
//                       >
//                         <div
//                           onClick={() => handleDelete(item._id)}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white cursor-pointer rounded-md"
//                         >
//                           Delete
//                         </div>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {filteredFeedback.length > itemsPerPage && (
//         <Pagination className="mt-4">
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               />
//             </PaginationItem>
//             {[...Array(totalPages)].map((_, index) => (
//               <PaginationItem key={index}>
//                 <PaginationLink
//                   href="#"
//                   isActive={currentPage === index + 1}
//                   onClick={() => setCurrentPage(index + 1)}
//                 >
//                   {index + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       )}
//     </div>
//   );
// };

// export default AdminFeedback;





import React, { useState, useEffect, useRef } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useFeedbackStore } from "@/components/store/feedbackStore";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminFeedback = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [appliedRating, setAppliedRating] = useState(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const {
    feedback,
    fetchAllFeedback,
    deleteFeedback,
    loading,
    error,
  } = useFeedbackStore();

  const dropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        await fetchAllFeedback();
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedbackData();
  }, [fetchAllFeedback]);

  const toggleActionDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      toast.success("Deleted successfully");
      setDropdownOpen(null);
    } catch (error) {
      toast.error("Error deleting feedback.");
      console.error("Error deleting:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredFeedback = feedback.filter((item) => {
    if (appliedRating === null) return true;
    return item.rating >= appliedRating && item.rating < appliedRating + 1;
  });

  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const paginatedData = filteredFeedback.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [appliedRating]);

  return (
    <div className="px-2 py-4 md:pl-[2rem] lg:pl-[18rem] pt-[6rem] max-w-[83rem] mx-auto">

      <div className="flex justify-end mb-4 px-2 md:px-0">
        <Dialog 
          open={isFilterDialogOpen} 
          onOpenChange={(isOpen) => {
            setIsFilterDialogOpen(isOpen);
            if (isOpen) setSelectedRating(appliedRating);
          }}
        >
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition text-sm md:text-base">
              <FiFilter className="text-lg" />
              <span className="font-medium">Filter</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] rounded-lg sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Filter Reviews</DialogTitle>
            </DialogHeader>

            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">BY RATING</p>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer p-1">
                  <input 
                    type="radio"
                    name="ratingFilter"
                    className="form-radio h-4 w-4 text-orange-600 focus:ring-orange-500"
                    checked={selectedRating === null}
                    onChange={() => setSelectedRating(null)}
                  />
                  <span className="text-gray-700">All Ratings</span>
                </label>
                {[5, 4, 3, 2, 1].map((star) => (
                  <label key={star} className="flex items-center space-x-2 cursor-pointer p-1">
                    <input 
                      type="radio"
                      name="ratingFilter"
                      className="form-radio h-4 w-4 text-orange-600 focus:ring-orange-500"
                      checked={selectedRating === star}
                      onChange={() => setSelectedRating(star)}
                    />
                    <span className="text-gray-700">
                      {star} star{star !== 1 && 's'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-4 justify-end">
              <button 
                onClick={() => setIsFilterDialogOpen(false)}
                className="text-gray-600 text-sm px-4 py-2 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setAppliedRating(selectedRating);
                  setIsFilterDialogOpen(false);
                }}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm font-semibold"
              >
                Apply
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border-y-2 border-gray-200 overflow-x-auto">
        <table className="w-full text-sm md:text-base text-gray-500 min-w-[600px]">
          <thead className="text-gray-700 uppercase bg-gray-50">
            <tr className="text-left">
              <th className="px-3 py-2 md:px-6 truncate max-w-[100px]">User</th>
              <th className="px-3 py-2 md:px-6">Recipe</th>
              <th className="px-3 py-2 md:px-6">Feedback</th>
              <th className="px-3 py-2 md:px-6">Rating</th>
              <th className="px-3 py-2 md:px-6 whitespace-nowrap">Date</th>
              <th className="px-3 py-2 md:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-center">
                  No feedback found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item._id} className="bg-white border-t-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-3 md:px-6 font-medium text-gray-900 truncate max-w-[100px]">
                    {item.name}
                  </td>
                  <td className="px-3 py-3 md:px-6">
                    <img
                      src={item.imagerecipe || '/default-image.jpg'}
                      alt="Recipe"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-3 py-3 md:px-6 line-clamp-2 max-w-[200px]">
                    {item.comment}
                  </td>
                  <td className="px-3 py-3 md:px-6">
                    <div className="flex items-center gap-1.5">
                      <div className="flex flex-wrap gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm md:text-base ${i < item.rating ? "text-orange-500" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 md:px-6 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-3 py-3 md:px-6 relative">
                    <HiDotsHorizontal
                      className="text-gray-500 cursor-pointer text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActionDropdown(item._id);
                      }}
                    />
                    {dropdownOpen === item._id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-50"
                      >
                        <div
                          onClick={() => handleDelete(item._id)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white cursor-pointer rounded-md"
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredFeedback.length > itemsPerPage && (
        <div className="mt-4 overflow-x-auto">
          <Pagination className="min-w-[300px]">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="text-sm md:text-base"
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    className="text-sm md:text-base"
                    href="#"
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className="text-sm md:text-base"
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;