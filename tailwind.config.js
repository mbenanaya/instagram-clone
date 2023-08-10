import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './node_modules/tw-elements/dist/js/**/*.js',
        'node_modules/preline/dist/*.js',
    ],

    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                white: '#FFFFFF',
                gray1: '#F3F4F6',
                gray2: '#E5E7EB',
                gray3: '#D1D5DB',
                gray4: '#9CA3AF',
                gray5: '#6B7280',
                gray6: '#4B5563',
                gray7: '#374151',
                gray8: '#1F2937',
                gray9: '#111827',
                f2: '#F2F2F2',
                pc: '#C904E6',
              },
        },
    },

    plugins: [
        forms,
        require('flowbite/plugin'),
        require("tw-elements/dist/plugin.cjs"),
        require('preline/plugin'),
    ],
};
