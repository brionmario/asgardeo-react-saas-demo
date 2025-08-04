# Asgardeo React SaaS Demo

A React application demonstrating Asgardeo authentication in a multi-organization SaaS context. This demo showcases how to implement organization-specific SSO with Asgardeo's React SDK.

## Features

- **Multi-Organization Authentication**: Support for multiple organizations with different SSO configurations
- **Silent Sign-In**: Automatic authentication attempt using organization SSO
- **Organization Detection**: URL-based organization ID detection for seamless user experience
- **Token Management**: Display and management of authentication tokens
- **User Profile**: Access to user information and organization-specific account management
- **Responsive UI**: Clean, modern interface with user dropdown and authentication states

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- An Asgardeo account with configured applications
- Organizations set up in Asgardeo for SaaS demo

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/brionmario/asgardeo-react-saas-demo.git
cd asgardeo-react-saas-demo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
VITE_ASGARDEO_CLIENT_ID=your_client_id
VITE_ASGARDEO_BASE_URL=https://api.asgardeo.io/t/your_organization
VITE_ASGARDEO_MYACCOUNT_URL=https://myaccount.asgardeo.io/t
```

### 4. Asgardeo Configuration

1. **Create an Application**: Set up an application in Asgardeo.
2. **Share the Application**: Enable sub organizations to access the application.
3. **Set Callback URLs**: Add your development and production URLs to allowed callback URLs
4. **Organization IDs**: Note down the organization IDs for your demo organizations

### 5. Update Organization IDs

In `src/App.jsx`, update the hardcoded organization IDs with your actual organization IDs:

```jsx
<SignInButton signInOptions={{fidp: "OrganizationSSO", orgId: "your-org-a-id"}}>Sign In With Org A</SignInButton>
<SignInButton signInOptions={{fidp: "OrganizationSSO", orgId: "your-org-b-id"}}>Sign In With Org B</SignInButton>
```

### 6. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Organization-Specific Access

Access the application with organization-specific URLs:

```url
http://localhost:5173?orgId=your-organization-id
```

This will automatically attempt silent sign-in for the specified organization.

### Authentication Flow

1. **Anonymous State**: Shows sign-in buttons for different organizations
2. **Silent Sign-In**: Automatically attempts authentication if `orgId` is provided
3. **Authenticated State**: Displays user information and token details
4. **Account Management**: Access organization-specific MyAccount portal

### Token Information

The application displays detailed token information including:

- Decoded ID token payload
- Token expiration times
- Organization context
- User claims and attributes

## Project Structure

```text
src/
├── App.jsx          # Main application component with authentication logic
├── App.css          # Application styles
├── TokenInfo.jsx    # Component for displaying token information
├── TokenInfo.css    # Token information styles
├── main.jsx         # Application entry point with AsgardeoProvider
├── index.css        # Global styles
└── assets/          # Static assets
```

## Key Components

### App.jsx

- Handles authentication state management
- Implements silent sign-in with organization SSO
- Manages user dropdown and sign-in buttons
- Displays user welcome message

### TokenInfo.jsx

- Decodes and displays JWT tokens
- Shows session data from localStorage
- Provides detailed token information for debugging

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_ASGARDEO_CLIENT_ID` | Your Asgardeo application client ID | `abc123...` |
| `VITE_ASGARDEO_BASE_URL` | Asgardeo API base URL for your organization | `https://api.asgardeo.io/t/myorg` |
| `VITE_ASGARDEO_MYACCOUNT_URL` | Base URL for MyAccount portal | `https://myaccount.asgardeo.io/t` |

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **@asgardeo/react** - Asgardeo React SDK for authentication
- **ESLint** - Code linting

## Deployment

1. Build the application:

```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform

3. Update your Asgardeo application configuration with production URLs

## Troubleshooting

### Common Issues

1. **Authentication not working**: Check your client ID and base URL configuration
2. **Organization not found**: Verify organization IDs are correct
3. **Callback errors**: Ensure callback URLs are properly configured in Asgardeo
4. **Token decoding issues**: Check that tokens are properly formatted JWT tokens

### Debug Mode

The application includes console logging for authentication flows. Check browser developer tools for detailed error messages.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues related to:

- **Asgardeo SDK**: [Asgardeo React SDK Issues](https://github.com/asgardeo/javascript/issues)
- **This Demo**: [Project Issues](https://github.com/brionmario/asgardeo-react-saas-demo/issues)
- **Asgardeo Platform**: [Asgardeo Documentation](https://wso2.com/asgardeo/docs/)

## Related Resources

- [Asgardeo Documentation](https://wso2.com/asgardeo/docs/)
- [Asgardeo JavaScript SDKs](https://github.com/asgardeo/javascript)
- [Organization SSO Guide](https://wso2.com/asgardeo/docs/guides/organization-management/organization-sso/)
- [SaaS Application Development](https://wso2.com/asgardeo/docs/guides/applications/saas-applications/)
