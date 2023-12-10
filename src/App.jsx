import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './shared/Router';

const App = () => {
    const queryClient = new QueryClient();
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Router />
            </QueryClientProvider>
        </div>
    );
};

export default App;
