// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import SignUpForm from '@/components/auth/SignUpForm';
// import { BrowserRouter } from 'react-router-dom';
// import { useAuthStore } from '@/components/store/authStore';

// // Mock useNavigate
// const mockedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedNavigate,
//   Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>
// }));

// // Mock auth store
// const mockSignup = jest.fn(() => Promise.resolve());
// jest.mock('@/components/store/authStore', () => ({
//   useAuthStore: jest.fn(() => ({
//     signup: mockSignup,
//     isLoading: false,
//   })),
// }));

// // Mock uploader component
// jest.mock('@/components/Uploader/Uploader', () => ({
//   __esModule: true,
//   default: ({ onFilesSelected }) => {
//     const fakeFile = new File(['dummy'], 'test-image.png', { type: 'image/png' });
//     return (
//       <div>
//         <button onClick={() => onFilesSelected([fakeFile])}>Upload Test Image</button>
//       </div>
//     );
//   },
// }));

// const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

// describe('SignUpForm', () => {
//   beforeEach(() => {
//     mockSignup.mockClear();
//     mockedNavigate.mockClear();
//   });

//   it('renders all fields', () => {
//     render(<SignUpForm />, { wrapper: Wrapper });

//     expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Enter country')).toBeInTheDocument();
//     expect(screen.getByText('Select Gender')).toBeInTheDocument();
//   });

//   it('shows validation errors when required fields are empty', async () => {
//     render(<SignUpForm />, { wrapper: Wrapper });

//     fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));

//     await waitFor(() => {
//       expect(screen.getByText('Name is required')).toBeInTheDocument();
//       expect(screen.getByText('Email is required')).toBeInTheDocument();
//       expect(screen.getByText('Password is required')).toBeInTheDocument();
//       expect(screen.getByText('Username is required')).toBeInTheDocument();
//       expect(screen.getByText('Country is required')).toBeInTheDocument();
//       expect(screen.getByText('Gender is required')).toBeInTheDocument();
//     });
//   });

//   it('submits the form successfully when all fields are valid', async () => {
//     render(<SignUpForm />, { wrapper: Wrapper });
  
//     // Fill form fields
//     fireEvent.change(screen.getByPlaceholderText('Enter name'), { 
//       target: { value: 'Test User' } 
//     });
//     fireEvent.change(screen.getByPlaceholderText('Enter email'), { 
//       target: { value: 'test@example.com' } 
//     });
//     fireEvent.change(screen.getByPlaceholderText('Enter password'), { 
//       target: { value: 'ValidPass123!' } 
//     });
//     fireEvent.change(screen.getByPlaceholderText('Enter username'), { 
//       target: { value: 'testuser' } 
//     });
//     fireEvent.change(screen.getByPlaceholderText('Enter country'), { 
//       target: { value: 'Nepal' } 
//     });
  
//     // Handle gender select
//     const genderTrigger = screen.getByRole('combobox');
//     fireEvent.mouseDown(genderTrigger);
//     fireEvent.click(screen.getByText('Male'));
  
//     // Upload image
//     fireEvent.click(screen.getByText('Upload Test Image'));
    
//     // Wait for image to be processed
//     await waitFor(() => {
//       expect(screen.getByText(/test-image.png/)).toBeInTheDocument();
//     });
  
//     // Submit form using test ID
//     const form = screen.getByTestId('signup-form');
//     fireEvent.submit(form);
  
//     await waitFor(() => {
//       expect(mockSignup).toHaveBeenCalledWith(
//         'Test User',
//         'test@example.com',
//         'ValidPass123!',
//         'testuser',
//         [expect.any(File)],
//         'Nepal',
//         'male'
//       );
//     }, { timeout: 3000 });
//   });

//   it('navigates to login page when login link is clicked', () => {
//     render(<SignUpForm />, { wrapper: Wrapper });
    
//     const loginLink = screen.getByRole('link', { name: /login/i });
//     expect(loginLink).toHaveAttribute('href', '/login');
//   });
// });





// Part 2  

import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import SignUpForm from "@/components/auth/SignUpForm"
import { BrowserRouter } from "react-router-dom"

// Mock toast
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}))

// Mock useNavigate
const mockedNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

// Mock auth store
const mockSignup = jest.fn(() => Promise.resolve())
jest.mock("@/components/store/authStore", () => ({
  useAuthStore: jest.fn(() => ({
    signup: mockSignup,
    isLoading: false,
  })),
}))

// Mock uploader component
jest.mock("@/components/Uploader/Uploader", () => ({
  __esModule: true,
  default: ({ onFilesSelected }) => {
    const handleUpload = () => {
      const fakeFile = new File(["dummy"], "test-image.png", { type: "image/png" })
      onFilesSelected([fakeFile])
    }

    return (
      <div>
        <button data-testid="upload-button" onClick={handleUpload}>
          Upload Test Image
        </button>
      </div>
    )
  },
}))

// Mock the Select component from shadcn/ui
jest.mock("@/components/ui/select", () => ({
  Select: ({ children, onValueChange }) => (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type.name === "SelectTrigger") {
          return React.cloneElement(child)
        }
        if (child.type.name === "SelectContent") {
          return (
            <div data-testid="select-content">
              {React.Children.map(child.props.children, (option) => {
                if (option.type.name === "SelectItem") {
                  return (
                    <div
                      data-testid={`select-option-${option.props.value}`}
                      onClick={() => onValueChange(option.props.value)}
                    >
                      {option.props.children}
                    </div>
                  )
                }
                return option
              })}
            </div>
          )
        }
        return child
      })}
    </div>
  ),
  SelectContent: ({ children }) => <div>{children}</div>,
  SelectItem: ({ value, children }) => <div data-value={value}>{children}</div>,
  SelectTrigger: ({ children }) => <div>{children}</div>,
  SelectValue: ({ placeholder }) => <div>{placeholder}</div>,
}))

const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>

describe("SignUpForm", () => {
  beforeEach(() => {
    mockSignup.mockClear()
    mockedNavigate.mockClear()
    jest.clearAllMocks()
  })

  it("renders all fields", () => {
    render(<SignUpForm />, { wrapper: Wrapper })

    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter country")).toBeInTheDocument()
    expect(screen.getByText("Select Gender")).toBeInTheDocument()
  })

  it("shows validation errors when required fields are empty", async () => {
    render(<SignUpForm />, { wrapper: Wrapper })

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }))

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument()
      expect(screen.getByText("Email is required")).toBeInTheDocument()
      expect(screen.getByText("Password is required")).toBeInTheDocument()
      expect(screen.getByText("Username is required")).toBeInTheDocument()
      expect(screen.getByText("Country is required")).toBeInTheDocument()
      expect(screen.getByText("Gender is required")).toBeInTheDocument()
    })
  })

  // Increase timeout for this specific test
  it("submits the form successfully when all fields are valid", async () => {
    render(<SignUpForm />, { wrapper: Wrapper })

    // Fill form fields
    fireEvent.change(screen.getByPlaceholderText("Enter name"), {
      target: { value: "Test User" },
    })
    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "test@example.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "ValidPass123!" },
    })
    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "testuser" },
    })
    fireEvent.change(screen.getByPlaceholderText("Enter country"), {
      target: { value: "Nepal" },
    })

    // Upload image first - this ensures we have images before form submission
    fireEvent.click(screen.getByTestId("upload-button"))

    // Wait for image to be processed
    await waitFor(() => {
      expect(screen.getByText(/test-image.png/)).toBeInTheDocument()
    })

    // Handle gender select - using our mocked version
    const genderTrigger = screen.getByText("Select Gender")
    fireEvent.click(genderTrigger)

    // Directly trigger the gender selection using our mocked component
    fireEvent.click(screen.getByTestId("select-option-male"))

    // Submit form
    const submitButton = screen.getByRole("button", { name: "Sign up" })
    fireEvent.click(submitButton)

    // Wait for the signup function to be called
    await waitFor(
      () => {
        expect(mockSignup).toHaveBeenCalled()
      },
      { timeout: 1000 },
    )

    // Check the parameters separately for better error messages
    expect(mockSignup.mock.calls[0][0]).toBe("Test User") // name
    expect(mockSignup.mock.calls[0][1]).toBe("test@example.com") // email
    expect(mockSignup.mock.calls[0][2]).toBe("ValidPass123!") // password
    expect(mockSignup.mock.calls[0][3]).toBe("testuser") // username
    expect(mockSignup.mock.calls[0][4]).toHaveLength(1) // images array
    expect(mockSignup.mock.calls[0][5]).toBe("Nepal") // country
    expect(mockSignup.mock.calls[0][6]).toBe("male") // gender

    // Verify navigation occurred
    expect(mockedNavigate).toHaveBeenCalledWith("/verify-email")
  }, 10000) // Increase timeout to 10 seconds

  it("navigates to login page when login link is clicked", () => {
    render(<SignUpForm />, { wrapper: Wrapper })

    const loginLink = screen.getByRole("link", { name: /login/i })
    expect(loginLink).toHaveAttribute("href", "/login")
  })
})
