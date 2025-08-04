import { SignedIn, SignedOut, SignInButton, useAsgardeo, User, UserDropdown } from '@asgardeo/react'
import TokenInfo from './TokenInfo'
import './App.css'
import { useEffect } from 'react';

function App() {
  const { signInSilently } = useAsgardeo();
  
  const urlParams = new URLSearchParams(window.location.search);
  const orgIdFromUrl = urlParams.get('orgId');
  
  useEffect(() => {
    signInSilently({ fidp: "OrganizationSSO", orgId: orgIdFromUrl })
      .then((response) => {
        if (response === true) {
          return;
        }
      })
      .catch((error) => {
        console.error('Silent sign-in failed:', error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header>
        <SignedIn>
          <UserDropdown menuItems={[
            {
              label: 'My Account',
              onClick: () => window.open(`https://myaccount.asgardeo.io/t/dxlab/${orgIdFromUrl}`, '_blank')
            }
          ]} />
        </SignedIn>
        <SignedOut>
          <SignInButton signInOptions={{fidp: "OrganizationSSO", orgId: "<org_id_of_a>"}}>Sign In With A</SignInButton>
          <SignInButton signInOptions={{fidp: "OrganizationSSO", orgId: "<org_id_of_b>"}}>Sign In With B</SignInButton>
        </SignedOut>
      </header>
      <main>
        <SignedIn>
          <User>
            {(user) => (
              <div>
                <h3>👋 Welcome back, {user?.name?.givenName && user?.name?.familyName ? `${user?.name?.givenName} ${user?.name?.familyName}` : user.userName || user.username || user.sub}</h3>
              </div>
            )}
          </User>
          <TokenInfo />
        </SignedIn>
      </main>
    </>
  )
}

export default App
