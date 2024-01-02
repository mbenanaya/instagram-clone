import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react'

export default function Welcome({ auth }) {

    useEffect(() => {
        if (auth.user) {
            Inertia.replace(route('dashboard'));
        } else {
            Inertia.get(route('login'));
        }
    }, [auth.user]);

    return (
        <Head title="Instagram" />
    );
}
