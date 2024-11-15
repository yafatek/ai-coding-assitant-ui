import {Provider} from 'react-redux';
import {store} from './store/store';
import ChatInterface from './components/ChatInterface';

function App() {
    return (
        <Provider store={store}>
            <div className="h-screen flex flex-col">
                <header className="bg-gray-900 text-white p-4">
                    <h1 className="text-xl font-bold">Coding AI Assistant</h1>
                </header>
                <main className="flex-1 overflow-hidden">
                    <ChatInterface/>
                </main>
                <footer className="bg-gray-100 text-gray-600 text-sm p-4 text-center">
                    Powered by YAFA & Google Gemini
                </footer>
            </div>
        </Provider>
    );
}

export default App;