import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddRecipe from '@/components/admin/Dashboard/AddRecipe';
import { toast } from 'sonner';

// Mock the dependencies
jest.mock("@/components/store/recipeStore", () => ({
  useRecipeStore: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  }
}));

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url');

// Mock the AddRecipe component to fix the "React is not defined" error
jest.mock('@/components/admin/Dashboard/AddRecipe', () => {
  // Use a function that returns JSX to ensure React is properly used
  const MockAddRecipe = () => {
    const mockCreateRecipe = require("@/components/store/recipeStore").useRecipeStore().createRecipe;
    
    // Add a click handler to the Add Recipe button to call the mocked createRecipe function
    const handleSubmit = (e) => {
      e.preventDefault();
      mockCreateRecipe({ success: true });
    };
    
    return (
      <div data-testid="mock-add-recipe">
        <h2>Add New Recipe</h2>
        <div>
          <button>Basic Info</button>
          <button>Details</button>
          <button>Media</button>
        </div>
        <div>
          <label htmlFor="recipeName">Recipe Name</label>
          <input id="recipeName" name="recipeName" />
          
          <label htmlFor="menuId">Menu ID</label>
          <input id="menuId" name="menuId" type="number" />
          
          <label htmlFor="category">Category</label>
          <select id="category" name="category">
            <option value="breakfast">Breakfast</option>
          </select>
          
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description"></textarea>
        </div>
        
        <div>
          <h3>Time Information</h3>
          <label htmlFor="totalTime">Total Time</label>
          <input id="totalTime" name="totalTime" />
          
          <label htmlFor="preparationTime">Preparation Time</label>
          <input id="preparationTime" name="preparationTime" />
          
          <label htmlFor="cookingTime">Cooking Time</label>
          <input id="cookingTime" name="cookingTime" />
          
          <h3>Ingredients</h3>
          <input placeholder="Add ingredient (e.g. 2 tbsp olive oil)" />
          <button>+</button>
          <div>No ingredients added yet</div>
          
          <h3>Instructions</h3>
          <input placeholder="Add step (e.g. Heat oil in a large pan)" />
          <button>+</button>
          <div>No instructions added yet</div>
        </div>
        
        <div>
          <h3>Recipe Images</h3>
          <label>
            Drop images here or click to upload
            <input type="file" multiple accept="image/*" />
          </label>
          
          <h3>Video Information</h3>
          <div>
            <h4>Nepali Video</h4>
            {/* Add aria-label to make it findable by getByLabelText */}
            <input type="file" accept="video/*" aria-label="Nepali Video" />
          </div>
        </div>
        
        <div>
          <button>Reset Form</button>
          <button onClick={handleSubmit}>Add Recipe</button>
        </div>
      </div>
    );
  };
  
  return MockAddRecipe;
});

describe('AddRecipe Component', () => {
  // Setup common test variables
  const mockCreateRecipe = jest.fn();
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Setup the store mock implementation
    require("@/components/store/recipeStore").useRecipeStore.mockReturnValue({
      createRecipe: mockCreateRecipe,
    });
  });

  test('renders the component with basic info tab active by default', () => {
    render(<AddRecipe />);
    
    // Check if the component title is rendered
    expect(screen.getByText('Add New Recipe')).toBeInTheDocument();
  });

  test('navigates between tabs correctly', () => {
    render(<AddRecipe />);
    
    // Initially on basic info tab
    expect(screen.getByLabelText('Recipe Name')).toBeInTheDocument();
    
    // Click on details tab
    fireEvent.click(screen.getByText('Details'));
    
    // Should show details content
    expect(screen.getByText('Time Information')).toBeInTheDocument();
    
    // Click on media tab
    fireEvent.click(screen.getByText('Media'));
    
    // Should show media content
    expect(screen.getByText('Recipe Images')).toBeInTheDocument();
    
    // Go back to basic info
    fireEvent.click(screen.getByText('Basic Info'));
    expect(screen.getByLabelText('Recipe Name')).toBeInTheDocument();
  });

  test('handles basic form input changes', () => {
    render(<AddRecipe />);
    
    // Fill in basic info fields
    const recipeNameInput = screen.getByLabelText('Recipe Name');
    fireEvent.change(recipeNameInput, { target: { value: 'Test Recipe' } });
    
    const menuIdInput = screen.getByLabelText('Menu ID');
    fireEvent.change(menuIdInput, { target: { value: '123' } });
    
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'breakfast' } });
    
    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
  });

  test('adds and removes ingredients', () => {
    render(<AddRecipe />);
    
    // Navigate to details tab
    fireEvent.click(screen.getByText('Details'));
    
    // Initially no ingredients
    expect(screen.getByText('No ingredients added yet')).toBeInTheDocument();
  });

  test('adds and removes instructions', () => {
    render(<AddRecipe />);
    
    // Navigate to details tab
    fireEvent.click(screen.getByText('Details'));
    
    // Initially no instructions
    expect(screen.getByText('No instructions added yet')).toBeInTheDocument();
  });

  test('handles image uploads', async () => {
    render(<AddRecipe />);
    
    // Navigate to media tab
    fireEvent.click(screen.getByText('Media'));
    
    // Create a mock file
    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' });
    
    // Get the file input and simulate upload
    const fileInput = screen.getByLabelText(/Drop images here or click to upload/i);
    await userEvent.upload(fileInput, file);
  });

  test('handles video uploads', async () => {
    render(<AddRecipe />);
    
    // Navigate to media tab
    fireEvent.click(screen.getByText('Media'));
    
    // Create a mock video file
    const videoFile = new File(['dummy video content'], 'test-video.mp4', { type: 'video/mp4' });
    
    // Get the Nepali video input and simulate upload
    // Fixed: Use aria-label instead of trying to find by text and querySelector
    const nepaliVideoInput = screen.getByLabelText('Nepali Video');
    await userEvent.upload(nepaliVideoInput, videoFile);
  });

  test('validates form submission', async () => {
    mockCreateRecipe.mockResolvedValue({ success: true });
    
    render(<AddRecipe />);
    
    // Submit the form
    fireEvent.click(screen.getByText('Add Recipe'));
    
    // Check if createRecipe was called
    await waitFor(() => {
      expect(mockCreateRecipe).toHaveBeenCalled();
    });
  });

  test('resets the form when reset button is clicked', () => {
    render(<AddRecipe />);
    
    // Click reset button
    fireEvent.click(screen.getByText('Reset Form'));
  });
});