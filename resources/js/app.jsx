import './bootstrap'
import '../css/app.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import ThemeProvider from '@/Components/ThemeProvider'
import { Provider } from 'react-redux'
import store from '@/Components/store'
import('preline')

const appName = import.meta.env.VITE_APP_NAME || 'Instagram'

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>
                <Provider store={store} >
                    <App {...props} />
                </Provider>
            </ThemeProvider>
        );
    },
    progress: {
        color: '#c904e6',
    },
});

Echo.private('message.1.2')
    .listen('MessageSent', (e) => {
        console.log(e);
        console.log(e.message);
    });