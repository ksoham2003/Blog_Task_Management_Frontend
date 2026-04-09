import AppRouters from './routes/AppRouters';
import { BlogProvider } from './context/BlogContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BlogProvider>
          <AppRouters />
        </BlogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;