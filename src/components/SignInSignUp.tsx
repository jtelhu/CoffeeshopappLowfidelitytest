import { useState } from 'react';

interface SignInSignUpProps {
  onSignIn: () => void;
}

export function SignInSignUp({ onSignIn }: SignInSignUpProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sign in/up - just log in the user
    onSignIn();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Poor header design */}
        <div className="bg-white p-3 mb-3">
          <h1 className="text-lg">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          <div className="text-xs text-gray-400">Coffee Order App</div>
        </div>

        {/* Form with poor design */}
        <form onSubmit={handleSubmit} className="bg-white p-3 space-y-3">
          {/* Unclear labels and poor spacing */}
          {isSignUp && (
            <div>
              <label className="text-xs text-gray-600">Nm</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-1 text-xs border bg-gray-50"
                required
              />
            </div>
          )}

          <div>
            <label className="text-xs text-gray-600">Em</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-1 text-xs border bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-600">Pwd</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-1 text-xs border bg-gray-50"
              required
            />
          </div>

          {/* Poor button design */}
          <button
            type="submit"
            className="w-full bg-gray-400 text-white p-2 text-sm mt-4"
          >
            {isSignUp ? 'Create Account' : 'Log In'}
          </button>

          {/* Toggle between sign in/up with poor design */}
          <div className="text-center mt-3">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-gray-500 underline"
            >
              {isSignUp ? 'Have account? Sign In' : 'No account? Sign Up'}
            </button>
          </div>
          
          {/* Skip/Demo button with poor design */}
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={onSignIn}
              className="text-xs bg-gray-200 px-3 py-1"
            >
              Skip / Demo User
            </button>
          </div>
        </form>

        {/* Additional poor design elements */}
        <div className="mt-2 text-xs text-gray-400 text-center">
          By continuing you agree to terms
        </div>
      </div>
    </div>
  );
}