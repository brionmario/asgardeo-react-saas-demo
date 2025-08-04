import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, useAsgardeo, User, UserDropdown } from '@asgardeo/react'
import TokenInfo from './TokenInfo'
import './App.css'
import { useEffect } from 'react';

function App() {
  const { signInSilently, getDecodedIdToken, isSignedIn } = useAsgardeo();
  
  const [decodedIdToken, setDecodedIdToken] = useState(null);
  
  const urlParams = new URLSearchParams(window.location.search);
  const orgIdFromUrl = urlParams.get('orgId');
  
  useEffect(() => {
    (async () => {
      try {
        const response = await signInSilently({ fidp: "OrganizationSSO", orgId: orgIdFromUrl });
        
        if (response === true) {
          return;
        }

        console.debug('No session found...');
      } catch(error) {
        console.error('Error during silent sign-in:', error);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (isSignedIn) {
        const response = await getDecodedIdToken();
        
        setDecodedIdToken(response);
      }
    })();
  }, [getDecodedIdToken, isSignedIn]);

  return (
    <>
      <header>
        <SignedIn>
          <UserDropdown menuItems={[
            {
              label: 'My Account',
              onClick: () => window.open(`${import.meta.env.VITE_ASGARDEO_MYACCOUNT_URL}/${decodedIdToken?.org_id}`, '_blank')
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
