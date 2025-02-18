// import React from 'react'

// const RecipeCard = () => {
//   return (
   
//   )
// }

// export default RecipeCard




const Dashboard = ({ title, ingredients, time }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow w-60">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
          {ingredients.map((item, index) => (
            <span key={index} className="bg-gray-200 p-1 rounded">{item}</span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-orange-500 text-white px-3 py-1 rounded">Watch Tutorial</button>
          <span className="text-gray-500">{time} mins</span>
        </div>
      </div>
    );
  };
  
  const RecipeCard = () => {
    return (
      <div className="p-5">
        <div className="bg-orange-400 text-white p-5 rounded-lg text-center mb-5">
          <h2 className="text-2xl font-bold">Add your own recipe</h2>
          <p>Upload and share your homemade recipe with the community!</p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Based on the food you like</h2>
        <div className="flex gap-5">
          <Dashboard title="Scallion Pancakes" ingredients={["Flour", "Onion", "Oil"]} time={15} />
          <Dashboard title="Matar Paneer" ingredients={["Paneer", "Tomato", "Veggies"]} time={20} />
          <Dashboard title="Veg Soup" ingredients={["Cabbage", "Water", "Salt"]} time={10} />
        </div>
      </div>
    );
  };


  export default RecipeCard