<<<<<<< HEAD
import Youtube from 'components/Youtube';
=======
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
>>>>>>> 40ca68bdcb34bbbc0755f896df3b687695d7b492
import Router from './shared/Router';

const App = () => {
    const queryClient = new QueryClient();
    return (
<<<<<<< HEAD
        <div>
            <Youtube />
=======
        <QueryClientProvider client={queryClient}>
>>>>>>> 40ca68bdcb34bbbc0755f896df3b687695d7b492
            <Router />
        </QueryClientProvider>
    );
};

export default App;
